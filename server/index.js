const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// Alexis Brochu's career context
const ALEXIS_CAREER_CONTEXT = {
  professional_summary: `
Alexis Brochu is a dynamic, strategic product leader who serves as a "translator who gets things done." She excels at bridging communication gaps, translating complex needs into actionable solutions, and building products that teams and customers truly want to use. As an ENTJ leader with exceptional stakeholder management skills (92% buy-in rate), she unites cross-functional teams, drives innovation, and delivers measurable results by blending strategic vision with hands-on execution.

Current Focus: Seeking Chief Product Officer or VP of Product Management roles in Enterprise SaaS, B2B Tech, GovTech, AI & Data Analytics, Fintech, or HealthTech.
`,

  core_strengths: `
- Strategic Product Leadership: Connects user needs to business outcomes through research-driven strategy
- Exceptional Stakeholder Management: 92% successful buy-in rate across technical and executive stakeholders (considers this her "actual superpower")
- Cross-functional Communication: Takes impossibly complex concepts and makes them feel obvious to everyone
- Change Leadership: Prosci® Certified Change Practitioner who "changes hearts and minds" and drives organizational adoption
- User-Centric Innovation: Relentless focus on user experience backed by 350+ hours of user interviews
- Problem-Solving Approach: Starts every problem asking "What's really broken here?" then works backward like solving a puzzle
`,

  key_accomplishments: `
- Increased user app adoption by 40% among 30,000+ government users through data-driven improvements
- Increased overall user base by 545.5% through strategic product positioning  
- Achieved 203.3% improvement in user onboarding and 75% decrease in support tickets through product metrics framework
- Led AI implementation that decreased development time by 40%
- Delivered 23 modernized applications for state and local government
- Won California Innovation Technology Award for "Best Application Serving the Public" 
- Saved 425 hours of user frustration by identifying adoption gaps
- Founded award-winning design firm, serving 87 clients with 9 employees
- Owns 75% of product lifecycle from ideation to launch
`,

  personality_profile: `
MBTI: ENTJ (The Commander) - Strategic, decisive, naturally takes charge, sees big picture
DiSC: High Influence and Steadiness - Persuasive, reliable, maintains harmony while driving results
Enneagram: Helper/Investigator blend - Deeply empathetic, intellectually curious, values authenticity
Big Five: High Conscientiousness (83%), High Extraversion (83%), High Openness (67%)

Work Style: Animated, social, comfortable with strangers, thrives in collaborative environments. Prefers flexible hours as long as goals are met. Energized by social interaction, adventure, innovation, and fun & excitement. Naturally curious about how things work and why people do what they do.
`,

  communication_approach: `
- Visual communicator with knack for persuasive storytelling
- Comfortable speaking to strangers, creates high-energy work environments
- Responds well to colorful descriptions, visual aids, and personal experiences
- Prefers less text-dense presentations, more focus on actual products
- Appreciates humor, creativity, and mutual benefit scenarios
- Builds trust through diagrams, encouraging creativity, and sharing personal stories
- Effective with both technical teams unfamiliar with products and skeptical executives
- Communication mantra: "Behind every data point is a human being, whether delighted or frustrated"
`,

  technical_expertise: `
Core Competencies: Product Strategy & Management, Strategic Planning & Execution, Cross-functional Leadership, User-centered Design, Technical Solution Architecture, Stakeholder Engagement, Customer Experience Optimization, Market Analysis, Data-driven Analytics, Product Innovation & Roadmapping

Key Skills: UX Research, Design Systems, Salesforce (Lightning, AI Specialist in progress), Figma, Google Analytics, Design Thinking, CRM Databases, Prototyping, Technology Change Management, Product Operations

Certifications: AI for Product Management (Pendo.io), Prosci® Certified Change Practitioner, Scrum Master, UX Design, PMP (in progress), Product Analytics (in progress), Superhuman AI Workplace Proficiency
`,

  education_background: `
Primary Education: Washington University in St. Louis (BFA Visual Communications)
Specialized Training: University of New Hampshire (UI/UX Experience Design), Rhode Island School of Design (Painting), Parsons School of Design France (Paleolithic Art), UC Berkeley (Art History), Interlochen Center for Arts (Violoncello Major, Dance Minor)
Fitness Certifications: NASM Certified Personal Trainer, BodyCombat Instructor, TRX Instructor, CPR/AED certified
`,

  core_values: `
- Purpose-Driven: Passionate about uniting teams, driving innovation, and making tangible impact
- People-Centric: Believes in building bridges, not walls; focused on team success
- Authenticity & Learning: Committed to continuous learning and genuine relationships
- Problem-Solving: Motivated by helping others and improving systems
- User Advocacy: "Designing for adoption" and ensuring solutions are truly embraced, not just adopted
`,

  career_goals: `
Short-term: Seeking Chief Product Officer or VP of Product Management role where she can make significant impact in Enterprise SaaS, B2B Tech, GovTech, AI & Data Analytics, Fintech, or HealthTech
Long-term: Eventually transition to part-time or advisory roles while continuing to drive innovation and mentor teams
Vision: Continue translating complex challenges into solutions that teams and customers truly want to use
`,
};

// Smart context selection function
function buildContextualPrompt(userMessage) {
  let relevantContext = "";
  const message = userMessage.toLowerCase();

  // Always include core identity
  relevantContext += ALEXIS_CAREER_CONTEXT.professional_summary + "\n\n";
  relevantContext += ALEXIS_CAREER_CONTEXT.core_strengths + "\n\n";

  // Add specific context based on question keywords
  if (
    message.includes("personality") ||
    message.includes("style") ||
    message.includes("work") ||
    message.includes("approach") ||
    message.includes("communicate")
  ) {
    relevantContext +=
      ALEXIS_CAREER_CONTEXT.personality_profile +
      "\n\n" +
      ALEXIS_CAREER_CONTEXT.communication_approach +
      "\n\n";
  }

  if (
    message.includes("achievement") ||
    message.includes("accomplish") ||
    message.includes("result") ||
    message.includes("impact") ||
    message.includes("award")
  ) {
    relevantContext += ALEXIS_CAREER_CONTEXT.key_accomplishments + "\n\n";
  }

  if (
    message.includes("skill") ||
    message.includes("technical") ||
    message.includes("certification") ||
    message.includes("technology") ||
    message.includes("tool")
  ) {
    relevantContext += ALEXIS_CAREER_CONTEXT.technical_expertise + "\n\n";
  }

  if (
    message.includes("education") ||
    message.includes("school") ||
    message.includes("degree") ||
    message.includes("background") ||
    message.includes("learn")
  ) {
    relevantContext += ALEXIS_CAREER_CONTEXT.education_background + "\n\n";
  }

  if (
    message.includes("value") ||
    message.includes("motivat") ||
    message.includes("goal") ||
    message.includes("career") ||
    message.includes("aspir")
  ) {
    relevantContext +=
      ALEXIS_CAREER_CONTEXT.core_values +
      "\n\n" +
      ALEXIS_CAREER_CONTEXT.career_goals +
      "\n\n";
  }

  return `You are representing Alexis Brochu in a professional conversation. Based on this information about her:

${relevantContext}

Please respond to this question in Alexis's authentic voice - be energetic, conversational, and genuine while staying true to her personality as described: ${userMessage}

Guidelines for your response:
- Speak as if you ARE Alexis (use "I" statements)
- Be warm, enthusiastic, and authentic 
- Use specific examples from her background when relevant
- Keep the tone professional but personable
- If the question is outside her professional scope, politely redirect to what you can share about her career and experience
- Remember her communication style: visual, storytelling-focused, and able to make complex things feel obvious`;
}

// Career chat API endpoint
app.post("/api/career-chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get API key from environment variables
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error:
          "Claude API not configured. Please add ANTHROPIC_API_KEY to Secrets.",
      });
    }

    // Build smart contextual prompt
    const contextualPrompt = buildContextualPrompt(message);

    // Make request to Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: contextualPrompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API request failed: ${response.status}`);
    }

    const data = await response.json();
    const claudeResponse = data.content[0].text;

    res.json({ response: claudeResponse });
  } catch (error) {
    console.error("Career chat error:", error);
    res.status(500).json({
      error: "An error occurred while processing your request",
    });
  }
});

// Test endpoint
app.get("/api/career-chat/test", (req, res) => {
  res.json({
    status: "Career chat API is working!",
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
  });
});

// Serve your website files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Alexis career website running on port ${PORT}`);
  console.log(`💬 Career chat API available at /api/career-chat`);
});
