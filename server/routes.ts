import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple test route to bypass security
  app.get("/test", (req, res) => {
    res.sendFile(require('path').join(__dirname, 'test.html'));
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Chat API endpoint for Career Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array required" });
      }

      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "AI service not configured" });
      }

      console.log("Sending request to Anthropic with", messages.length, "messages");
      
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1000,
          messages: messages.filter((msg: any) => msg.role !== "assistant" || msg.content !== "👋 Hi! I'm Alexis's AI assistant. I can help you learn about her product leadership experience, personality traits, work style, and professional accomplishments. What would you like to know?").map((msg: any) => ({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.content,
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
        const errorText = await response.text();
        console.error("Anthropic API error:", response.status, errorText);
        throw new Error(`Anthropic API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const assistantMessage = data.content[0].text;

      res.json({ message: assistantMessage });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ 
        error: "Failed to process chat request",
        message: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to reach out to Alexis directly through her contact information on the site."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
