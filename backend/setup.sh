#!/bin/bash

# Setup script for Multi-Agent Retail System
# Run this to set up the environment

set -e

echo "=================================="
echo "🛍️  RETAIL AGENT SYSTEM - SETUP"
echo "=================================="
echo ""

# Check Python version
echo "📋 Checking Python version..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "   ✅ Found Python $python_version"
echo ""

# Create virtual environment
echo "🔧 Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "   ✅ Virtual environment created"
else
    echo "   ℹ️  Virtual environment already exists"
fi
echo ""

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate
echo "   ✅ Activated"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt
echo "   ✅ Dependencies installed"
echo ""

# Check for OpenAI API key
echo "🔑 Checking for OpenAI API key..."
if [ -z "$OPENAI_API_KEY" ]; then
    echo "   ⚠️  OpenAI API key not found in environment"
    echo ""
    echo "Please set your OpenAI API key:"
    echo "   export OPENAI_API_KEY='your-key-here'"
    echo ""
    echo "Or create a .env file with:"
    echo "   OPENAI_API_KEY=your-key-here"
    echo ""
else
    echo "   ✅ API key found"
fi
echo ""

echo "=================================="
echo "✅ SETUP COMPLETE!"
echo "=================================="
echo ""
echo "📌 Next steps:"
echo ""
echo "1. Set your OpenAI API key (if not done):"
echo "   export OPENAI_API_KEY='your-key-here'"
echo ""
echo "2. Start the mock API server (Terminal 1):"
echo "   source venv/bin/activate"
echo "   python mock_api_server.py"
echo ""
echo "3. Run the agent system (Terminal 2):"
echo "   source venv/bin/activate"
echo "   python interactive_chat.py"
echo ""
echo "=================================="
