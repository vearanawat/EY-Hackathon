import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI sales assistant. How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! I'm here to help you find the perfect products. What are you looking for today?";
    }
    
    if (lowerInput.includes("product") || lowerInput.includes("item") || lowerInput.includes("buy")) {
      return "Great! I can help you find products. Are you shopping for a specific occasion? For example, we have items perfect for dates, weddings, or business meetings.";
    }
    
    if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("how much")) {
      return "Our products start at $99. I can show you specific items based on your preferences. What style are you interested in?";
    }
    
    if (lowerInput.includes("cart") || lowerInput.includes("checkout") || lowerInput.includes("buy now")) {
      return "I can help you add items to your cart! Would you like me to show you some recommendations, or do you have a specific product in mind?";
    }
    
    if (lowerInput.includes("size") || lowerInput.includes("fitting") || lowerInput.includes("measure")) {
      return "We offer sizes S, M, L, XL, and XXL. I can help you find the right size. You can also try on items virtually using our Try On feature!";
    }
    
    if (lowerInput.includes("try on") || lowerInput.includes("virtual")) {
      return "Great! Our virtual try-on feature lets you see how items look on you using your camera. Click the 'Try On' button on any product page to get started!";
    }
    
    if (lowerInput.includes("stock") || lowerInput.includes("available") || lowerInput.includes("in stock")) {
      return "Let me check inventory for you. Most of our popular items are in stock. Would you like me to check availability for a specific product?";
    }
    
    if (lowerInput.includes("promotion") || lowerInput.includes("discount") || lowerInput.includes("offer") || lowerInput.includes("sale")) {
      return "We have great promotions available! As a loyalty member, you can earn points on every purchase. Would you like me to check your loyalty status and available offers?";
    }
    
    if (lowerInput.includes("return") || lowerInput.includes("exchange") || lowerInput.includes("refund")) {
      return "I can help you with returns and exchanges. Our return policy allows returns within 30 days of purchase. Do you have an order number I can help you with?";
    }
    
    if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    return "That's interesting! I'm here to help you find products, check availability, process orders, and more. What would you like to do? You can ask me about products, sizes, prices, or try-on features.";
  };

  const quickReplies = [
    "Show me products",
    "Check availability",
    "View my cart",
    "Try on feature",
  ];

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    // Trigger send after a brief delay
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: reply,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);
      
      setTimeout(() => {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: generateResponse(reply),
          sender: "agent",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, agentMessage]);
        setIsTyping(false);
      }, 1000);
    }, 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-[#C6302D] to-[#EAB851] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96 lg:w-[420px] h-[600px] lg:h-[650px] bg-white rounded-[22px] shadow-2xl border-2 border-brand-gold/30 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#C6302D] to-[#EAB851] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-white text-lg">AI Sales Assistant</h3>
                <p className="font-sans text-white/90 text-xs">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "agent" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C6302D] to-[#EAB851] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#C6302D] to-[#EAB851] text-white"
                      : "bg-white text-foreground border border-brand-gold/20"
                  }`}
                >
                  <p className="font-sans text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <p className="font-sans text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C6302D] to-[#EAB851] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-brand-gold/20 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pt-2 pb-2 bg-gray-50 border-t border-brand-gold/20">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 text-xs font-sans font-medium bg-white border border-brand-gold/30 text-foreground rounded-full hover:bg-brand-gold/10 hover:border-brand-orange transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-brand-gold/20">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-brand-gold/30 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-sans text-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#C6302D] to-[#EAB851] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="font-sans text-xs text-foreground/50 mt-2 text-center">
              Powered by AI • Your data is secure
            </p>
          </form>
        </div>
      )}
    </>
  );
}

