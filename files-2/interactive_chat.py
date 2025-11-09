"""
Interactive CLI Chatbot for Retail Agent System
Allows users to chat with the multi-agent system in real-time
"""

from retail_agent_system import create_retail_agent_graph, AgentState
from langchain_core.messages import HumanMessage, AIMessage
from datetime import datetime
import sys
import os

# Color codes for terminal
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_banner():
    """Print welcome banner"""
    print("\n" + "=" * 70)
    print(f"{Colors.HEADER}{Colors.BOLD}🛍️  RETAIL SALES AGENT - INTERACTIVE CHAT{Colors.ENDC}")
    print("=" * 70)
    print(f"{Colors.OKCYAN}Welcome to the AI-powered shopping assistant!")
    print("Chat naturally and I'll help you find products, check inventory,")
    print(f"process payments, and more!{Colors.ENDC}")
    print("=" * 70)
    print(f"\n{Colors.WARNING}Commands:{Colors.ENDC}")
    print("  • Type 'exit' or 'quit' to end conversation")
    print("  • Type 'new' to start a new session")
    print("  • Type 'users' to see available user profiles")
    print("  • Type 'switch <user_id>' to switch users")
    print("=" * 70 + "\n")

def print_users():
    """Display available user profiles"""
    users = {
        "C001": "Priya Sharma (28, Mumbai) - Fitness enthusiast",
        "C002": "Rajesh Kumar (42, Bangalore) - Business professional",
        "C003": "Ananya Iyer (22, Chennai) - College student",
        "C004": "Mohammed Zubair (35, Hyderabad) - Tech enthusiast",
        "C005": "Sneha Desai (31, Pune) - Working mom",
        "C006": "Arjun Patel (26, Ahmedabad) - Music lover",
        "C007": "Lakshmi Menon (55, Kochi) - Health conscious",
        "C008": "Vikram Singh (38, Delhi) - Luxury enthusiast",
        "C009": "Riya Verma (19, Jaipur) - Budget shopper",
        "C010": "Karthik Reddy (45, Visakhapatnam) - Doctor"
    }
    
    print(f"\n{Colors.OKBLUE}{'=' * 70}")
    print(f"{'AVAILABLE USER PROFILES':^70}")
    print(f"{'=' * 70}{Colors.ENDC}\n")
    
    for user_id, description in users.items():
        print(f"  {Colors.OKGREEN}{user_id}{Colors.ENDC}: {description}")
    
    print(f"\n{Colors.OKBLUE}{'=' * 70}{Colors.ENDC}\n")

def select_user():
    """Let user select which profile to use"""
    print_users()
    
    while True:
        user_id = input(f"{Colors.BOLD}Select User ID (or press Enter for C001): {Colors.ENDC}").strip()
        
        if not user_id:
            user_id = "C001"
        
        if user_id in ["C001", "C002", "C003", "C004", "C005", "C006", "C007", "C008", "C009", "C010"]:
            return user_id
        else:
            print(f"{Colors.FAIL}Invalid user ID. Please try again.{Colors.ENDC}")

def get_user_details(user_id):
    """Get user profile details"""
    users_map = {
        "C001": {"name": "Priya Sharma", "location": "Mumbai"},
        "C002": {"name": "Rajesh Kumar", "location": "Bangalore"},
        "C003": {"name": "Ananya Iyer", "location": "Chennai"},
        "C004": {"name": "Mohammed Zubair", "location": "Hyderabad"},
        "C005": {"name": "Sneha Desai", "location": "Pune"},
        "C006": {"name": "Arjun Patel", "location": "Ahmedabad"},
        "C007": {"name": "Lakshmi Menon", "location": "Kochi"},
        "C008": {"name": "Vikram Singh", "location": "Delhi NCR"},
        "C009": {"name": "Riya Verma", "location": "Jaipur"},
        "C010": {"name": "Karthik Reddy", "location": "Visakhapatnam"}
    }
    return users_map.get(user_id, {"name": "Guest", "location": "Mumbai"})

def initialize_session(user_id):
    """Initialize a new conversation session"""
    user_details = get_user_details(user_id)
    
    state = {
        "messages": [],
        "user_id": user_id,
        "user_name": user_details["name"],
        "channel": "web",
        "location": user_details["location"],
        "cart": [],
        "recommendations": [],
        "inventory_status": {},
        "payment_status": {},
        "loyalty_points": 0,
        "order_id": "",
        "next_action": "",
        "context": {},
        "session_id": "SESSION_" + datetime.now().strftime("%Y%m%d%H%M%S")
    }
    
    return state

def run_chat():
    """Main chat loop"""
    print_banner()
    
    # Select user
    user_id = select_user()
    user_details = get_user_details(user_id)
    
    print(f"\n{Colors.OKGREEN}✅ Logged in as: {user_details['name']} ({user_id})")
    print(f"📍 Location: {user_details['location']}{Colors.ENDC}\n")
    
    # Initialize graph
    print(f"{Colors.OKCYAN}🔄 Initializing agent system...{Colors.ENDC}")
    app = create_retail_agent_graph()
    
    # Initialize session
    state = initialize_session(user_id)
    
    print(f"{Colors.OKGREEN}✅ System ready!{Colors.ENDC}\n")
    print(f"{Colors.BOLD}Agent: Hello {user_details['name']}! 👋 How can I help you today?{Colors.ENDC}\n")
    
    while True:
        try:
            # Get user input
            user_input = input(f"{Colors.OKBLUE}You: {Colors.ENDC}").strip()
            
            if not user_input:
                continue
            
            # Handle commands
            if user_input.lower() in ['exit', 'quit', 'bye']:
                print(f"\n{Colors.OKCYAN}Thank you for shopping with us! Goodbye! 👋{Colors.ENDC}\n")
                break
            
            elif user_input.lower() == 'new':
                print(f"\n{Colors.WARNING}Starting new session...{Colors.ENDC}\n")
                user_id = select_user()
                user_details = get_user_details(user_id)
                state = initialize_session(user_id)
                print(f"{Colors.OKGREEN}✅ New session started for {user_details['name']}!{Colors.ENDC}\n")
                continue
            
            elif user_input.lower() == 'users':
                print_users()
                continue
            
            elif user_input.lower().startswith('switch '):
                new_user_id = user_input.split()[1].upper()
                if new_user_id in ["C001", "C002", "C003", "C004", "C005", "C006", "C007", "C008", "C009", "C010"]:
                    user_id = new_user_id
                    user_details = get_user_details(user_id)
                    state = initialize_session(user_id)
                    print(f"\n{Colors.OKGREEN}✅ Switched to {user_details['name']} ({user_id}){Colors.ENDC}\n")
                else:
                    print(f"{Colors.FAIL}Invalid user ID{Colors.ENDC}\n")
                continue
            
            # Process message through agent system
            state["messages"].append(HumanMessage(content=user_input))
            
            print(f"\n{Colors.OKCYAN}🤔 Agent is thinking...{Colors.ENDC}\n")
            
            # Run through graph (single pass for interactive mode)
            # Note: This simplified version processes one step at a time
            try:
                result_state = app.invoke(state)
                
                # Get the last AI message
                ai_messages = [msg for msg in result_state["messages"] if isinstance(msg, AIMessage)]
                if ai_messages:
                    last_message = ai_messages[-1].content
                    print(f"{Colors.BOLD}Agent: {last_message}{Colors.ENDC}\n")
                
                # Update state for next turn
                state = result_state
                
            except Exception as e:
                print(f"{Colors.FAIL}❌ Error: {str(e)}{Colors.ENDC}")
                print(f"{Colors.WARNING}Please try again or start a new session.{Colors.ENDC}\n")
        
        except KeyboardInterrupt:
            print(f"\n\n{Colors.WARNING}Interrupted by user. Exiting...{Colors.ENDC}\n")
            break
        
        except Exception as e:
            print(f"\n{Colors.FAIL}Unexpected error: {str(e)}{Colors.ENDC}\n")

def main():
    """Entry point"""
    # Check if API server is running
    try:
        import requests
        response = requests.get("http://localhost:5000/api/health", timeout=2)
        if response.status_code != 200:
            raise Exception("API not healthy")
    except:
        print(f"\n{Colors.FAIL}{'=' * 70}")
        print("❌ ERROR: Mock API server is not running!")
        print("=" * 70)
        print(f"\n{Colors.WARNING}Please start the API server first:{Colors.ENDC}")
        print(f"  {Colors.OKGREEN}python mock_api_server.py{Colors.ENDC}")
        print(f"\nThen run this script again.\n")
        sys.exit(1)
    
    # Check for any LLM API key
    api_keys = ['GOOGLE_API_KEY', 'OPENAI_API_KEY', 'GROQ_API_KEY', 'HUGGINGFACE_API_TOKEN']
    key_found = any(os.getenv(key) for key in api_keys)
    
    if not key_found:
        print(f"\n{Colors.FAIL}{'=' * 70}")
        print("❌ ERROR: No LLM API key found!")
        print("=" * 70)
        print(f"\n{Colors.WARNING}FREE Options (No credit card needed):{Colors.ENDC}")
        print(f"  {Colors.OKGREEN}1. Google Gemini:{Colors.ENDC}")
        print(f"     export GOOGLE_API_KEY='your-key'")
        print(f"     Get free key: https://makersuite.google.com/app/apikey")
        print(f"\n  {Colors.OKGREEN}2. Groq:{Colors.ENDC}")
        print(f"     export GROQ_API_KEY='your-key'")
        print(f"     Get free key: https://console.groq.com")
        print(f"\n  {Colors.OKGREEN}3. Hugging Face:{Colors.ENDC}")
        print(f"     export HUGGINGFACE_API_TOKEN='your-key'")
        print(f"     Get free key: https://huggingface.co/settings/tokens")
        print(f"\n{Colors.OKCYAN}See FREE_LLM_SETUP.md for detailed instructions{Colors.ENDC}\n")
        sys.exit(1)
    
    run_chat()

if __name__ == "__main__":
    main()
