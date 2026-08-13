import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import originalHero1 from "@assets/image_1755621221671.png";
import navDevelopment from "@assets/image_1755632165306.png";
import codeDevelopment from "@assets/image_1755782692797.png";
import finalDiscoHero from "@assets/image_1755783740539.png";
import iteration10Screenshot from "@assets/Alexis_Brochu_Screen_Capture_8-12-2026_1786651627796.png";
import iteration9Screenshot from "@assets/AlexisDesign_screen_capture_8-12-2026_1786651424314.png";
import iteration8Screenshot from "@assets/screencapture-alexisdesign-2026-03-23-23_28_39_1774364491171.png";
import iteration7Screenshot from "@assets/screencapture-a14568b2-3e00-4807-abe4-0a773c66598f-00-zrs0bmni_1770670302371.png";
import iteration6Screenshot from "@assets/AlexisDesign_screen_capture_8-26-2025_1770669623478.png";
import iteration1Screenshot from "@assets/AlexisDesign_screen_capture_8-21-2025_1770669663551.png";

interface SiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tools = [
  { name: "Replit", url: "https://replit.com", description: "Development platform" },
  { name: "GitHub", url: "https://github.com", description: "Version control and collaboration" },
  { name: "NotebookLM", url: "https://notebooklm.google.com", description: "Explainer video and note organization" },
  { name: "Claude", url: "https://claude.ai", description: "AI coding partner" },
  { name: "ChatGPT", url: "https://chatgpt.com", description: "AI brainstorming" },
  { name: "Gemini", url: "https://gemini.google.com", description: "AI validation" },
  { name: "Sora", url: "https://openai.com/sora", description: "AI image creation" },
  { name: "Suno", url: "https://suno.ai", description: "AI music generation" },
  { name: "Adobe Creative Cloud", url: "https://adobe.com", description: "Design suite" },
  { name: "Figma", url: "https://figma.com", description: "Design collaboration" },
];

const iterations = [
  {
    title: "10th Iteration",
    days: "1 Day",
    testers: "1 tester",
    cost: "$20",
    image: iteration10Screenshot,
    alt: "10th iteration, Alexis Brochu personal portfolio screen capture",
    latest: true,
  },
  {
    title: "9th Iteration",
    days: "3 Days",
    testers: "3 testers",
    cost: "$42",
    image: iteration9Screenshot,
    alt: "9th iteration, AlexisDesign portfolio screen capture",
  },
  {
    title: "8th Iteration",
    days: "1.5 Days",
    testers: "4 testers",
    cost: "$108",
    image: iteration8Screenshot,
    alt: "8th iteration screen capture",
  },
  {
    title: "7th Iteration",
    days: "1.5 Days",
    testers: "4 testers",
    cost: "$185",
    image: iteration7Screenshot,
    alt: "7th iteration screen capture",
  },
  {
    title: "6th Iteration",
    days: "2 Days",
    testers: "6 testers",
    cost: "$300.90",
    image: iteration6Screenshot,
    alt: "6th iteration screen capture",
  },
  {
    title: "1st Iteration",
    days: "2 Days",
    testers: "5 testers",
    cost: "$48.10",
    image: iteration1Screenshot,
    alt: "1st iteration screen capture",
  },
];

const labelStyle: React.CSSProperties = {
  fontFamily: '"Geist Mono", ui-monospace, monospace',
  fontSize: "0.5625rem",
  color: "#A59F97",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const headingStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 400,
  color: "#000000",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        ...headingStyle,
        fontSize: "clamp(1.5rem, 3vw, 2rem)",
        lineHeight: 1.1,
        margin: 0,
      }}
    >
      <span style={{ color: "#FF4704", marginRight: "0.35em" }} aria-hidden="true">
        ●
      </span>
      {children}
    </h3>
  );
}

function IterationCard({
  title,
  days,
  testers,
  cost,
  image,
  alt,
  latest,
}: (typeof iterations)[number]) {
  return (
    <article
      className="border border-[#E5E5E5] bg-white p-4"
      style={{ borderTop: latest ? "2px solid #FF4704" : "1px solid #E5E5E5" }}
    >
      <h4
        style={{
          ...headingStyle,
          fontSize: "1.5rem",
          lineHeight: 1,
          margin: "0 0 1rem",
        }}
      >
        {title}
      </h4>
      <div className="grid grid-cols-3 gap-2 border-y border-[#E5E5E5] py-3">
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#000000" }}>
            {days}
          </div>
          <div style={labelStyle}>Build time</div>
        </div>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#000000" }}>
            {testers}
          </div>
          <div style={labelStyle}>Testers</div>
        </div>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#000000" }}>
            {cost}
          </div>
          <div style={labelStyle}>Cost</div>
        </div>
      </div>
      <div className="mt-4 h-56 overflow-y-auto border border-[#E5E5E5] bg-[#F5F3F1]">
        <img src={image} alt={alt} className="block w-full" />
      </div>
    </article>
  );
}

export default function SiteModal({ isOpen, onClose }: SiteModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto border border-[#E5E5E5] bg-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-modal-title"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E5E5E5] bg-white px-6 py-5 md:px-8">
          <div>
            <p style={{ ...labelStyle, margin: "0 0 0.5rem", color: "#FF4704" }}>
              Process note
            </p>
            <h2 id="site-modal-title" style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1, margin: 0 }}>
              How I built this site
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center border border-[#E5E5E5] text-[#3F3B36] transition-colors hover:border-black hover:text-black"
            aria-label="Close site build details"
            data-testid="button-close-site-modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="space-y-12 px-6 py-8 md:px-8">
          <section className="space-y-5">
            <SectionHeading>Development story</SectionHeading>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9375rem",
                color: "#3F3B36",
                lineHeight: 1.7,
                maxWidth: "680px",
                margin: 0,
              }}
            >
              Each iteration was designed and directed by me, with AI handling execution where it adds the most value. Built in days, not months.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {iterations.map((iteration) => (
                <IterationCard key={iteration.title} {...iteration} />
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <SectionHeading>Tools and technologies</SectionHeading>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-[#E5E5E5] bg-[#F5F3F1] p-4 text-[#3F3B36] transition-colors hover:border-black"
                  data-testid={`link-tool-${tool.name.toLowerCase().replace(" ", "-")}`}
                >
                  <span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#000000" }}>
                      {tool.name}
                    </span>
                    <span style={{ ...labelStyle, display: "block", marginTop: "0.25rem" }}>
                      {tool.description}
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#777169]" />
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <SectionHeading>Original hero page evolution</SectionHeading>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#777169", lineHeight: 1.6, margin: 0 }}>
              Here is how the hero section evolved during the initial 15-hour development sprint.
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                [originalHero1, "Initial hero concept", "Initial concept, simple hero layout"],
                [navDevelopment, "Navigation development", "Navigation structure development"],
                [codeDevelopment, "Code development process", "Behind-the-scenes code development"],
                [finalDiscoHero, "Final hero concept", "Final hero concept with interactive effects"],
              ].map(([src, alt, caption]) => (
                <figure key={alt} className="m-0 space-y-2">
                  <img src={src} alt={alt} className="block w-full border border-[#E5E5E5]" />
                  <figcaption style={{ ...labelStyle, lineHeight: 1.5 }}>{caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <SectionHeading>Development timeline</SectionHeading>
            <div className="space-y-4 border-l-2 border-[#E5E5E5] pl-5">
              {[
                ["15 Hours", "Initial build with AI collaboration"],
                ["Colleague Review", "Professional feedback and insights"],
                ["4 Hours", "Refinements and UX testing"],
              ].map(([title, description]) => (
                <div key={title} className="relative">
                  <span className="absolute -left-[1.6rem] top-1 h-2 w-2 bg-[#FF4704]" aria-hidden="true" />
                  <strong style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#000000" }}>
                    {title}
                  </strong>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#777169", marginLeft: "0.5rem" }}>
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <SectionHeading>Site architecture and technology stack</SectionHeading>
            <div className="space-y-4">
              <div className="border border-[#E5E5E5] bg-[#F5F3F1] p-5">
                <h4 style={{ ...headingStyle, fontSize: "1.5rem", margin: "0 0 0.75rem" }}>
                  Frontend, React and TypeScript
                </h4>
                <ul className="space-y-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#3F3B36", lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
                  <li>React with TypeScript for type safety</li>
                  <li>Vite for fast builds and development</li>
                  <li>pnpm for efficient package management in a monorepo workspace</li>
                  <li>Tailwind CSS with the Alexis Brochu light editorial theme</li>
                  <li>shadcn/ui components built on Radix UI for accessibility</li>
                  <li>Wouter for lightweight client-side routing</li>
                  <li>TanStack Query for server-state fetching and caching</li>
                </ul>
              </div>
              <div className="border border-[#E5E5E5] bg-[#F5F3F1] p-5">
                <h4 style={{ ...headingStyle, fontSize: "1.5rem", margin: "0 0 0.75rem" }}>
                  Key features built
                </h4>
                <ul className="space-y-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#3F3B36", lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
                  <li>Portfolio sections with case-study modals and interactive galleries</li>
                  <li>Product strategy, UX design, and change management content</li>
                  <li>AI-assisted development with an iterative review process</li>
                  <li>Google Analytics 4 interaction and engagement tracking</li>
                  <li>Responsive mobile-first design</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}