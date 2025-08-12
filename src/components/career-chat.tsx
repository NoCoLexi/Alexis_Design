import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const CareerChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hi! I'm here to answer questions about Alexis Brochu's career, skills, and experience. Feel free to ask about her background, achievements, or work style!",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputValue,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/career-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        content: data.response,
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: "Sorry, I encountered an error. Please try again later.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="career-chat-widget">
      {/* Chat Toggle Button */}
      <div
        className={`chat-toggle ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Ask about Alexis</span>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? "visible" : "hidden"}`}>
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="chat-avatar">AB</div>
            <div className="chat-title">
              <h4>Ask about Alexis</h4>
              <p>Product Designer & UX Strategist</p>
            </div>
          </div>
          <button className="chat-close" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isUser ? "user-message" : "bot-message"}`}
            >
              <div className="message-content">{message.content}</div>
            </div>
          ))}

          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="chat-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about skills, experience, achievements..."
              maxLength={500}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .career-chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        }

        .chat-toggle {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 20px;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          border: none;
          font-size: 14px;
          font-weight: 500;
        }

        .chat-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .chat-toggle.hidden {
          display: none;
        }

        .chat-window {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .chat-window.hidden {
          display: none;
        }

        .chat-window.visible {
          display: flex;
          animation: slideUp 0.3s ease;
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }

        .chat-title h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .chat-title p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .chat-close {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .chat-close:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .chat-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          background: #f8fafc;
        }

        .message {
          margin-bottom: 16px;
          animation: fadeIn 0.3s ease;
        }

        .message-content {
          padding: 12px 16px;
          border-radius: 18px;
          max-width: 85%;
          font-size: 14px;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .bot-message .message-content {
          background: white;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          color: #1e293b;
        }

        .user-message .message-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-left: auto;
          text-align: right;
        }

        .typing-indicator {
          padding: 8px 16px;
          background: #f1f5f9;
          border-radius: 18px;
          width: fit-content;
          margin-bottom: 16px;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #94a3b8;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .chat-input-area {
          padding: 16px;
          background: white;
          border-top: 1px solid #e2e8f0;
        }

        .chat-input-container {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .chat-input-container input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 25px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .chat-input-container input:focus {
          border-color: #667eea;
        }

        .chat-input-container input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 25px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          color: #4f46e5;
          background: white;
        }

        .chat-input-container input::placeholder {
          color: #94a3b8;
        }

        .chat-input-container button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .chat-input-container button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typing {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 40px);
            height: 70vh;
          }

          .chat-toggle {
            padding: 10px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default CareerChat;
