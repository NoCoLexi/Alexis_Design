import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";

const CareerChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm the Upstart-Labs AI assistant. I can help you learn about our product leadership experience, approach, and capabilities. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Knowledge base with information about Upstart-Labs
    if (input.includes("experience") || input.includes("background") || input.includes("work")) {
      return "Upstart-Labs has extensive product leadership experience, including leading 23 modernized applications for state and local government. We increased user app adoption by 40% among 30,000+ government users and won the California Innovation Technology Award for 'Best Application Serving the Public.' We also decrease development time by 40% through AI implementation.";
    }

    if (input.includes("skill") || input.includes("expertise") || input.includes("strength")) {
      return "Upstart-Labs specializes in Product Strategy, UX Research, Design Systems, and Cross-functional Leadership. We are particularly known for a 92% stakeholder buy-in rate and are Prosci® Certified Change Practitioners. Our approach blends human-centered design with engineering rigor.";
    }

    if (input.includes("approach") || input.includes("method") || input.includes("how")) {
      return "We start every problem by asking 'What's really broken here?' and work backward like solving a puzzle. We are empathetic, data-driven leaders who champion user experience relentlessly. We are excellent at making complex things feel obvious and use visual communication with persuasive storytelling.";
    }

    if (input.includes("award") || input.includes("achievement") || input.includes("accomplishment")) {
      return "Upstart-Labs won the California Innovation Technology Award for 'Best Application Serving the Public.' We achieved a 92% successful buy-in rate from stakeholders, increased user adoption by 40% among 30,000+ users, and led 23 modernized applications. We also decrease development time by 40% through AI implementation.";
    }

    if (input.includes("contact") || input.includes("reach") || input.includes("hire") || input.includes("opportunity")) {
      return "You can reach us through the contact form on this website. We are passionate about uniting teams, driving innovation, and making tangible impact. We are always happy to discuss product leadership opportunities and share our experience!";
    }

    if (input.includes("government") || input.includes("public") || input.includes("civic")) {
      return "We have extensive experience in government technology, having led 23 modernized applications for state and local government. We increased user app adoption by 40% among 30,000+ government users and won the California Innovation Technology Award for 'Best Application Serving the Public.'";
    }

    if (input.includes("ai") || input.includes("artificial intelligence") || input.includes("technology")) {
      return "We are AI implementation experts who decrease development time by 40%. We combine technical expertise with human-centered design principles to create products that teams and customers want to use. We are passionate about leveraging technology for tangible impact.";
    }

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! I'm here to help you learn about Upstart-Labs and our product leadership capabilities. Feel free to ask about our background, skills, achievements, or approach to product management. What would you like to know?";
    }

    // Default response
    return "I can tell you about Upstart-Labs' experience, skills, achievements, approach, or contact information. What specific aspect would you like to learn more about?";
  };

  const sendMessage = async () => {
    if (!inputRef.current) return;
    
    const currentInput = inputRef.current.value.trim();
    if (!currentInput || isLoading) return;

    const userMessage = { role: "user", content: currentInput };
    setMessages((prev) => [...prev, userMessage]);
    inputRef.current.value = "";
    setInput("");
    setIsLoading(true);

    // Simulate a brief delay for more natural interaction
    setTimeout(() => {
      const assistantResponse = getResponse(currentInput);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const ChatWindow = () => (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isMinimized ? "w-80 h-12" : "w-96 h-[500px]"
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-2xl h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle size={20} />
            <span className="font-medium">Ask about Upstart-Labs</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors p-1 rounded"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors p-1 rounded"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about our experience, skills, or approach..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && <ChatWindow />}
    </>
  );
};

export default CareerChatbot;
