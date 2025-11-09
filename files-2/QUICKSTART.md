# 🚀 QUICK START GUIDE

Get your Multi-Agent Retail System running in 5 minutes!

---

## ⚡ Super Quick Setup (2 commands)

```bash
# 1. Install dependencies
pip install langgraph langchain langchain-openai flask flask-cors requests python-dotenv

# 2. Set your OpenAI API key
export OPENAI_API_KEY="your-key-here"
```

---

## 🎬 Run the Demo (3 steps)

### Step 1: Start API Server (Terminal 1)
```bash
python mock_api_server.py
```

You should see:
```
🚀 Starting Mock API Server
📊 Loaded 10 users
📦 Loaded 12 products
🌐 API running at: http://localhost:5000
```

### Step 2: Test the System (Terminal 2)

**Option A: Automated Demo**
```bash
python demo_script.py
```

**Option B: Interactive Chat**
```bash
python interactive_chat.py
```

**Option C: Simple Test**
```bash
python retail_agent_system.py
```

### Step 3: Enjoy! 🎉

---

## 💡 Usage Examples

### Interactive Chat Commands
```
You: I'm looking for running shoes
Agent: [Shows recommendations based on your profile]

You: Are they available in Mumbai?
Agent: [Checks inventory and shows stock]

You: Let's buy them
Agent: [Processes payment and applies loyalty rewards]

Commands:
- 'users' - Show all user profiles
- 'switch C002' - Switch to different user
- 'new' - Start new session
- 'exit' - End conversation
```

### Test Different User Profiles
```bash
# Fitness enthusiast (Priya)
User ID: C001

# Business professional (Rajesh)  
User ID: C002

# College student (Ananya)
User ID: C003

# Tech enthusiast (Mohammed)
User ID: C004

# See full list in user_demographics.json
```

---

## 🔍 Testing Individual Components

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Get user profile
curl http://localhost:5000/api/users/C001

# Get recommendations
curl http://localhost:5000/api/recommendations/C001

# Check inventory
curl http://localhost:5000/api/inventory/SKU001

# List all products
curl http://localhost:5000/api/products
```

### Test Agent Flow Programmatically
```python
from retail_agent_system import create_retail_agent_graph
from langchain_core.messages import HumanMessage

app = create_retail_agent_graph()

state = {
    "messages": [HumanMessage(content="Show me laptops")],
    "user_id": "C002",
    "user_name": "Rajesh Kumar",
    "channel": "web",
    "location": "Bangalore",
    # ... other fields
}

result = app.invoke(state)
print(result["messages"][-1].content)
```

---

## 🎯 Demo Scenarios (for video)

### Scenario 1: Web to Mobile (1 minute)
- Customer starts browsing on web
- Gets personalized recommendations
- Switches to mobile app
- Completes purchase

### Scenario 2: In-store Kiosk (1 minute)
- Customer walks into store
- Uses kiosk to check inventory
- Agent recognizes returning customer
- Reserves item for try-on

### Scenario 3: WhatsApp Order (1 minute)
- Customer messages on WhatsApp
- Agent provides product links
- Confirms delivery address
- Processes payment inline

### Scenario 4: Post-Purchase (1 minute)
- Order tracking
- Feedback collection
- Return handling
- Cross-sell opportunity

---

## 🐛 Troubleshooting

### Issue: "API server not running"
**Solution:**
```bash
# Check if port 5000 is available
lsof -i :5000

# Start API server
python mock_api_server.py
```

### Issue: "OpenAI API key not found"
**Solution:**
```bash
# Set in terminal
export OPENAI_API_KEY="sk-..."

# Or create .env file
echo "OPENAI_API_KEY=sk-..." > .env
```

### Issue: "Module not found"
**Solution:**
```bash
# Install all requirements
pip install -r requirements.txt

# Or install individually
pip install langgraph langchain langchain-openai
```

### Issue: "Connection refused"
**Solution:**
- Ensure API server is running on localhost:5000
- Check firewall settings
- Try: `curl http://localhost:5000/api/health`

---

## 📊 Expected Output

When running `python demo_script.py`, you'll see:

```
==================================================================
       🎬 MULTI-AGENT RETAIL SYSTEM - DEMO
            EY Techathon 6.0 - Problem Statement 5
==================================================================

SCENARIO 1: FITNESS ENTHUSIAST (WEB → MOBILE)

Customer Profile:
  • Name: Priya Sharma (28)
  • Location: Mumbai
  • Interest: Fitness, Running

👤 Customer: I'm looking for running shoes
🤖 Agent: Let me find the perfect products for you! 🔍

   [Shows Nike, Adidas recommendations]

✅ Scenario completed - Order placed!
📊 AOV: ₹10,995 | Loyalty Points: +110

[... more scenarios ...]

📊 KEY METRICS & IMPACT
Metric                         Before → After        Change
--------------------------------------------------------------------------------
Average Order Value (AOV)      ₹4,500 → ₹6,200      +37.8%     🟢
Conversion Rate                42% → 58%             +38.1%     🟢
[... more metrics ...]
```

---

## 🎥 4-Minute Demo Video Script

### 0:00-0:30 - Introduction
"This is an AI-powered conversational sales agent that orchestrates multiple specialized agents to provide seamless shopping experiences..."

### 0:30-1:30 - Scenario 1: Fitness Shopper
Show: Web → Mobile channel switching, personalized recommendations, quick checkout

### 1:30-2:30 - Scenario 2: Business Professional  
Show: In-store kiosk, inventory check, express delivery option

### 2:30-3:15 - Scenario 3: Tech Enthusiast
Show: Product comparison, loyalty rewards, order confirmation

### 3:15-4:00 - Results & Impact
Show: Metrics dashboard, AOV increase, conversion improvements

---

## ✅ Pre-Demo Checklist

- [ ] API server running (`python mock_api_server.py`)
- [ ] OpenAI API key configured
- [ ] All dependencies installed
- [ ] Test run completed successfully
- [ ] Screen recording software ready
- [ ] Demo script practiced (under 4 minutes)
- [ ] Backup scenarios prepared
- [ ] Metrics slides ready

---

## 🎓 Advanced Usage

### Add Custom Products
Edit `mock_api_server.py`:
```python
PRODUCTS["SKU013"] = {
    "sku": "SKU013",
    "name": "Custom Product",
    "price": 9999,
    # ... more fields
}
```

### Customize Agent Behavior
Edit `retail_agent_system.py`:
```python
def sales_agent_node(state):
    # Modify LLM prompt here
    context = f"""Your custom instructions..."""
```

### Add New Agent
```python
def custom_agent_node(state):
    # Your agent logic
    return state

# Add to graph
workflow.add_node("custom_agent", custom_agent_node)
```

---

## 🏆 Competition Tips

1. **Practice the Demo** - Run through it 5+ times
2. **Focus on Flow** - Show seamless agent orchestration
3. **Highlight Metrics** - Emphasize AOV and conversion increases
4. **Show Personality** - Let the AI feel conversational
5. **Handle Errors** - Demonstrate graceful fallbacks
6. **Time Management** - Keep under 4 minutes
7. **Visual Appeal** - Use colors, emojis, clear formatting

---

## 📚 Documentation

- `README.md` - Full system documentation
- `user_demographics.json` - All 10 user profiles
- `requirements.txt` - Dependencies list
- This file - Quick start guide

---

## 💬 Need Help?

If you encounter issues:
1. Check API server logs (Terminal 1)
2. Verify OpenAI API key is set
3. Ensure all dependencies installed
4. Review error messages carefully
5. Test individual components separately

---

## 🎉 You're Ready!

Your multi-agent retail system is ready to impress the judges. Good luck! 🚀
