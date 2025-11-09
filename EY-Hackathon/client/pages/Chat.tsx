import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI sales assistant. I can help you find products, check availability, process orders, and answer any questions. How can I assist you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);
    setIsNewChat(false);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(currentInput),
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! I'm here to help you find the perfect products. What are you looking for today? Are you shopping for a specific occasion like a date, wedding, or business meeting?";
    }
    
    if (lowerInput.includes("product") || lowerInput.includes("item") || lowerInput.includes("buy") || lowerInput.includes("show me")) {
      return "Great! I can help you find products. We have a wide selection of clothing perfect for different occasions:\n\n• **Date/Travel**: Casual and comfortable options\n• **Wedding**: Formal and elegant pieces\n• **Meeting**: Professional business attire\n\nWhat style or occasion are you interested in? I can show you specific recommendations based on your preferences.";
    }
    
    if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("how much")) {
      return "Our products are priced competitively, starting at $99. I can show you specific items and their prices based on your preferences. Would you like me to:\n\n• Show products in a specific price range?\n• Find the best deals and promotions?\n• Check for items on sale?\n\nWhat's your budget range?";
    }
    
    if (lowerInput.includes("cart") || lowerInput.includes("checkout") || lowerInput.includes("buy now") || lowerInput.includes("add to cart")) {
      return "I can help you add items to your cart! Here's what I can do:\n\n• Show you product recommendations\n• Add specific items to your cart\n• Check cart contents\n• Process checkout\n\nWould you like me to show you some recommendations, or do you have a specific product in mind?";
    }
    
    if (lowerInput.includes("size") || lowerInput.includes("fitting") || lowerInput.includes("measure") || lowerInput.includes("sizing")) {
      return "We offer sizes S, M, L, XL, and XXL. Here's how I can help:\n\n• Find the right size for you\n• Check size availability for specific products\n• Use our virtual try-on feature to see how items fit\n\nYou can also try on items virtually using our Try On feature! Just click the 'Try On' button on any product page. What size are you typically?";
    }
    
    if (lowerInput.includes("try on") || lowerInput.includes("virtual") || lowerInput.includes("ar")) {
      return "Our virtual try-on feature is amazing! Here's how it works:\n\n✨ **Features:**\n• Use your camera to see how items look on you\n• Try different product views\n• Mirror mode for natural viewing\n• Save and share your try-on sessions\n\n📱 **How to use:**\n1. Go to any product page\n2. Click the 'Try On' button\n3. Allow camera access\n4. See yourself wearing the product!\n\nWould you like me to show you products you can try on?";
    }
    
    if (lowerInput.includes("stock") || lowerInput.includes("available") || lowerInput.includes("in stock") || lowerInput.includes("availability")) {
      return "Let me check inventory for you. Most of our popular items are in stock. I can:\n\n• Check availability for specific products\n• Find items available in your size\n• Show store locations with stock\n• Set up notifications for out-of-stock items\n\nWould you like me to check availability for a specific product? Just let me know the product name or ID.";
    }
    
    if (lowerInput.includes("promotion") || lowerInput.includes("discount") || lowerInput.includes("offer") || lowerInput.includes("sale") || lowerInput.includes("deal")) {
      return "We have great promotions available! 🎉\n\n**Current Offers:**\n• Earn loyalty points on every purchase\n• Special discounts for first-time customers\n• Seasonal sales and promotions\n• Bundle deals on selected items\n\nAs a loyalty member, you can earn points on every purchase. Would you like me to:\n• Check your loyalty status?\n• Show available offers?\n• Find products with current discounts?";
    }
    
    if (lowerInput.includes("return") || lowerInput.includes("exchange") || lowerInput.includes("refund") || lowerInput.includes("warranty")) {
      return "I can help you with returns and exchanges! 📦\n\n**Our Return Policy:**\n• Returns allowed within 30 days of purchase\n• Items must be in original condition\n• Free return shipping for online orders\n• Easy exchange process\n\n**I can help you with:**\n• Processing returns\n• Exchanging items\n• Tracking return status\n• Refund inquiries\n\nDo you have an order number I can help you with?";
    }
    
    if (lowerInput.includes("order") || lowerInput.includes("track") || lowerInput.includes("shipping") || lowerInput.includes("delivery")) {
      return "I can help you track your orders! 📍\n\n**I can assist with:**\n• Order status updates\n• Shipping information\n• Delivery tracking\n• Estimated delivery dates\n• Delivery address changes\n\nDo you have an order number? I can look up the details for you.";
    }
    
    if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
      return "You're welcome! 😊 I'm here to help you with:\n\n• Finding products\n• Checking availability\n• Processing orders\n• Returns and exchanges\n• Answering questions\n\nIs there anything else I can help you with today?";
    }
    
    if (lowerInput.includes("help") || lowerInput.includes("what can you do")) {
      return "I'm your AI sales assistant, and I'm here to help! Here's what I can do:\n\n🛍️ **Shopping:**\n• Find products by category, style, or occasion\n• Show product details and prices\n• Check size availability\n• Add items to cart\n\n📦 **Orders:**\n• Process checkout\n• Track orders and shipments\n• Handle returns and exchanges\n\n💡 **Features:**\n• Virtual try-on assistance\n• Inventory checks\n• Promotions and discounts\n• Loyalty program info\n\nWhat would you like help with?";
    }
    
    return "I understand! I'm here to help you with shopping, product recommendations, order tracking, returns, and more. Could you tell me more about what you're looking for? For example:\n\n• \"Show me products for a wedding\"\n• \"Check if this item is in stock\"\n• \"Help me with my order\"\n• \"What promotions are available?\"\n\nHow can I assist you?";
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your AI sales assistant. I can help you find products, check availability, process orders, and answer any questions. How can I assist you today?",
        sender: "agent",
        timestamp: new Date(),
      },
    ]);
    setIsNewChat(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Chat Header */}
        <div className="border-b border-brand-gold/20 bg-white px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-gold/30 hover:bg-brand-gold/10 transition-colors font-sans text-sm font-medium text-foreground"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
              <h1 className="font-unbounded font-bold text-xl sm:text-2xl text-foreground">
                AI Sales Assistant
              </h1>
            </div>
            <Link
              to="/"
              className="px-4 py-2 rounded-xl border border-brand-gold/30 hover:bg-brand-gold/10 transition-colors font-sans text-sm font-medium text-foreground"
            >
              Back to Shop
            </Link>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 scrollbar-hide">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "agent" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C6302D] to-[#EAB851] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#C6302D] to-[#EAB851] text-white"
                      : "bg-white text-foreground border border-brand-gold/20 shadow-sm"
                  }`}
                >
                  <div className="font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </div>
                  <div
                    className={`font-sans text-xs mt-2 ${
                      message.sender === "user" ? "text-white/70" : "text-foreground/50"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C6302D] to-[#EAB851] flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-brand-gold/20 rounded-2xl px-5 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-brand-gold/20 bg-white px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative">
              <div className="flex items-end gap-3 bg-white border-2 border-brand-gold/30 rounded-2xl p-3 focus-within:border-brand-orange transition-colors">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AI Sales Assistant..."
                  rows={1}
                  className="flex-1 resize-none border-none focus:outline-none font-sans text-sm sm:text-base bg-transparent text-foreground placeholder:text-foreground/50 max-h-32 overflow-y-auto scrollbar-hide"
                  style={{
                    height: "auto",
                    minHeight: "24px",
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#C6302D] to-[#EAB851] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="font-sans text-xs text-foreground/50 mt-2 text-center">
                AI can make mistakes. Check important info. Press Enter to send, Shift+Enter for new line.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
