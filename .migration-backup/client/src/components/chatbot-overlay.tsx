import React, { useState, useEffect } from "react";
import { MessageCircle, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatbotOverlayProps {
  typebotUrl?: string;
}

export default function ChatbotOverlay({
  typebotUrl = "https://typebot.co/lead-generation-ni1axi9",
}: ChatbotOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasError, setHasError] = useState(false);

  const toggleChatbot = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChatbot = () => {
    setIsMinimized(true);
  };

  const closeChatbot = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  // Handle iframe load error
  const handleIframeError = () => {
    setHasError(true);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {(!isOpen || isMinimized) && (
          <Button
            onClick={toggleChatbot}
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform" />
          </Button>
        )}
      </div>

      {/* Chatbot Overlay */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm">Chat Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={minimizeChatbot}
                className="h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeChatbot}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="h-full">
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <MessageCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Let's Connect!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                I'd love to discuss your next project or answer any questions
                about my work in product management and design.
              </p>
              <div className="space-y-3 w-full">
                <Button
                  className="w-full"
                  onClick={() => {
                    closeChatbot();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get In Touch
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    closeChatbot();
                    document
                      .getElementById("work")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View My Work
                </Button>
                <div className="text-xs text-muted-foreground pt-2">
                  Ready to transform your next project?
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
