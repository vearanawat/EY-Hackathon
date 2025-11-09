# 🆓 QUICK FREE LLM SETUP

## 🎯 TL;DR - Get Running in 2 Minutes

### Option 1: Google Gemini (Easiest - DEFAULT)

```bash
# 1. Get free key: https://makersuite.google.com/app/apikey
# 2. Set it
export GOOGLE_API_KEY="AIzaSy..."

# 3. Install
pip install google-generativeai langchain-google-genai

# 4. Run (code already configured for Gemini!)
python mock_api_server.py  # Terminal 1
python demo_script.py       # Terminal 2
```

**✅ DONE! The system is already set up to use Gemini by default!**

---

### Option 2: Groq (Fastest)

```bash
# 1. Get free key: https://console.groq.com
export GROQ_API_KEY="gsk_..."

# 2. Install
pip install groq langchain-groq

# 3. Update ONE line in retail_agent_system.py
# Line 57: Change to: from langchain_groq import ChatGroq
# Line 107: Change to: llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0, groq_api_key=os.getenv("GROQ_API_KEY"))

# 4. Run
python mock_api_server.py
python demo_script.py
```

---

## 📊 Quick Comparison

| | Gemini | Groq | Hugging Face |
|---|---|---|---|
| Setup | ✅ Easiest | ✅ Easy | ⚠️ Moderate |
| Free Tier | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Speed | ⚡⚡⚡⚡ | ⚡⚡⚡⚡⚡ | ⚡⚡⚡ |
| Quality | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Recommended** | ✅ **YES** | 👍 For demos | 👍 For learning |

---

## 🚀 My Recommendation

**Use Google Gemini** - It's already configured in the code, has excellent quality, generous free tier, and is the easiest to set up. Just get the API key and you're done!

---

See **FREE_LLM_SETUP.md** for detailed instructions on all options.
