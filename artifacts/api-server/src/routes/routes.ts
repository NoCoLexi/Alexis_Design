import { Router } from "express";
import { storage } from "../storage";
import { insertContactSchema } from "@workspace/db";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { PgRateLimitStore } from "../lib/pg-rate-limit-store";

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(MAX_CONTENT_LENGTH),
});

const chatRequestSchema = z.object({
  messages: z
    .array(chatMessageSchema)
    .min(1)
    .max(MAX_MESSAGES),
});

const chatMinuteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  store: new PgRateLimitStore("chat-minute"),
  message: { error: "Too many requests, please slow down." },
});

const chatDailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  store: new PgRateLimitStore("chat-daily"),
  message: { error: "Daily chat limit reached. Please try again tomorrow." },
});

const MAX_CONTACT_FIELD_LENGTH = 500;
const MAX_CONTACT_MESSAGE_LENGTH = 2000;

const contactBodySchema = z.object({
  firstName: z.string().min(1).max(MAX_CONTACT_FIELD_LENGTH),
  lastName: z.string().min(1).max(MAX_CONTACT_FIELD_LENGTH),
  email: z.string().email().max(MAX_CONTACT_FIELD_LENGTH),
  phone: z.string().max(MAX_CONTACT_FIELD_LENGTH).optional(),
  message: z.string().min(1).max(MAX_CONTACT_MESSAGE_LENGTH),
});

const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  store: new PgRateLimitStore("contact"),
  message: { error: "Too many contact submissions, please try again later." },
});

const appRouter = Router();

// Contact form submission
appRouter.post("/contact", contactRateLimiter, async (req, res) => {
  try {
    const parsed = contactBodySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
      return;
    }
    const contactData = insertContactSchema.parse(parsed.data);
    await storage.createContact(contactData);
    res.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
    } else if (error instanceof Error && error.message === "Contact storage limit reached") {
      res.status(503).json({ error: "Service temporarily unavailable. Please try again later." });
    } else {
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  }
});

// Chat API endpoint for Career Chatbot
appRouter.post("/chat", chatMinuteLimiter, chatDailyLimiter, async (req, res): Promise<void> => {
  try {
    const parsed = chatRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.errors });
      return;
    }
    const { messages } = parsed.data;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "AI service not configured" });
      return;
    }

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
        messages: messages.filter((msg) => msg.role !== "assistant" || msg.content !== "👋 Hi! I'm Alexis's AI assistant. I can help you learn about her product leadership experience, personality traits, work style, and professional accomplishments. What would you like to know?").map((msg) => ({
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
      throw new Error(`Anthropic API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    const assistantMessage = data.content[0].text;

    res.json({ message: assistantMessage });
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to process chat request",
      message: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to reach out to Alexis directly through her contact information on the site."
    });
  }
});

export default appRouter;
