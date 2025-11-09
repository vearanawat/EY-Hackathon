"""
Multi-Agent Retail Sales System using LangGraph
EY Techathon 6.0 - Problem Statement 5
"""

from typing import TypedDict, Annotated, Sequence, Literal
from langgraph.graph import StateGraph, END, START
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import requests
import json
from datetime import datetime
import operator
import os

# =============================================================================
# STATE DEFINITION
# =============================================================================

class AgentState(TypedDict):
    """State that flows through all agents"""
    messages: Annotated[Sequence[BaseMessage], operator.add]
    user_id: str
    user_name: str
    channel: str  # web, mobile, whatsapp, kiosk, voice
    location: str  # store location or city
    cart: list
    recommendations: list
    inventory_status: dict
    payment_status: dict
    loyalty_points: int
    order_id: str
    next_action: str
    context: dict
    session_id: str

# =============================================================================
# MOCK API BASE URL
# =============================================================================

API_BASE = "http://localhost:5000/api"

# =============================================================================
# AGENT NODES
# =============================================================================

def sales_agent_node(state: AgentState) -> AgentState:
    """
    Main orchestrator - decides which worker agent to call next
    Uses LLM to understand intent and route to appropriate agent
    """
    print("\n🤖 SALES AGENT: Analyzing customer request...")
    
    # Get last user message
    last_message = state["messages"][-1].content if state["messages"] else ""
    
    # Build context for LLM
    context = f"""
    Customer: {state.get('user_name', 'Guest')} (ID: {state.get('user_id', 'unknown')})
    Channel: {state.get('channel', 'web')}
    Location: {state.get('location', 'unknown')}
    Cart Items: {len(state.get('cart', []))}
    Loyalty Points: {state.get('loyalty_points', 0)}
    
    Customer Message: "{last_message}"
    
    Based on this, what should we do next?
    Options:
    - recommend: Customer wants product suggestions
    - inventory: Customer wants to check stock availability
    - payment: Customer is ready to checkout
    - loyalty: Customer asks about rewards or discounts
    - post_purchase: Customer has questions about existing order
    - end: Conversation is complete
    
    Respond with ONLY the action name.
    """
    
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0,
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )
    response = llm.invoke(context)
    
    next_action = response.content.strip().lower()
    state["next_action"] = next_action
    
    print(f"   → Routing to: {next_action}")
    
    # Add AI response to conversation
    if next_action == "recommend":
        state["messages"].append(AIMessage(content="Let me find the perfect products for you! 🔍"))
    elif next_action == "inventory":
        state["messages"].append(AIMessage(content="Checking inventory availability... 📦"))
    elif next_action == "payment":
        state["messages"].append(AIMessage(content="Processing your payment... 💳"))
    
    return state


def recommendation_agent_node(state: AgentState) -> AgentState:
    """
    Suggests products based on user profile, history, and preferences
    """
    print("\n🎯 RECOMMENDATION AGENT: Finding products...")
    
    try:
        # Call recommendation API
        response = requests.get(
            f"{API_BASE}/recommendations/{state['user_id']}",
            params={
                "location": state.get("location", "Mumbai"),
                "channel": state.get("channel", "web")
            },
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            state["recommendations"] = data.get("recommendations", [])
            
            # Format recommendations message
            reco_text = "Based on your profile, here are my top recommendations:\n\n"
            for idx, item in enumerate(state["recommendations"][:3], 1):
                reco_text += f"{idx}. **{item['name']}** - ₹{item['price']:,}\n"
                reco_text += f"   {item['description']}\n"
                reco_text += f"   Rating: {'⭐' * int(item['rating'])} ({item['rating']}/5)\n\n"
            
            reco_text += "Would you like to check availability or add any to cart?"
            
            state["messages"].append(AIMessage(content=reco_text))
            state["next_action"] = "inventory"  # Auto-route to inventory check
            
        else:
            state["messages"].append(AIMessage(content="I'm having trouble fetching recommendations. Let me try again."))
            state["next_action"] = "end"
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        state["messages"].append(AIMessage(content="Sorry, I couldn't fetch recommendations right now."))
        state["next_action"] = "end"
    
    return state


def inventory_agent_node(state: AgentState) -> AgentState:
    """
    Checks stock availability and delivery options
    """
    print("\n📦 INVENTORY AGENT: Checking stock...")
    
    if not state.get("recommendations"):
        state["messages"].append(AIMessage(content="No products selected yet. What are you looking for?"))
        state["next_action"] = "recommend"
        return state
    
    try:
        # Check inventory for top recommendation
        product = state["recommendations"][0]
        sku = product["sku"]
        
        response = requests.get(
            f"{API_BASE}/inventory/{sku}",
            params={"location": state.get("location", "Mumbai")},
            timeout=5
        )
        
        if response.status_code == 200:
            inventory = response.json()
            state["inventory_status"] = inventory
            
            if inventory["in_stock"]:
                msg = f"✅ Great news! **{product['name']}** is in stock!\n\n"
                msg += f"Available: {inventory['quantity']} units\n"
                msg += f"Location: {inventory['store_location']}\n\n"
                
                if inventory.get("delivery_options"):
                    msg += "**Delivery Options:**\n"
                    for option in inventory["delivery_options"]:
                        msg += f"• {option['type']}: {option['eta']} - ₹{option['cost']}\n"
                
                msg += "\n💳 Ready to proceed with payment?"
                state["next_action"] = "payment"
            else:
                msg = f"😔 Sorry, **{product['name']}** is currently out of stock.\n"
                msg += f"Expected restock: {inventory.get('restock_date', 'TBD')}\n\n"
                msg += "Would you like to see alternative recommendations?"
                state["next_action"] = "recommend"
            
            state["messages"].append(AIMessage(content=msg))
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        state["messages"].append(AIMessage(content="Couldn't check inventory. Please try again."))
        state["next_action"] = "end"
    
    return state


def payment_agent_node(state: AgentState) -> AgentState:
    """
    Processes payment and order confirmation
    """
    print("\n💳 PAYMENT AGENT: Processing payment...")
    
    try:
        # Calculate total from recommendations
        if not state.get("recommendations"):
            state["messages"].append(AIMessage(content="No items to checkout!"))
            state["next_action"] = "end"
            return state
        
        total_amount = sum(item["price"] for item in state["recommendations"][:1])  # First item
        
        payment_data = {
            "user_id": state["user_id"],
            "amount": total_amount,
            "items": [state["recommendations"][0]["sku"]],
            "channel": state.get("channel", "web")
        }
        
        response = requests.post(
            f"{API_BASE}/payment",
            json=payment_data,
            timeout=5
        )
        
        if response.status_code == 200:
            payment_result = response.json()
            state["payment_status"] = payment_result
            state["order_id"] = payment_result.get("order_id", "ORD_" + datetime.now().strftime("%Y%m%d%H%M%S"))
            
            if payment_result["status"] == "success":
                msg = f"🎉 Payment Successful!\n\n"
                msg += f"**Order ID:** {state['order_id']}\n"
                msg += f"**Amount:** ₹{total_amount:,}\n"
                msg += f"**Items:** {state['recommendations'][0]['name']}\n\n"
                msg += f"Transaction ID: {payment_result.get('transaction_id', 'TXN123')}\n\n"
                msg += "🎁 Checking for loyalty rewards..."
                
                state["next_action"] = "loyalty"
            else:
                msg = "❌ Payment failed. Please try again or use a different payment method."
                state["next_action"] = "end"
            
            state["messages"].append(AIMessage(content=msg))
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        state["messages"].append(AIMessage(content="Payment processing error. Please contact support."))
        state["next_action"] = "end"
    
    return state


def loyalty_agent_node(state: AgentState) -> AgentState:
    """
    Applies loyalty discounts and reward points
    """
    print("\n🎁 LOYALTY AGENT: Applying rewards...")
    
    try:
        response = requests.post(
            f"{API_BASE}/loyalty/apply",
            json={
                "user_id": state["user_id"],
                "order_id": state.get("order_id", ""),
                "amount": state["payment_status"].get("amount", 0)
            },
            timeout=5
        )
        
        if response.status_code == 200:
            loyalty = response.json()
            state["loyalty_points"] = loyalty.get("new_balance", 0)
            
            msg = f"🌟 **Loyalty Rewards Applied!**\n\n"
            msg += f"Points Earned: +{loyalty.get('points_earned', 0)}\n"
            msg += f"New Balance: {loyalty['new_balance']} points\n"
            
            if loyalty.get("discount_applied"):
                msg += f"Discount Applied: ₹{loyalty['discount_applied']}\n"
            
            msg += f"\n🎊 Thank you for your purchase! You'll receive a confirmation email shortly."
            
            state["messages"].append(AIMessage(content=msg))
            state["next_action"] = "post_purchase"
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        state["next_action"] = "post_purchase"
    
    return state


def post_purchase_agent_node(state: AgentState) -> AgentState:
    """
    Handles post-purchase activities: tracking, feedback, returns
    """
    print("\n📬 POST-PURCHASE AGENT: Setting up follow-up...")
    
    try:
        response = requests.post(
            f"{API_BASE}/post-purchase",
            json={
                "user_id": state["user_id"],
                "order_id": state.get("order_id", ""),
                "channel": state.get("channel", "web")
            },
            timeout=5
        )
        
        if response.status_code == 200:
            post_data = response.json()
            
            msg = f"📱 **What's Next?**\n\n"
            msg += f"• Track your order: {post_data.get('tracking_link', 'Check email')}\n"
            msg += f"• Estimated delivery: {post_data.get('delivery_eta', '3-5 days')}\n"
            msg += f"• Rate your experience: {post_data.get('feedback_link', 'Coming soon')}\n\n"
            msg += "Need help? Just ask! 😊"
            
            state["messages"].append(AIMessage(content=msg))
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    state["next_action"] = "end"
    return state


def end_node(state: AgentState) -> AgentState:
    """
    Graceful conversation ending
    """
    print("\n✅ CONVERSATION COMPLETED\n")
    state["messages"].append(AIMessage(content="Thank you for shopping with us! Feel free to return anytime. 🛍️"))
    return state

# =============================================================================
# ROUTING LOGIC
# =============================================================================

def route_after_sales_agent(state: AgentState) -> str:
    """
    Routes to next agent based on sales agent decision
    """
    next_action = state.get("next_action", "end")
    
    routing_map = {
        "recommend": "recommendation_agent",
        "inventory": "inventory_agent",
        "payment": "payment_agent",
        "loyalty": "loyalty_agent",
        "post_purchase": "post_purchase_agent",
        "end": "end"
    }
    
    return routing_map.get(next_action, "end")


# =============================================================================
# BUILD THE GRAPH
# =============================================================================

def create_retail_agent_graph():
    """
    Constructs the LangGraph workflow
    """
    workflow = StateGraph(AgentState)
    
    # Add all agent nodes
    workflow.add_node("sales_agent", sales_agent_node)
    workflow.add_node("recommendation_agent", recommendation_agent_node)
    workflow.add_node("inventory_agent", inventory_agent_node)
    workflow.add_node("payment_agent", payment_agent_node)
    workflow.add_node("loyalty_agent", loyalty_agent_node)
    workflow.add_node("post_purchase_agent", post_purchase_agent_node)
    workflow.add_node("end", end_node)
    
    # Define edges
    workflow.add_edge(START, "sales_agent")
    workflow.add_conditional_edges(
        "sales_agent",
        route_after_sales_agent,
        {
            "recommendation_agent": "recommendation_agent",
            "inventory_agent": "inventory_agent",
            "payment_agent": "payment_agent",
            "loyalty_agent": "loyalty_agent",
            "post_purchase_agent": "post_purchase_agent",
            "end": "end"
        }
    )
    
    # After each worker agent, return to sales agent for next decision
    workflow.add_edge("recommendation_agent", "inventory_agent")
    workflow.add_edge("inventory_agent", "payment_agent")
    workflow.add_edge("payment_agent", "loyalty_agent")
    workflow.add_edge("loyalty_agent", "post_purchase_agent")
    workflow.add_edge("post_purchase_agent", "end")
    workflow.add_edge("end", END)
    
    return workflow.compile()


# =============================================================================
# MAIN EXECUTION
# =============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("🛍️  MULTI-AGENT RETAIL SALES SYSTEM")
    print("=" * 70)
    
    # Initialize graph
    app = create_retail_agent_graph()
    
    # Test conversation
    initial_state = {
        "messages": [HumanMessage(content="I'm looking for running shoes")],
        "user_id": "C001",
        "user_name": "Priya Sharma",
        "channel": "mobile",
        "location": "Mumbai",
        "cart": [],
        "recommendations": [],
        "inventory_status": {},
        "payment_status": {},
        "loyalty_points": 250,
        "order_id": "",
        "next_action": "",
        "context": {},
        "session_id": "SESSION_" + datetime.now().strftime("%Y%m%d%H%M%S")
    }
    
    # Run the graph
    final_state = app.invoke(initial_state)
    
    # Print conversation history
    print("\n" + "=" * 70)
    print("📝 CONVERSATION TRANSCRIPT")
    print("=" * 70)
    for msg in final_state["messages"]:
        role = "👤 Customer" if isinstance(msg, HumanMessage) else "🤖 Agent"
        print(f"\n{role}: {msg.content}")
    
    print("\n" + "=" * 70)
    print("✅ Demo completed!")
    print("=" * 70)
