"""
SIMPLE Interactive Chat - No Loops, Clean Output
This version creates a fresh graph for each query to avoid state pollution
"""

from retail_agent_system import create_retail_agent_graph
from langchain_core.messages import HumanMessage, AIMessage
from datetime import datetime
import sys
import os
from dotenv import load_dotenv
load_dotenv()
# Colors
class C:
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

def get_user_info(user_id):
    users = {
        "C001": ("Priya Sharma", "Mumbai"),
        "C002": ("Rajesh Kumar", "Bangalore"),
        "C003": ("Ananya Iyer", "Chennai"),
        "C004": ("Mohammed Zubair", "Hyderabad"),
        "C005": ("Sneha Desai", "Pune"),
        "C006": ("Arjun Patel", "Ahmedabad"),
        "C007": ("Lakshmi Menon", "Kochi"),
        "C008": ("Vikram Singh", "Delhi NCR"),
        "C009": ("Riya Verma", "Jaipur"),
        "C010": ("Karthik Reddy", "Visakhapatnam")
    }
    return users.get(user_id, ("Guest", "Mumbai"))

def main():
    print(f"\n{C.BOLD}🛍️  RETAIL SALES AGENT{C.END}\n")
    
    # Check API
    try:
        import requests
        requests.get("http://localhost:5000/api/health", timeout=2)
    except:
        print(f"{C.RED}❌ API server not running! Start: python mock_api_server.py{C.END}\n")
        sys.exit(1)
    
    # Check LLM key
    if not (os.getenv("GOOGLE_API_KEY") or os.getenv("OPENAI_API_KEY") or os.getenv("GROQ_API_KEY")):
        print(f"{C.RED}❌ No LLM API key! Set: export GOOGLE_API_KEY='your-key'{C.END}\n")
        sys.exit(1)
    
    # Select user
    print(f"{C.YELLOW}Users: C001-C010{C.END}")
    user_id = input(f"{C.BOLD}User ID (Enter=C001): {C.END}").strip().upper() or "C001"
    name, location = get_user_info(user_id)
    
    print(f"\n{C.GREEN}✅ {name} ({location}){C.END}")
    print(f"{C.BOLD}Agent: Hello! How can I help?{C.END}\n")
    
    # Initialize graph ONCE
    print(f"{C.YELLOW}Loading...{C.END}")
    app = create_retail_agent_graph(mode="interactive")
    print(f"{C.GREEN}Ready!{C.END}\n")
    
    # Conversation loop
    while True:
        try:
            user_input = input(f"{C.BLUE}You: {C.END}").strip()
            
            if not user_input:
                continue
            
            if user_input.lower() in ['exit', 'quit', 'bye']:
                print(f"\n{C.GREEN}Goodbye!{C.END}\n")
                break
            
            # Create FRESH state for each query (prevents loop!)
            state = {
                "messages": [HumanMessage(content=user_input)],
                "user_id": user_id,
                "user_name": name,
                "channel": "web",
                "location": location,
                "cart": [],
                "recommendations": [],
                "inventory_status": {},
                "payment_status": {},
                "loyalty_points": 0,
                "order_id": "",
                "next_action": "",
                "context": {},
                "session_id": "S" + datetime.now().strftime("%Y%m%d%H%M%S")
            }
            
            print(f"\n{C.YELLOW}Thinking...{C.END}\n")
            
            # Run graph
            result = app.invoke(state)
            
            # Get ONLY AI messages (skip the human message we sent)
            ai_messages = [m for m in result["messages"] if isinstance(m, AIMessage)]
            
            # Print each response ONCE
            for msg in ai_messages:
                print(f"{C.BOLD}Agent:{C.END} {msg.content}\n")
            
        except KeyboardInterrupt:
            print(f"\n\n{C.YELLOW}Interrupted{C.END}\n")
            break
        except Exception as e:
            print(f"\n{C.RED}Error: {e}{C.END}\n")

if __name__ == "__main__":
    main()
