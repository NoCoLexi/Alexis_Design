import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import originalHero1 from "@assets/image_1755621221671.png";
import navDevelopment from "@assets/image_1755632165306.png";
import codeDevelopment from "@assets/image_1755782692797.png";
import finalDiscoHero from "@assets/image_1755783740539.png";

interface SiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteModal({ isOpen, onClose }: SiteModalProps) {
  if (!isOpen) return null;

  const tools = [
    { name: "Replit", url: "https://replit.com", description: "Development platform" },
    { name: "GitHub", url: "https://github.com", description: "Version control & collaboration" },
    { name: "NotebookLM", url: "https://notebooklm.google.com", description: "Explainer video & note organization" },
    { name: "Claude", url: "https://claude.ai", description: "AI coding partner" },
    { name: "ChatGPT", url: "https://chatgpt.com", description: "AI brainstorming" },
    { name: "Gemini", url: "https://gemini.google.com", description: "AI validation" },
    { name: "Sora", url: "https://openai.com/sora", description: "AI image creation" },
    { name: "Suno", url: "https://suno.ai", description: "AI music generation" },
    { name: "Adobe Creative Cloud", url: "https://adobe.com", description: "Design suite" },
    { name: "Figma", url: "https://figma.com", description: "Design collaboration" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-400/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur border-b border-purple-400/20 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold gradient-text">How I built this site</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              data-testid="button-close-site-modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Development Story */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-400">Development Story</h3>
            
            <p className="text-gray-300 leading-relaxed">
              Built in harmony with AI tools, refined through iterative improvement and user feedback. This portfolio demonstrates product design and management mixed with my AI-PM skills.
            </p>

            {/* Iteration Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* 1st Iteration */}
              <div className="glass rounded-xl p-4 border border-purple-400/20">
                <h4 className="text-lg font-semibold text-blue-400 mb-4">1st Iteration</h4>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">2 Days</div>
                    <div className="text-xs text-gray-400">Build Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">5 testers</div>
                    <div className="text-xs text-gray-400">User Testing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$48.10</div>
                    <div className="text-xs text-gray-400">Total Cost</div>
                  </div>
                </div>
              </div>

              {/* 7th Iteration (Most Recent) */}
              <div className="glass rounded-xl p-4 border border-green-400/20">
                <h4 className="text-lg font-semibold text-green-400 mb-4">6th Iteration (Most Recent)</h4>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">7 Weeks</div>
                    <div className="text-xs text-gray-400">Build Time (2 Days per iteration)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">18 testers</div>
                    <div className="text-xs text-gray-400">User Testing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$349</div>
                    <div className="text-xs text-gray-400">Total Cost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Used */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-400">Tools & Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 glass rounded-lg hover:glow-purple transition-all duration-300 group"
                  data-testid={`link-tool-${tool.name.toLowerCase().replace(' ', '-')}`}
                >
                  <div>
                    <span className="font-medium text-white">{tool.name}</span>
                    <p className="text-sm text-gray-400">{tool.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Original Hero Screenshots */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-400">Original Hero Page Evolution</h3>
            <p className="text-gray-300 text-sm">
              Here's how the hero section evolved during the initial 15-hour development sprint:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <img 
                  src={originalHero1} 
                  alt="Initial hero concept" 
                  className="w-full rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-colors"
                  data-testid="img-original-hero-1"
                />
                <p className="text-xs text-gray-400">Initial concept - simple hero layout</p>
              </div>
              <div className="space-y-2">
                <img 
                  src={navDevelopment} 
                  alt="Navigation development" 
                  className="w-full rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-colors"
                  data-testid="img-nav-development"
                />
                <p className="text-xs text-gray-400">Navigation structure development</p>
              </div>
              <div className="space-y-2">
                <img 
                  src={codeDevelopment} 
                  alt="Code development process" 
                  className="w-full rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-colors"
                  data-testid="img-code-development"
                />
                <p className="text-xs text-gray-400">Behind-the-scenes code development</p>
              </div>
              <div className="space-y-2">
                <img 
                  src={finalDiscoHero} 
                  alt="Final disco-themed hero" 
                  className="w-full rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-colors"
                  data-testid="img-final-disco-hero"
                />
                <p className="text-xs text-gray-400">Final disco-themed hero with interactive effects</p>
              </div>
            </div>
          </div>

          {/* Development Process */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-400">Development Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-white">15 Hours</span>
                  <span className="text-gray-400 ml-2">Initial build with AI collaboration</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-white">Colleague Review</span>
                  <span className="text-gray-400 ml-2">Professional feedback and insights</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-white">4 Hours</span>
                  <span className="text-gray-400 ml-2">Refinements and UX testing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Site Architecture & Technology Stack */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-400">Site Architecture & Technology Stack</h3>
            
            <div className="space-y-6">
              {/* Frontend */}
              <div className="glass rounded-xl p-4">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Frontend (React + TypeScript)</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• React 18 with TypeScript for type safety</li>
                  <li>• Vite as the build tool for fast development</li>
                  <li>• Tailwind CSS for styling with custom dark theme</li>
                  <li>• shadcn/ui components built on Radix UI for accessibility</li>
                  <li>• Wouter for lightweight routing</li>
                  <li>• TanStack Query for data fetching and caching</li>
                  <li>• React Hook Form + Zod for form validation</li>
                </ul>
              </div>

              {/* Backend */}
              <div className="glass rounded-xl p-4">
                <h4 className="text-lg font-semibold text-green-400 mb-3">Backend (Express.js)</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Express.js server with TypeScript</li>
                  <li>• PostgreSQL database ready with Drizzle ORM</li>
                  <li>• In-memory storage for development</li>
                  <li>• RESTful API with proper error handling</li>
                </ul>
              </div>

              {/* Key Features */}
              <div className="glass rounded-xl p-4">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Key Features Built</h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-purple-300 font-medium text-sm">Professional Portfolio Sections:</span>
                    <ul className="text-gray-300 text-sm mt-1 ml-2">
                      <li>• Dynamic hero section with rotating job titles (AI Product Designer, Product Manager, etc.)</li>
                      <li>• Featured work showcase with 20+ projects including Cal OES, Grants Management, FairGrounds Coffee</li>
                      <li>• About section highlighting expertise</li>
                      <li>• Contact form with email, LinkedIn, and Calendly integration</li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-purple-300 font-medium text-sm">Interactive Audio System:</span>
                    <ul className="text-gray-300 text-sm mt-1 ml-2">
                      <li>• Custom music player with "Hire Me" song</li>
                      <li>• Audio feedback and hover sound effects</li>
                      <li>• Web Audio API integration</li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-purple-300 font-medium text-sm">Advanced Analytics (Google Analytics 4):</span>
                    <ul className="text-gray-300 text-sm mt-1 ml-2">
                      <li>• Comprehensive tracking of user interactions</li>
                      <li>• Portfolio click tracking</li>
                      <li>• Audio engagement metrics</li>
                      <li>• Device and screen size detection</li>
                      <li>• Session duration and user behavior analysis</li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-purple-300 font-medium text-sm">Admin Panel & Customization:</span>
                    <ul className="text-gray-300 text-sm mt-1 ml-2">
                      <li>• Dynamic job-targeted customization</li>
                      <li>• URL parameter parsing for company-specific greetings</li>
                      <li>• Live site adaptation without affecting main experience</li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-purple-300 font-medium text-sm">Modern UX Features:</span>
                    <ul className="text-gray-300 text-sm mt-1 ml-2">
                      <li>• Glassmorphism effects and gradient backgrounds</li>
                      <li>• Smooth animations and parallax scrolling</li>
                      <li>• Dark theme with custom CSS variables</li>
                      <li>• Fully responsive mobile-first design</li>
                      <li>• Case study modals and interactive galleries</li>
                    </ul>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}