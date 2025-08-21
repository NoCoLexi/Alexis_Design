import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import originalHero1 from "@assets/image_1755621221671.png";
import originalHero2 from "@assets/image_1755621479536.png";
import originalHero3 from "@assets/image_1755621787749.png";
import originalHero4 from "@assets/image_1755622182225.png";

interface SiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteModal({ isOpen, onClose }: SiteModalProps) {
  if (!isOpen) return null;

  const tools = [
    { name: "Replit", url: "https://replit.com", description: "Development platform" },
    { name: "NotebookLM", url: "https://notebooklm.google.com", description: "AI research assistant" },
    { name: "Claude", url: "https://claude.ai", description: "AI coding partner" },
    { name: "ChatGPT", url: "https://chatgpt.com", description: "AI brainstorming" },
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
            <h2 className="text-2xl font-bold gradient-text">About This Site</h2>
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
              This site is fueled by imagination, code, and AI genius: <strong>Replit, NotebookLM, Claude, ChatGPT, and Suno</strong> working in harmony with <strong>Adobe Creative Cloud and Figma</strong>. This iterative process was initially built in <strong>15 hours</strong>, then a colleague review, <strong>4 hours of changes</strong>, and UX testing.
            </p>
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
                  alt="Original hero design - simple title" 
                  className="w-full rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-colors"
                  data-testid="img-original-hero-1"
                />
                <p className="text-xs text-gray-400">Initial simple title layout</p>
              </div>
              <div className="space-y-2">
                <img 
                  src={originalHero2} 
                  alt="Original hero design - with button" 
                  className="w-full rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-colors"
                  data-testid="img-original-hero-2"
                />
                <p className="text-xs text-gray-400">Added interactive music button</p>
              </div>
              <div className="space-y-2">
                <img 
                  src={originalHero3} 
                  alt="Original hero design - with tagline" 
                  className="w-full rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-colors"
                  data-testid="img-original-hero-3"
                />
                <p className="text-xs text-gray-400">Added personalized tagline</p>
              </div>
              <div className="space-y-2">
                <img 
                  src={originalHero4} 
                  alt="Original hero design - refined" 
                  className="w-full rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-colors"
                  data-testid="img-original-hero-4"
                />
                <p className="text-xs text-gray-400">Final iteration before colleague review</p>
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
        </div>
      </div>
    </div>
  );
}