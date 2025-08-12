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
import fairGroundsHatNewImage from "@assets/Fairgrounds hat_1754956090782.jpg";
import fairGroundsShamrockNewImage from "@assets/FairGrounds shamrock_1754956090782.jpg";
import fairGroundsSwagNewImage from "@assets/Fairgrounds swag_1754956090782.jpg";
import fairGroundsWinterNewImage from "@assets/FairGrounds winter_1754956090783.jpg";
import fairGroundsLogoSheetImage from "@assets/FG 2 color circle lg_1754956254824.jpg";
import fairGroundsDrinkNewImage from "@assets/FairGrounds drink_1754956090783.jpg";
import fairGroundsDrinksNewImage from "@assets/FairGrounds drinks_1754956090783.jpg";
import gatoradeLabelImage from "@assets/image_1754955500068.png";
import gatoradeSportsImage from "@assets/image_1754955502734.png";
import budweiserIceImage from "@assets/image_1754955785717.png";
import budweiserCampaignImage from "@assets/image_1754955810924.png";
import ttoolsCoverImage from "@assets/IMG_1627_1754956586808.jpg";
import ttoolsLicenseeImage from "@assets/IMG_1633_1754956594028.jpg";
import ttoolsCorporateImage from "@assets/IMG_1628_1754956594029.jpg";
import ttoolsBrandImage from "@assets/IMG_1629_1754956594029.jpg";
import ttoolsLogoImage from "@assets/IMG_1630_1754956594029.jpg";
import ttoolsStylusImage from "@assets/IMG_1631_1754956594030.jpg";
import ttoolsPackagingImage from "@assets/IMG_1632_1754956594030.jpg";
import ttoolsPressKitImage from "@assets/FullSizeRender 29_1754957693606.jpg";
import abc6CoverImage from "@assets/IMG_1641_1754956730422.jpg";
import abc6SeinfeldImage from "@assets/IMG_1654_1754956757000.jpg";
import abc6RosieImage from "@assets/IMG_1652_1754956757001.jpg";
import budweiserGuide1Image from "@assets/IMG_1657_1754956980605.jpg";
import budweiserGuide2Image from "@assets/IMG_1658_1754956980606.jpg";
import budweiserGuide3Image from "@assets/IMG_1659_1754956980606.jpg";
import budweiserGuide4Image from "@assets/IMG_1660_1754956980606.jpg";
import budweiserGuide5Image from "@assets/IMG_1661_1754956980606.jpg";
import budweiserGuide6Image from "@assets/IMG_1663_1754956980607.jpg";

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
    description: 'Complete brand identity and product packaging design for FairGrounds, a hip underground coffee bar in Maine, featuring vibrant drink packaging, merchandise, and seasonal storefront design.',
    category: 'brand-development',
    image: fairGroundsCoffeeImage,
    slideshow: [
      fairGroundsDrinksNewImage,
      fairGroundsWinterNewImage,
      fairGroundsLogoSheetImage,
      fairGroundsDrinkNewImage,
      fairGroundsSwagNewImage,
      fairGroundsHatNewImage,
      fairGroundsShamrockNewImage
    ],
    metrics: [
      { label: 'Brand Identity Score', value: '94%', color: 'text-chart-1' },
      { label: 'Design Recognition', value: '89%', color: 'text-primary' }
    ],
    tags: ['Brand Identity', 'Logo Design', 'Product Packaging', 'Community Coffee']
  },
  {
    id: 'abc6-rebrand-alexis-design',
    title: 'WLNE-ABC6 Brand Transformation',
    description: 'Company-wide brand transformation for ABC6 News under Alexis Design, working directly with the marketing director to redesign everything from studio backdrops to mic holders and outdoor advertising.',
    category: 'brand-development',
    image: abc6CoverImage,
    slideshow: [
      abc6SeinfeldImage,
      abc6RosieImage
    ],
    metrics: [
      { label: 'Brand Touchpoints', value: '100+', color: 'text-chart-1' },
      { label: 'Complete Transformation', value: '100%', color: 'text-primary' }
    ],
    tags: ['Television Branding', 'Studio Design', 'Outdoor Advertising', 'Alexis Design']
  },
  {
    id: 'ttools-alexis-design',
    title: 'TTools Brand Identity System',
    description: 'Complete brand identity and product licensing system created under Alexis Design for stylus technology products, successfully sold to Fellows Office Products at Staples.',
    category: 'brand-development',
    image: ttoolsCoverImage,
    slideshow: [
      ttoolsPressKitImage,
      ttoolsLicenseeImage,
      ttoolsCorporateImage,
      ttoolsBrandImage,
      ttoolsLogoImage,
      ttoolsStylusImage,
      ttoolsPackagingImage
    ],
    metrics: [
      { label: 'Brand Guidelines', value: '50+', color: 'text-chart-1' },
      { label: 'Commercial Success', value: '100%', color: 'text-primary' }
    ],
    tags: ['Brand Identity', 'Product Licensing', 'Retail Partnership', 'Alexis Design']
  },
  {
    id: 'gatorade-zipatoni',
    title: 'Gatorade Brand Development',
    description: 'Brand development and sports marketing design concepts created during my tenure at Zipatoni, focusing on label design and sports marketing materials for the iconic Gatorade brand.',
    category: 'brand-development',
    image: gatoradeSportsImage,
    slideshow: [
      gatoradeLabelImage,
      gatoradeSportsImage
    ],
    metrics: [
      { label: 'Design Concepts', value: '15+', color: 'text-chart-1' },
      { label: 'Brand Recognition', value: '95%', color: 'text-primary' }
    ],
    tags: ['Brand Development', 'Sports Marketing', 'Label Design', 'Zipatoni Agency']
  },
  {
    id: 'budweiser-zipatoni',
    title: 'Budweiser Marketing Campaign',
    description: 'Beer brand campaign development during my time at Zipatoni, creating compelling marketing materials and brand campaigns for one of America\'s most iconic beer brands.',
    category: 'brand-development',
    image: budweiserIceImage,
    slideshow: [
      budweiserGuide1Image,
      budweiserGuide2Image,
      budweiserGuide3Image,
      budweiserGuide4Image,
      budweiserGuide5Image,
      budweiserGuide6Image
    ],
    metrics: [
      { label: 'Campaign Concepts', value: '12+', color: 'text-chart-1' },
      { label: 'Brand Consistency', value: '98%', color: 'text-primary' }
    ],
    tags: ['Beer Marketing', 'Campaign Development', 'Brand Strategy', 'Zipatoni Agency']
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
  const [activeFilter, setActiveFilter] = useState<string>('product-management');

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