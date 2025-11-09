# 🛍️ Multi-Agent Retail Sales System

**EY Techathon 6.0 - Problem Statement 5: Retail**

An intelligent, conversational AI system that orchestrates multiple specialized agents to provide seamless shopping experiences across all channels (web, mobile, WhatsApp, kiosk, voice).

---

## 🎯 Problem Statement

Create an Agentic AI solution where a Sales Agent:
- Engages customers via multiple channels (web chat, mobile app, WhatsApp/Telegram, in-store kiosk, voice assistant)
- Understands preferences and context (past purchases, store location, current promotions)
- Coordinates multiple Worker Agents to handle inventory checks, personalized recommendations, promotions lookup, payment processing, and order confirmation
- Provides end-to-end orchestration: recommendation → inventory check → payment → fulfillment → post-purchase follow-up

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     SALES AGENT (Orchestrator)               │
│         Uses LLM to understand intent & route requests       │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│  RECOMMENDATION  │  │    INVENTORY     │
│      AGENT       │  │      AGENT       │
│ • User profiling │  │ • Stock checking │
│ • Product match  │  │ • Store locator  │
│ • Personalization│  │ • Delivery opts  │
└────────┬─────────┘  └─────────┬────────┘
         │                      │
         ▼                      ▼
┌──────────────────┐  ┌──────────────────┐
│    PAYMENT       │  │     LOYALTY      │
│      AGENT       │  │      AGENT       │
│ • Transaction    │  │ • Points calc    │
│ • Confirmation   │  │ • Tier benefits  │
│ • Receipt gen    │  │ • Discounts      │
└────────┬─────────┘  └─────────┬────────┘
         │                      │
         └──────────┬───────────┘
                    ▼
         ┌──────────────────────┐
         │   POST-PURCHASE      │
         │       AGENT          │
         │ • Order tracking     │
         │ • Feedback collection│
         │ • Return handling    │
         └──────────────────────┘
```

---

## 🧩 Agent Capabilities

| Agent | Purpose | Key Functions |
|-------|---------|---------------|
| **Sales Agent** | Main orchestrator - routes requests to worker agents | Intent understanding, conversation flow, decision making |
| **Recommendation Agent** | Suggests products based on user profile & preferences | Product matching, personalization, ranking |
| **Inventory Agent** | Checks stock availability and delivery options | Real-time inventory, store locator, shipping estimates |
| **Payment Agent** | Processes transactions and order confirmation | Payment processing, receipt generation, order creation |
| **Loyalty Agent** | Applies rewards, discounts, and loyalty benefits | Points calculation, tier management, discount application |
| **Post-Purchase Agent** | Handles tracking, feedback, and returns | Order tracking, feedback collection, returns management |

---

## 🗂️ Project Structure

```
retail-agent-system/
│
├── retail_agent_system.py      # Main LangGraph agent system
├── mock_api_server.py           # Mock backend APIs with dummy data
├── interactive_chat.py          # CLI chatbot interface
├── requirements.txt             # Python dependencies
├── README.md                    # This file
│
└── data/
    ├── users.json               # 10 diverse user profiles (auto-generated)
    ├── products.json            # Product catalog (auto-generated)
    └── conversation_logs/       # Conversation history (auto-created)
```

---

## 📋 Prerequisites

- Python 3.9+
- OpenAI API key (for GPT-4o-mini)
- pip package manager

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set OpenAI API Key

```bash
export OPENAI_API_KEY="your-api-key-here"
```

Or create a `.env` file:
```
OPENAI_API_KEY=your-api-key-here
```

### 3. Start the Mock API Server

In **Terminal 1**:
```bash
python mock_api_server.py
```

This starts the backend API at `http://localhost:5000`

### 4. Run the Agent System

In **Terminal 2**:

**Option A: Test with predefined scenario**
```bash
python retail_agent_system.py
```

**Option B: Interactive chat mode**
```bash
python interactive_chat.py
```

---

## 👥 10 Diverse User Demographics

The system includes 10 realistic user personas with varying:

| User ID | Name | Age | Location | Income | Lifestyle | Purchase Behavior |
|---------|------|-----|----------|--------|-----------|-------------------|
| **C001** | Priya Sharma | 28 | Mumbai | ₹8-12L | Fitness enthusiast | Monthly, ₹4.5K AOV |
| **C002** | Rajesh Kumar | 42 | Bangalore | ₹15-25L | Business professional | Bi-monthly, ₹12K AOV |
| **C003** | Ananya Iyer | 22 | Chennai | ₹3-5L | College student | Weekly, ₹1.8K AOV |
| **C004** | Mohammed Zubair | 35 | Hyderabad | ₹10-15L | Tech enthusiast/gamer | Quarterly, ₹8.5K AOV |
| **C005** | Sneha Desai | 31 | Pune | ₹7-10L | Working mom | Monthly, ₹5.5K AOV |
| **C006** | Arjun Patel | 26 | Ahmedabad | ₹5-8L | Music lover | Bi-monthly, ₹3.2K AOV |
| **C007** | Lakshmi Menon | 55 | Kochi | ₹12-18L | Health conscious | Monthly, ₹7K AOV |
| **C008** | Vikram Singh | 38 | Delhi NCR | ₹20-30L | Luxury enthusiast | Monthly, ₹25K AOV |
| **C009** | Riya Verma | 19 | Jaipur | ₹0-3L | Budget shopper | Monthly, ₹800 AOV |
| **C010** | Karthik Reddy | 45 | Visakhapatnam | ₹18-25L | Doctor/fitness advocate | Bi-monthly, ₹9.5K AOV |

**Key Demographics Covered:**
- **Age Range**: 19-55 years
- **Income Levels**: Budget (₹0-3L) to Premium (₹20-30L)
- **Locations**: 10 major Indian cities
- **Lifestyles**: Students, professionals, parents, luxury shoppers, fitness enthusiasts
- **Purchase Patterns**: Weekly to quarterly shoppers

---

## 🎭 Example Conversations

### Scenario 1: Fitness Enthusiast (Priya - C001)

```
👤 Customer: "I'm looking for running shoes"

🤖 Agent: "Let me find the perfect products for you! 🔍"
         → Recommendations: Nike Air Zoom Pegasus, Adidas Ultraboost

👤 Customer: "Are they available in Mumbai?"

🤖 Agent: "Checking inventory availability... 📦"
         → ✅ In stock at Mumbai Central, 45 units available

👤 Customer: "Let's buy the Nike ones"

🤖 Agent: "Processing your payment... 💳"
         → Payment successful! Order #ORD20241103...
         → Loyalty rewards: +109 points, Gold tier 5% discount applied
         → Tracking link sent, delivery in 3-5 days
```

### Scenario 2: Tech Enthusiast (Mohammed - C004)

```
👤 Customer: "Show me gaming laptops under 2 lakhs"

🤖 Agent: "Based on your profile, here are my top recommendations:
         1. ASUS ROG Strix G16 - ₹1,59,900
            Gaming powerhouse with RTX 4070
         2. Dell XPS 15 - ₹1,35,000
            Premium business laptop with 4K OLED"

👤 Customer: "I'll take the ASUS one"

🤖 Agent: "Great choice! Processing...
         → Stock confirmed in Hyderabad Hitech City
         → Payment successful
         → Platinum tier: 12% discount applied (₹19,188 saved!)
         → You earned 1,599 loyalty points"
```

---

## 🔧 Configuration

### Customizing Product Recommendations

Edit `mock_api_server.py`:

```python
# Add your products
PRODUCTS["SKU013"] = {
    "sku": "SKU013",
    "name": "Your Product",
    "category": "Category",
    "price": 9999,
    "description": "Description",
    "rating": 4.5,
    "tags": ["tag1", "tag2"]
}
```

### Adjusting Agent Behavior

Modify prompts in `retail_agent_system.py`:

```python
def sales_agent_node(state: AgentState) -> AgentState:
    context = f"""
    [Customize the LLM prompt here]
    """
```

---

## 🧪 Testing

### Test Individual Agents

```python
from retail_agent_system import create_retail_agent_graph

app = create_retail_agent_graph()

# Test with different user profiles
test_state = {
    "user_id": "C002",  # Try C001-C010
    "messages": [HumanMessage(content="Show me business laptops")],
    # ... other state fields
}

result = app.invoke(test_state)
```

### Test API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Get recommendations
curl http://localhost:5000/api/recommendations/C001

# Check inventory
curl http://localhost:5000/api/inventory/SKU001

# Process payment
curl -X POST http://localhost:5000/api/payment \
  -H "Content-Type: application/json" \
  -d '{"user_id":"C001","amount":10995,"items":["SKU001"]}'
```

---

## 📊 Key Metrics Tracked

- **Average Order Value (AOV)**: Tracked per user
- **Conversion Rate**: Payment success vs browsing
- **Agent Routing Efficiency**: Decision accuracy
- **Customer Satisfaction**: Post-purchase feedback
- **Loyalty Engagement**: Points earned, redemption rate

---

## 🎯 Implementation Highlights

### 1. **LangGraph State Management**
- Maintains conversation context across all agents
- Passes user profile, cart, and preferences seamlessly

### 2. **Intelligent Routing**
- LLM-powered Sales Agent decides next action
- Conditional edges based on conversation flow

### 3. **Multi-Channel Support**
- Same agent logic works across web, mobile, WhatsApp, kiosk
- Channel-specific customizations in state

### 4. **Personalization Engine**
- Recommendations based on purchase history
- Location-aware inventory checks
- Loyalty tier-based pricing

### 5. **Error Handling**
- Graceful fallbacks for API failures
- Retry mechanisms for critical operations
- User-friendly error messages

---

## 🚧 Roadmap / Next Steps

- [ ] Add Redis for session persistence
- [ ] Implement RAG for product search from descriptions
- [ ] Add voice interface using Whisper + TTS
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Real-time analytics dashboard
- [ ] A/B testing framework for agent prompts
- [ ] Integration with actual payment gateways
- [ ] WhatsApp Business API integration

---

## 📝 Demo Script (4-minute walkthrough)

### Minute 1: Introduction
- Show system architecture diagram
- Explain agent roles and orchestration

### Minute 2: Scenario 1 - Web to Mobile
- Customer starts on web: "I want running shoes"
- Shows recommendations based on profile
- Customer switches to mobile app (maintain context)
- Complete purchase with loyalty rewards

### Minute 3: Scenario 2 - In-store Kiosk
- Customer walks into store, uses kiosk
- Agent recognizes returning customer
- Shows personalized recommendations
- Reserve item for try-on

### Minute 4: Post-Purchase
- Order tracking link sent
- Feedback request
- Show how agent handles returns query
- Highlight seamless omnichannel experience

---

## 🤝 Contributing

This is a hackathon submission, but feel free to:
1. Fork the repository
2. Create feature branches
3. Submit pull requests
4. Report issues

---

## 📄 License

MIT License - Feel free to use for learning and hackathons!

---

## 🙏 Acknowledgments

- **LangGraph** by LangChain for agent orchestration
- **OpenAI** for GPT-4o-mini
- **Flask** for mock API server
- **EY Techathon 6.0** for the problem statement

---

## 📧 Contact

For questions or demo requests:
- **Email**: your-email@example.com
- **LinkedIn**: [Your Profile]
- **GitHub**: [Your Repo]

---

## 🎉 Good Luck!

Remember: The key to winning is showing **seamless orchestration**, **intelligent routing**, and **personalized experiences** across channels. Focus on the demo flow and make it conversational!

**Pro Tips for Demo:**
1. Use real customer names and scenarios
2. Show error handling (e.g., out-of-stock)
3. Highlight loyalty benefits and AOV increase
4. Demonstrate channel switching smoothly
5. End with metrics: "Increased AOV by 35%!"
