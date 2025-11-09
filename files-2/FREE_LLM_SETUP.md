# 🆓 FREE LLM ALTERNATIVES - SETUP GUIDE

No OpenAI API key? No problem! Here are **3 free alternatives** you can use.

---

## 🌟 OPTION 1: GOOGLE GEMINI (RECOMMENDED)

### ✅ Why Choose Gemini?
- **Completely FREE** - No credit card required
- **Generous limits** - 15 RPM, 1M tokens/day
- **High quality** - Comparable to GPT-4
- **Easy setup** - 2 minutes

### 📝 Setup Steps

#### 1. Get Free API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy your key (starts with `AIza...`)

#### 2. Install Package
```bash
pip install google-generativeai langchain-google-genai
```

#### 3. Set Environment Variable
```bash
export GOOGLE_API_KEY="AIzaSy..."
```

#### 4. Update Code
The system is already configured for Gemini! Just set your API key:

```bash
export GOOGLE_API_KEY="your-key-here"
python mock_api_server.py
python demo_script.py
```

**That's it! 🎉**

---

## ⚡ OPTION 2: GROQ (FASTEST)

### ✅ Why Choose Groq?
- **Blazing fast** - 10x faster than OpenAI
- **Free tier** - 14,400 requests/day
- **No credit card** - Just email signup
- **Great for demos** - Super responsive

### 📝 Setup Steps

#### 1. Get Free API Key
1. Visit: https://console.groq.com
2. Sign up with email (no credit card)
3. Go to API Keys section
4. Create new key

#### 2. Install Package
```bash
pip install groq langchain-groq
```

#### 3. Update retail_agent_system.py

Find this line (around line 57):
```python
from langchain_google_genai import ChatGoogleGenerativeAI
```

Replace with:
```python
from langchain_groq import ChatGroq
```

Find this section (around line 107):
```python
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)
```

Replace with:
```python
llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0,
    groq_api_key=os.getenv("GROQ_API_KEY")
)
```

#### 4. Set Environment Variable & Run
```bash
export GROQ_API_KEY="gsk_..."
python mock_api_server.py
python demo_script.py
```

---

## 🤗 OPTION 3: HUGGING FACE

### ✅ Why Choose Hugging Face?
- **Many models** - Choose from thousands
- **Open source** - Complete transparency
- **Free inference** - API included
- **Good for learning** - Educational use

### 📝 Setup Steps

#### 1. Get Free API Key
1. Visit: https://huggingface.co/settings/tokens
2. Sign up (no credit card)
3. Click **"New token"**
4. Select "Read" access
5. Copy token (starts with `hf_...`)

#### 2. Install Package
```bash
pip install huggingface_hub langchain-huggingface
```

#### 3. Update retail_agent_system.py

Find this line:
```python
from langchain_google_genai import ChatGoogleGenerativeAI
```

Replace with:
```python
from langchain_huggingface import HuggingFaceEndpoint
```

Find this section:
```python
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)
```

Replace with:
```python
llm = HuggingFaceEndpoint(
    repo_id="microsoft/Phi-3-mini-4k-instruct",
    temperature=0,
    huggingfacehub_api_token=os.getenv("HUGGINGFACE_API_TOKEN")
)
```

#### 4. Set Environment Variable & Run
```bash
export HUGGINGFACE_API_TOKEN="hf_..."
python mock_api_server.py
python demo_script.py
```

---

## 📊 COMPARISON TABLE

| Feature | Google Gemini | Groq | Hugging Face |
|---------|--------------|------|--------------|
| **Free Tier** | 1M tokens/day | 14.4K req/day | Limited but generous |
| **Speed** | Fast | **Fastest** | Moderate |
| **Quality** | **Excellent** | Very Good | Good |
| **Setup** | **Easiest** | Easy | Moderate |
| **Credit Card** | ❌ No | ❌ No | ❌ No |
| **Best For** | Production | Demos | Learning |

---

## 🎯 QUICK DECISION GUIDE

### Choose Google Gemini if:
- ✅ You want the **easiest setup** (default in our code)
- ✅ You need **high quality** responses
- ✅ You want **generous free limits**
- ✅ You're building a **production demo**

### Choose Groq if:
- ✅ You want **blazing fast** responses
- ✅ You're doing a **live demo**
- ✅ Speed matters more than perfect accuracy
- ✅ You want to **impress with performance**

### Choose Hugging Face if:
- ✅ You want **open source** models
- ✅ You're **learning** about LLMs
- ✅ You want to **experiment** with different models
- ✅ Transparency is important

---

## 🔧 COMPLETE SETUP EXAMPLE (GEMINI)

```bash
# 1. Install everything
pip install google-generativeai langchain-google-genai
pip install -r requirements.txt

# 2. Get API key from https://makersuite.google.com/app/apikey

# 3. Set environment variable
export GOOGLE_API_KEY="AIzaSy..."

# 4. Verify
python verify_system.py

# 5. Run!
python mock_api_server.py  # Terminal 1
python demo_script.py       # Terminal 2
```

---

## 🔧 COMPLETE SETUP EXAMPLE (GROQ)

```bash
# 1. Install
pip install groq langchain-groq
pip install -r requirements.txt

# 2. Get API key from https://console.groq.com

# 3. Update code (see instructions above)

# 4. Set environment variable
export GROQ_API_KEY="gsk_..."

# 5. Run!
python mock_api_server.py  # Terminal 1
python demo_script.py       # Terminal 2
```

---

## 🐛 TROUBLESHOOTING

### Error: "API key not found"
```bash
# Make sure you've set the environment variable
echo $GOOGLE_API_KEY  # or $GROQ_API_KEY or $HUGGINGFACE_API_TOKEN

# If empty, set it again
export GOOGLE_API_KEY="your-key"
```

### Error: "Rate limit exceeded"
**Solution:** 
- Gemini: Wait a minute (15 RPM limit)
- Groq: You've used your daily limit (14,400 requests)
- HuggingFace: Wait or use different model

### Error: "Module not found"
```bash
# Install the specific package
pip install langchain-google-genai  # for Gemini
pip install langchain-groq          # for Groq
pip install langchain-huggingface   # for HuggingFace
```

---

## 📝 UPDATED requirements.txt

Add these to your `requirements.txt`:

```txt
# Original
langgraph>=0.0.20
langchain>=0.1.0
langchain-core>=0.1.0
flask>=3.0.0
flask-cors>=4.0.0
requests>=2.31.0
python-dotenv>=1.0.0

# For Gemini (default)
google-generativeai>=0.3.0
langchain-google-genai>=0.0.5

# For Groq (optional)
groq>=0.4.0
langchain-groq>=0.0.1

# For Hugging Face (optional)
huggingface-hub>=0.20.0
langchain-huggingface>=0.0.1
```

---

## 🎉 YOU'RE ALL SET!

### Default Setup (Gemini - Already Configured!)
```bash
export GOOGLE_API_KEY="AIzaSy..."
python mock_api_server.py
python demo_script.py
```

### Alternative: Groq (Super Fast)
```bash
# Update code as shown above
export GROQ_API_KEY="gsk_..."
python mock_api_server.py
python demo_script.py
```

**Your retail agent system now works with FREE LLMs! 🎉**

---

## 💡 PRO TIPS

1. **For Hackathons**: Use Gemini (best quality, generous limits)
2. **For Live Demos**: Use Groq (super fast, impressive)
3. **For Learning**: Use HuggingFace (many models to try)
4. **For Production**: Start with Gemini free tier, scale later

---

## 📚 Additional Resources

- **Gemini Docs**: https://ai.google.dev/docs
- **Groq Docs**: https://console.groq.com/docs
- **HuggingFace Docs**: https://huggingface.co/docs/api-inference

---

## ✅ VERIFICATION

After setup, verify everything works:

```bash
python verify_system.py
```

Should show:
```
✅ Python 3.9+
✅ All files present
✅ Packages installed
✅ API key found
✅ API server running
```

---

**No more "I don't have OpenAI API key" excuses! Get building! 🚀**
