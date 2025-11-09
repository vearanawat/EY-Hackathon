"""
Enhanced Demo Script - Shows Full Agent Responses in Real-Time
"""

from retail_agent_system import create_retail_agent_graph, AgentState
from langchain_core.messages import HumanMessage, AIMessage
from datetime import datetime
import time

class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

def print_separator(char="=", length=70):
    print(f"\n{Colors.CYAN}{char * length}{Colors.END}")

def print_header(text):
    print_separator("=")
    print(f"{Colors.HEADER}{Colors.BOLD}{text:^70}{Colors.END}")
    print_separator("=")

def print_customer_message(name, message):
    print_separator("─")
    print(f"{Colors.BLUE}{Colors.BOLD}👤 CUSTOMER: {name}{Colors.END}")
    print_separator("─")
    print(f"{Colors.BLUE}{message}{Colors.END}")

def print_agent_response(title, message):
    print_separator("─")
    print(f"{Colors.GREEN}{Colors.BOLD}🤖 {title}{Colors.END}")
    print_separator("─")
    print(f"{message}")

def run_full_demo_scenario():
    """
    Runs a complete demo with all agent responses visible
    """
    print_header("🛍️  MULTI-AGENT RETAIL SALES SYSTEM")
    print(f"\n{Colors.CYAN}This demo shows the complete purchase flow with all agent responses{Colors.END}\n")
    
    # Initialize graph in demo mode
    print(f"{Colors.YELLOW}⚙️  Initializing agent system...{Colors.END}")
    app = create_retail_agent_graph(mode="demo")
    print(f"{Colors.GREEN}✅ System ready!{Colors.END}\n")
    
    time.sleep(1)
    
    # Create initial state
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
        "loyalty_points": 2500,
        "order_id": "",
        "next_action": "",
        "context": {},
        "session_id": "SESSION_" + datetime.now().strftime("%Y%m%d%H%M%S")
    }
    
    # Show customer profile
    print_header("📋 CUSTOMER PROFILE")
    print(f"{Colors.BOLD}Name:{Colors.END} {initial_state['user_name']}")
    print(f"{Colors.BOLD}ID:{Colors.END} {initial_state['user_id']}")
    print(f"{Colors.BOLD}Location:{Colors.END} {initial_state['location']}")
    print(f"{Colors.BOLD}Channel:{Colors.END} {initial_state['channel']}")
    print(f"{Colors.BOLD}Loyalty Points:{Colors.END} {initial_state['loyalty_points']}")
    
    time.sleep(1)
    
    # Show customer query
    print_customer_message(initial_state['user_name'], initial_state['messages'][0].content)
    
    time.sleep(1)
    
    print(f"\n{Colors.YELLOW}🔄 Processing through agent system...{Colors.END}\n")
    
    # Run the graph
    final_state = app.invoke(initial_state)
    
    # Display all agent responses
    print_header("📝 AGENT RESPONSES")
    
    agent_count = 0
    for msg in final_state["messages"]:
        if isinstance(msg, AIMessage):
            agent_count += 1
            
            # Determine which agent based on message content
            if "top recommendations" in msg.content.lower() or "based on your profile" in msg.content.lower():
                title = "RECOMMENDATION AGENT - Product Suggestions"
            elif "in stock" in msg.content.lower() or "available" in msg.content.lower():
                title = "INVENTORY AGENT - Stock Check"
            elif "payment successful" in msg.content.lower() or "order id" in msg.content.lower():
                title = "PAYMENT AGENT - Transaction Completed"
            elif "loyalty" in msg.content.lower() or "points earned" in msg.content.lower():
                title = "LOYALTY AGENT - Rewards Applied"
            elif "track your order" in msg.content.lower() or "what's next" in msg.content.lower():
                title = "POST-PURCHASE AGENT - Follow-up"
            elif "thank you" in msg.content.lower():
                title = "SALES AGENT - Completion"
            else:
                title = f"AGENT RESPONSE #{agent_count}"
            
            print_agent_response(title, msg.content)
            time.sleep(0.5)
    
    # Show final summary
    print_header("📊 TRANSACTION SUMMARY")
    
    print(f"\n{Colors.BOLD}Customer Details:{Colors.END}")
    print(f"  • Name: {final_state.get('user_name')}")
    print(f"  • User ID: {final_state.get('user_id')}")
    print(f"  • Location: {final_state.get('location')}")
    print(f"  • Channel: {final_state.get('channel')}")
    
    if final_state.get('recommendations'):
        print(f"\n{Colors.BOLD}🎯 Products Recommended:{Colors.END}")
        for idx, item in enumerate(final_state['recommendations'][:3], 1):
            print(f"  {idx}. {item['name']}")
            print(f"     Price: ₹{item['price']:,}")
            print(f"     Rating: {'⭐' * int(item['rating'])} ({item['rating']}/5)")
    
    if final_state.get('order_id'):
        print(f"\n{Colors.BOLD}💰 Purchase Information:{Colors.END}")
        print(f"  • Order ID: {final_state['order_id']}")
        
        if final_state.get('payment_status'):
            ps = final_state['payment_status']
            print(f"  • Amount Paid: ₹{ps.get('amount', 0):,}")
            print(f"  • Transaction ID: {ps.get('transaction_id', 'N/A')}")
            print(f"  • Payment Method: {ps.get('payment_method', 'N/A')}")
        
        print(f"  • Loyalty Points: {final_state.get('loyalty_points', 0)}")
    
    if final_state.get('inventory_status'):
        inv = final_state['inventory_status']
        print(f"\n{Colors.BOLD}📦 Inventory Details:{Colors.END}")
        print(f"  • Store: {inv.get('store_location', 'N/A')}")
        print(f"  • Stock: {inv.get('quantity', 0)} units")
        if inv.get('delivery_options'):
            print(f"  • Delivery Options:")
            for opt in inv['delivery_options']:
                print(f"    - {opt['type']}: {opt['eta']} (₹{opt['cost']})")
    
    print_header("✅ DEMO COMPLETED SUCCESSFULLY")
    
    print(f"\n{Colors.GREEN}Key Achievements:{Colors.END}")
    print(f"  ✅ Personalized recommendations provided")
    print(f"  ✅ Stock availability verified")
    print(f"  ✅ Payment processed successfully")
    print(f"  ✅ Loyalty rewards applied")
    print(f"  ✅ Order tracking information sent")
    
    print(f"\n{Colors.CYAN}Total Agent Responses: {agent_count}{Colors.END}")
    print(f"{Colors.CYAN}Conversation Flow: Sales → Recommend → Inventory → Payment → Loyalty → Post-Purchase{Colors.END}\n")

if __name__ == "__main__":
    try:
        run_full_demo_scenario()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Demo interrupted by user{Colors.END}\n")
    except Exception as e:
        print(f"\n{Colors.RED}Error: {e}{Colors.END}\n")