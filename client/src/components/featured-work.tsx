import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";
import calOesImage from "@assets/Cal OES Engage Landing Page Phase I_v2_1754580174186.png";
import paPortalImage from "@assets/Grants Management Reporting 1-1_1754840000206.png";
import dashboardImage from "@assets/image_1754580387947.png";
import oesAppsImage from "@assets/OES IT Apps_1754584482209.png";
import engageConnectImage from "@assets/EngageConnect_Vol_01_1754597322104.png";
import eagWhiteBgImage from "@assets/Cal OES IT apps_1754843508712.png";
import iLaveImage from "@assets/!-Lave group Alt_1754580875717.png";
import weChoreImage from "@assets/WeChore Diagonal_1754581130624.png";
import subscriptexImage from "@assets/Subscriptex Layers_1754581352868.png";
import fairGroundsCoffeeImage from "@assets/FairGrounds drinks_1754847440176.jpg";
import fairGroundsSwagImage from "@assets/Fairgrounds swag_1754848838840.jpg";
import fairGroundsWinterImage from "@assets/FairGrounds winter_1754848838840.jpg";
import fairGroundsLogoImage from "@assets/FG 2 color circle lg_1754848838841.jpg";
import fairGroundsDrinkImage from "@assets/FairGrounds drink_1754848838842.jpg";
import fairGroundsDrinksImage from "@assets/FairGrounds drinks_1754848838842.jpg";
import fairGroundsHatImage from "@assets/Fairgrounds hat_1754848838842.jpg";
import fairGroundsShamrockImage from "@assets/FairGrounds shamrock_1754848838843.jpg";

// Preload critical images immediately when component loads
const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

// Preload the slow-loading images
preloadImage(eagWhiteBgImage);
preloadImage(paPortalImage);

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'product-management' | 'product-design' | 'brand-development' | 'marketing';
  image: string;
  images?: string[]; // For rotating images
  slideshow?: string[]; // For case study slideshow
  metrics: { label: string; value: string; color: string }[];
  tags: string[];
  award?: string;
}

const projects: Project[] = [
  {
    id: 'caloes',
    title: 'Cal OES Engage Community Portal',
    description: 'Modernizing government legacy software with a SaaS CRM platform connecting Californians to state and local municipalities for accessible grant funding.',
    category: 'product-management',
    image: calOesImage,
    metrics: [
      { label: 'User Base Increase', value: '545.5%', color: 'text-primary' },
      { label: 'Successful Onboarding', value: '203%', color: 'text-chart-2' }
    ],
    tags: ['Product Management', 'Government Tech', 'SaaS CRM']
  },
  {
    id: 'ocm',
    title: 'Office of Change Management (OCM)',
    description: 'Leading a comprehensive government, state-wide system change initiative to transform California\'s digital infrastructure by unifying different legacy applications into a cohesive user experience.',
    category: 'product-management',
    image: engageConnectImage,
    metrics: [
      { label: 'Support Ticket Reduction', value: '75%', color: 'text-chart-3' },
      { label: 'User Base Growth', value: '545.5%', color: 'text-primary' }
    ],
    tags: ['Change Management', 'Product Strategy', 'Government Innovation']
  },
  {
    id: 'eag',
    title: 'Enterprise Architecture Group (EAG)',
    description: 'Integrating Cal OES technology infrastructure through strategic platform consolidation, Centers of Excellence initiatives, standardization of development practices, and implementation of governance frameworks.',
    category: 'product-management',
    image: eagWhiteBgImage,
    metrics: [
      { label: 'Platform Consolidation', value: '244M', color: 'text-chart-4' },
      { label: 'Cost Savings', value: '75%', color: 'text-chart-3' }
    ],
    tags: ['Platform Engineering', 'Tech Strategy', 'Process Optimization']
  },
  {
    id: 'pa-portal',
    title: 'Public Assistance Closeouts App',
    description: 'Streamlining the reimbursement process for California subrecipients. Winner of the 2023 California Government Technology Innovation Award.',
    category: 'product-management',
    image: paPortalImage,
    metrics: [
      { label: 'Processing Time', value: '244M', color: 'text-primary' },
      { label: 'User Satisfaction', value: '75%', color: 'text-chart-2' }
    ],
    tags: ['Gov Tech', 'Process Automation', 'Public Service'],
    award: '2023 CA Gov Tech Innovation Award'
  },
  {
    id: 'ilave',
    title: 'iLave',
    description: 'Developing a fintech solution for the German market focused on modern banking experiences and user-centered financial services.',
    category: 'product-design',
    image: iLaveImage,
    metrics: [
      { label: 'User Adoption', value: '300%', color: 'text-primary' },
      { label: 'Market Penetration', value: '85%', color: 'text-chart-2' }
    ],
    tags: ['Fintech', 'German Market', 'Banking UX']
  },
  {
    id: 'wechore',
    title: 'WeChore',
    description: 'A modern task management platform designed to streamline household responsibilities through intuitive design and smart automation.',
    category: 'product-design',
    image: weChoreImage,
    metrics: [
      { label: 'Task Completion', value: '92%', color: 'text-chart-3' },
      { label: 'User Retention', value: '78%', color: 'text-primary' }
    ],
    tags: ['Task Management', 'Home Automation', 'Productivity']
  },
  {
    id: 'subscriptex',
    title: 'Subscriptex',
    description: 'A comprehensive subscription management system with advanced analytics and user experience optimization for the German financial sector.',
    category: 'product-design',
    image: subscriptexImage,
    metrics: [
      { label: 'Subscription Growth', value: '156%', color: 'text-chart-4' },
      { label: 'Churn Reduction', value: '43%', color: 'text-chart-2' }
    ],
    tags: ['Design System', 'German Market', 'Financial UX']
  },
  {
    id: 'fairgrounds-coffee',
    title: 'FairGrounds Community Coffee',
    description: 'Complete brand identity and product packaging design for a vibrant community coffee brand featuring colorful drink packaging and modern logo design.',
    category: 'brand-development',
    image: fairGroundsCoffeeImage,
    slideshow: [
      fairGroundsCoffeeImage,
      fairGroundsSwagImage,
      fairGroundsWinterImage,
      fairGroundsLogoImage,
      fairGroundsDrinkImage,
      fairGroundsDrinksImage,
      fairGroundsHatImage,
      fairGroundsShamrockImage
    ],
    metrics: [
      { label: 'Brand Identity Score', value: '94%', color: 'text-chart-1' },
      { label: 'Design Recognition', value: '89%', color: 'text-primary' }
    ],
    tags: ['Brand Identity', 'Logo Design', 'Product Packaging', 'Community Coffee']
  }
];



// Project card with conditional parallax effects
const ProjectCard = React.memo(({ project, index, onOpenCaseStudy }: {
  project: Project;
  index: number;
  onOpenCaseStudy: (id: string) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  
  // Disable parallax for slow cards (EAG and Public Assistance)
  const disableParallax = project.id === 'eag' || project.id === 'pa-portal';

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(card);

    // Skip scroll handling if parallax is disabled
    if (disableParallax) {
      return () => {
        observer.disconnect();
      };
    }

    const handleScroll = () => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setParallaxY(progress * 30);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [disableParallax]);

  return (
    <div
      ref={cardRef}
      className={`glass rounded-2xl overflow-hidden hover:glow-purple group cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onClick={() => onOpenCaseStudy(project.id)}
      style={{
        transform: disableParallax 
          ? `scale(${isVisible ? 1 : 0.95})` 
          : `translateY(${isVisible ? -parallaxY * 0.2 : 20}px) scale(${isVisible ? 1 : 0.95})`,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          style={disableParallax ? {} : { 
            transform: `translateY(${parallaxY * 0.1}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-primary/80 text-primary-foreground">
            {project.category === 'product-management' ? 'Product Management' : 
             project.category === 'product-design' ? 'Product Design' : 
             project.category === 'brand-development' ? 'Brand Development' : 'Marketing'}
          </Badge>
          {project.award && (
            <Badge variant="secondary" className="bg-chart-3/80 text-foreground flex items-center gap-1">
              <Award className="w-3 h-3" />
              Award Winner
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-6">{project.description}</p>
        
        {project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.metrics.map((metric, metricIndex) => (
              <div key={`${project.id}-metric-${metricIndex}`} className="text-center">
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tagIndex) => (
            <Badge key={`${project.id}-tag-${tagIndex}`} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button className="w-full gradient-bg-secondary hover:opacity-90 transition-all duration-300">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Case Study
        </Button>
      </div>
    </div>
  );
});

export default function FeaturedWork() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = useMemo(() => 
    projects.filter(project => 
      activeFilter === 'all' || project.category === activeFilter
    ), [activeFilter]
  );

  const openCaseStudy = useCallback((projectId: string) => {
    const event = new CustomEvent('openCaseStudy', { detail: { projectId } });
    window.dispatchEvent(event);
  }, []);

  return (
    <section id="work" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <span className="text-sm font-medium">Featured Work</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 gradient-text">
            Product Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Transforming government technology through strategic product management
          </p>

          {/* Filter */}
          <div className="glass rounded-xl p-2">
            <Button
              variant={activeFilter === 'product-management' ? 'default' : 'ghost'}
              onClick={() => setActiveFilter('product-management')}
              className={activeFilter === 'product-management' ? 'gradient-bg-primary' : ''}
            >
              Product Management
            </Button>
            <Button
              variant={activeFilter === 'product-design' ? 'default' : 'ghost'}
              onClick={() => setActiveFilter('product-design')}
              className={activeFilter === 'product-design' ? 'gradient-bg-primary' : ''}
            >
              Product Design
            </Button>
            <Button
              variant={activeFilter === 'brand-development' ? 'default' : 'ghost'}
              onClick={() => setActiveFilter('brand-development')}
              className={activeFilter === 'brand-development' ? 'gradient-bg-primary' : ''}
            >
              Brand Development
            </Button>
            <Button
              variant={activeFilter === 'all' ? 'default' : 'ghost'}
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'gradient-bg-primary' : ''}
            >
              All Projects
            </Button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenCaseStudy={openCaseStudy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}