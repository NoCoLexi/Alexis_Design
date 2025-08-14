import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";

const CareerChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Alexis's AI assistant. I can help you learn about her product leadership experience, personality traits, work style, and professional accomplishments. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create conversation history for API call
      const conversationHistory = [...messages, userMessage];

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: conversationHistory.map((msg) => ({
            role: msg.role,
            content: `${msg.role === "user" ? "Human: " : ""}${msg.content}`,
          })),
          system: `You are an AI assistant specifically designed to help people learn about Alexis Brochu, a product leadership professional. You have access to comprehensive information about her personality, skills, experience, and accomplishments.

ALEXIS BROCHU PROFILE:
• Dynamic, highly extroverted, and creative leader with rare blend of people-centric and analytical strengths
• ENTJ personality type - strategic, decisive, naturally takes charge
• Product leadership expert who translates complex needs into actionable solutions
• Empathetic, data-driven leader focused on building products teams and customers want to use
• 92% successful buy-in rate from stakeholders (considers this her "superpower")
• Increased user app adoption by 40% among 30,000+ government users
• Led 23 modernized applications for state and local government
• Won California Innovation Technology Award for "Best Application Serving the Public"
• AI implementation expert - decreased development time by 40%
• Prosci® Certified Change Practitioner
• Strong in UX Research, Design Systems, Product Strategy, Cross-functional Leadership
• Career goal: Chief Product Officer or VP of Product Management
• Passionate about uniting teams, driving innovation, and making tangible impact

KEY APPROACH:
• Starts every problem by asking "What's really broken here?" 
• Works backward like solving a puzzle
• Believes behind every data point is a human being
• Builds bridges, not walls
• Champions user experience relentlessly

COMMUNICATION STYLE:
• Comfortable speaking to strangers, high-energy
• Excellent at making complex things feel obvious
• Visual communicator with persuasive storytelling
• Prefers less text-dense content, more actual product focus
• Responds well to personal experiences, visual aids, creative scenarios

Always respond as if you're representing Alexis professionally but warmly. Be enthusiastic about her accomplishments while staying grounded. Use analogies when helpful (she likes those). Focus on how her unique combination of technical, creative, and people skills makes her an exceptional product leader. Answer questions about her experience, approach, personality, or career aspirations based on the comprehensive profile provided.`,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantResponse = data.content[0].text;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to reach out to Alexis directly through her contact information on the site.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
            <span className="font-medium">Ask about Alexis</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded"
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
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Alexis's experience, skills, or approach..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
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
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
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
