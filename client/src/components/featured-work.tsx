import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";
import { trackEvent, trackSynthesizerEvent } from "@/lib/analytics";
import { useAdminPanel } from "@/hooks/use-admin-panel";
import calOesImage from "@assets/Cal OES Engage Landing Page Phase I_v2_1754580174186.png";
import paPortalImage from "@assets/Grants Management Reporting 1-1_1754840000206.png";
import dashboardImage from "@assets/image_1754580387947.png";
import oesAppsImage from "@assets/OES IT Apps_1754584482209.png";
import engageConnectImage from "@assets/EngageConnect_Vol_01_1754597322104.png";
import ocmWarningCenterImage from "@assets/OCM Warning Center screen_1754584646105.png";
import coeScreen1Image from "@assets/CoE Screen_1_1756170288750.png";
import coeSite1Image from "@assets/COE site-1_1756170324613.png";
import coeSite2Image from "@assets/COE site 2_1756170324613.png";
import eagWhiteBgImage from "@assets/Cal OES IT apps_1754843508712.png";
import eagCoverImage from "@assets/Cal OES IT apps_1755789738496.png";
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
import budweiserIceImage from "@assets/IMG_1656_1754968092692.jpg";
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
import grantsManagementPortalImage from "@assets/Grants Management Portal 1-0_1754968369323.png";
import grantsManagementHcdImage from "@assets/Grants Management HCD 1-2_1754968470644.png";
import grantsManagementIntroImage from "@assets/Grants Management Intro 1-0_1754968472954.png";
import grantsManagementBackOfficeImage from "@assets/Grants Management Back Office 1-2_1754968475876.png";
import grantsManagementReportingImage from "@assets/Grants Management Reporting 1-1_1754968478693.png";
import grantsManagementPresentationImage from "@assets/Grants Management Presentation 1-1_1754968480498.png";
import grantsManagementReportingNewImage from "@assets/Back Office 1.2_1755217963812.png";
import grantsManagementPortalNewImage from "@assets/Grants Management Portal 1-0_1754968806232.png";
import paCloseoutNewImage from "@assets/Directors_Deck_3_CROP_2025-08-21_10-45-30 .png";
import caAwardImage from "@assets/Best-of-CA-Awards-graphic2_1756172176096.jpg";
import paDirectorsDeckImage from "@assets/Directors_Deck_2025-08-21_10-44-04_1755788524452.png";
import paDirectorsDeck2Image from "@assets/Directors_Deck_2_2025-08-21_10-45-30_1755788563041.png";
import paDirectorsDeck3Image from "@assets/Directors_Deck_3_2025-08-21_10-45-30_1755788566301.png";
import paDirectorsDeck4Image from "@assets/Directors_Deck_4_2025-08-21_10-45-30_1755788569111.png";
import paDirectorsDeck5Image from "@assets/Directors_Deck_5_2025-08-21_10-45-30_1755788571116.png";
import paDirectorsDeck6Image from "@assets/Directors_Deck_6_2025-08-21_10-45-30_1755788573284.png";
import paDirectorsDeck7Image from "@assets/Directors_Deck_7_2025-08-21_10-45-30_1755788575819.png";
import paDirectorsDeck8Image from "@assets/Directors_Deck_8_2025-08-21_10-45-30_1755788578055.png";
import paTestimonialCoverImage from "@assets/Directors_Deck_3_2025-08-21_10-45-30_1755788662812.png";
import paCloseoutsQuoteImage from "@assets/PA Closeouts Quote.png";
import providenceSchoolsCoverImage from "@assets/FullSizeRender 4_1755218415405.jpg";
import providenceSchoolsBrochureImage from "@assets/FullSizeRender 10_1755218415406.jpg";
import providenceSystemMissionImage from "@assets/FullSizeRender 9_1755218651601.jpg";
import providenceSystemVisionImage from "@assets/FullSizeRender 3_1755218651602.jpg";
import providenceSystemObjectivesImage from "@assets/FullSizeRender 8_1755218651602.jpg";
import providenceSystemCoverImage from "@assets/FullSizeRender 15_1755218951707.jpg";
import providenceSystemFullSpreadImage from "@assets/FullSizeRender 19_1755218954872.jpg";
import abc6SeinfeldBillboardImage from "@assets/IMG_1654_1755219110187.jpg";
import abc6NewsBillboardsImage from "@assets/IMG_1655_1755219110188.jpg";
import abc6CampaignBillboardsImage from "@assets/FullSizeRender 16_1755219110188.jpg";
import abc6RosieBillboardsImage from "@assets/IMG_1652_1755219110189.jpg";
import tfGreenGalaImage from "@assets/IMG_1642_1755219275742.jpg";
import riConventionCenterImage from "@assets/IMG_1645_1755219474136.jpg";
import riConventionInteriorImage from "@assets/FullSizeRender 25_1755219569087.jpg";
import riConventionReportImage from "@assets/FullSizeRender 28_1755219569087.jpg";
import tfGreenDetailSpreadImage from "@assets/FullSizeRender 33_1755219662733.jpg";
import lifespanHealthBrochureImage from "@assets/FullSizeRender_1755219971125.jpg";
import lifespanHealthBookletImage from "@assets/FullSizeRender 17_1755219971125.jpg";

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
    id: 'ca-innovation-award',
    title: 'California GovTech Innovation Award',
    description: 'I led the team that won the 2023 California Government Technology Innovation Award for outstanding contributions to public-sector technology.',
    category: 'product-management',
    image: caAwardImage,
    award: 'Innovation Award',
    metrics: [
      { label: '4', value: 'Award-Winning Applications', color: 'text-chart-1' },
      { label: '2023', value: 'Innovation Summit', color: 'text-primary' }
    ],
    tags: ['Gov Tech', 'Innovation Award', 'Public Service']
  },
  {
    id: 'pa-portal',
    title: 'Public Assistance Closeouts App',
    description: 'Streamlining the reimbursement process for California subrecipients. Winner of the 2023 California Government Technology Innovation Award.',
    category: 'product-management',
    image: paCloseoutNewImage,
    award: 'Innovation Award',
    metrics: [
      { label: '75%', value: 'Support Ticket Reduction', color: 'text-chart-1' },
      { label: '$243M', value: 'Projects Closed Out', color: 'text-primary' }
    ],
    tags: ['Gov Tech', 'Process Automation', 'Public Service']
  },
  {
    id: 'caloes',
    title: 'Cal OES Engage Community Portal',
    description: 'California Governor\'s Office of Emergency Services Engage Community Portal. Modernizing legacy software with a CRM platform connecting residents to state and local municipalities for accessible grant funding.',
    category: 'product-management',
    image: calOesImage,
    metrics: [
      { label: '545.5%', value: 'User Base Increase', color: 'text-chart-1' },
      { label: '30k+', value: 'Subrecipient Users', color: 'text-primary' }
    ],
    tags: ['Product Management', 'Government Tech', 'SaaS CRM']
  },
  {
    id: 'ocm',
    title: 'Office of Change Management (OCM)',
    description: 'Leading a comprehensive government, state-wide system change initiative to transform California\'s digital infrastructure by unifying different legacy applications into a cohesive user experience.',
    category: 'product-management',
    image: ocmWarningCenterImage,
    metrics: [
      { label: '86.3%', value: 'User Adoption', color: 'text-chart-1' },
      { label: '23', value: 'Org-wide Applications', color: 'text-primary' }
    ],
    tags: ['Change Management', 'Product Strategy', 'Government Innovation']
  },
  {
    id: 'eag',
    title: 'Enterprise Architecture Group (EAG)',
    description: 'Integrating Cal OES technology infrastructure through strategic platform consolidation, Centers of Excellence initiatives, standardization of development practices, and implementation of governance frameworks.',
    category: 'product-management',
    image: eagCoverImage,
    metrics: [
      { label: '83%', value: 'Compliance', color: 'text-chart-1' },
      { label: '39M', value: 'Californian Residents', color: 'text-primary' }
    ],
    tags: ['Platform Engineering', 'Tech Strategy', 'Process Optimization']
  },
  {
    id: 'coe-engage',
    title: 'Cal OES IT Center of Excellence',
    description: 'Transforming the Engage Center of Excellence into a unified development framework that integrates competing consulting agencies and siloed programs to create consistent user experiences across state applications.',
    category: 'product-management',
    image: coeScreen1Image,
    slideshow: [
      coeSite1Image,
      coeSite2Image
    ],
    metrics: [
      { label: '33', value: 'Developers Unified', color: 'text-chart-1' },
      { label: '76%', value: 'Compliance Rate', color: 'text-primary' }
    ],
    tags: ['Center of Excellence', 'Development Standards', 'Team Integration']
  },
  {
    id: 'grants-management-sikich',
    title: 'Grants Management',
    description: 'Comprehensive grants management system built on Salesforce to map together systems across the state, enabling management to run unified reports and streamline grant oversight processes.',
    category: 'product-design',
    image: grantsManagementReportingNewImage,
    slideshow: [
      grantsManagementPortalNewImage,
      grantsManagementIntroImage,
      grantsManagementHcdImage,
      grantsManagementBackOfficeImage,
      grantsManagementReportingImage,
      grantsManagementPresentationImage
    ],
    metrics: [
      { label: 'System Integration', value: '100%', color: 'text-chart-1' },
      { label: 'Reporting Efficiency', value: '85%', color: 'text-primary' }
    ],
    tags: ['Salesforce', 'Government Systems', 'Data Integration', 'Reporting Dashboard']
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
    id: 'providence-schools',
    title: 'Providence Magnet School Program',
    description: 'Comprehensive educational branding and materials design for Providence Schools magnet program, creating vibrant promotional materials and program guides to showcase specialized educational opportunities.',
    category: 'brand-development',
    image: providenceSchoolsCoverImage,
    slideshow: [
      providenceSchoolsCoverImage,
      providenceSchoolsBrochureImage
    ],
    metrics: [
      { label: 'Educational Programs', value: '12+', color: 'text-chart-1' },
      { label: 'Material Design Impact', value: '95%', color: 'text-primary' }
    ],
    tags: ['Educational Branding', 'Magnet Schools', 'Print Design', 'Program Materials']
  },
  {
    id: 'providence-school-system',
    title: 'Providence School System Brand Development',
    description: 'Comprehensive strategic planning and brand development for Providence School Department, creating mission-driven materials and strategic frameworks to support educational excellence and community engagement.',
    category: 'brand-development',
    image: providenceSystemCoverImage,
    slideshow: [
      providenceSystemCoverImage,
      providenceSystemFullSpreadImage,
      providenceSystemMissionImage,
      providenceSystemVisionImage,
      providenceSystemObjectivesImage
    ],
    metrics: [
      { label: 'Strategic Frameworks', value: '5+', color: 'text-chart-1' },
      { label: 'Community Impact', value: '100%', color: 'text-primary' }
    ],
    tags: ['Educational Strategy', 'Strategic Planning', 'Community Engagement', 'School Systems']
  },
  {
    id: 'tf-green-gala',
    title: 'T.F. Green Airport Gala Invitation',
    description: 'Elegant event branding and invitation design for TF Green Airport\'s Grand Opening Gala, featuring sophisticated passport-themed materials and premium event presentation.',
    category: 'brand-development',
    image: tfGreenGalaImage,
    metrics: [
      { label: 'Premium Event Design', value: '100%', color: 'text-chart-1' },
      { label: 'Aviation Theme Integration', value: '95%', color: 'text-primary' }
    ],
    tags: ['Event Design', 'Aviation Branding', 'Premium Invitations', 'Gala Marketing']
  },
  {
    id: 'ri-convention-center',
    title: 'RI Convention Center Authority',
    description: 'Professional brochure design for Rhode Island Convention Center Authority featuring sophisticated architectural photography and premium hospitality branding.',
    category: 'brand-development',
    image: riConventionInteriorImage,
    metrics: [
      { label: 'Professional Branding', value: '100%', color: 'text-chart-1' },
      { label: 'Hospitality Focus', value: '95%', color: 'text-primary' }
    ],
    tags: ['Hospitality Branding', 'Convention Marketing', 'Architectural Photography', 'Tourism Promotion']
  },
  {
    id: 'lifespan-health-care',
    title: 'Lifespan Health Care Brand Development',
    description: 'Comprehensive healthcare brand development featuring patient-focused messaging, community healthcare positioning, and professional medical marketing materials.',
    category: 'brand-development',
    image: lifespanHealthBrochureImage,
    metrics: [
      { label: 'Healthcare Branding', value: '100%', color: 'text-chart-1' },
      { label: 'Community Focus', value: '95%', color: 'text-primary' }
    ],
    tags: ['Healthcare Branding', 'Medical Marketing', 'Community Health', 'Patient Care']
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

  // Disable parallax for all cards to ensure consistent hover behavior
  const disableParallax = true;

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
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        backgroundColor: '#303032'
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
          {project.award && (
            <Badge variant="secondary" className="bg-chart-3/80 text-foreground flex items-center gap-1">
              <Award className="w-3 h-3" />
              Award Winner
            </Badge>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <Badge key={`${project.id}-tag-${tagIndex}`} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-md text-muted-foreground mb-4">
          {project.description}
        </p>

        {project.metrics.length > 0 && project.category === 'product-management' && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.metrics.map((metric, metricIndex) => (
              <div key={`${project.id}-metric-${metricIndex}`} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                  {metric.label}
                </div>
                <div className="text-sm font-medium text-foreground">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}




      </div>
    </div>
  );
});

export default function FeaturedWork() {
  const { getCaseStudyFocus, settings } = useAdminPanel();
  const [activeFilter, setActiveFilter] = useState('product-management');
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);

  // Listen for filter events from other components
  useEffect(() => {
    const handleFilterEvent = (event: CustomEvent) => {
      setActiveFilter(event.detail.category);
    };

    window.addEventListener('filterPortfolio', handleFilterEvent as EventListener);
    return () => {
      window.removeEventListener('filterPortfolio', handleFilterEvent as EventListener);
    };
  }, []);

  // Get initial filter from URL parameters or default
  const getInitialFilter = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const focusFromUrl = urlParams.get('focus');

    if (focusFromUrl === 'pm') return 'product-management';
    if (focusFromUrl === 'design') return 'product-design';

    return 'product-management'; // default to Product Management
  };

  // Only apply admin filter when specifically set to PM or Design (not Auto) and no URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const focusFromUrl = urlParams.get('focus');

    // URL parameters take precedence over admin settings
    if (!focusFromUrl) {
      if (settings.jobType === 'PM') {
        setActiveFilter('product-management');
      } else if (settings.jobType === 'Design') {
        setActiveFilter('product-design');
      } else if (settings.jobType === 'Auto') {
        setActiveFilter('product-management'); // Default to Product Management even for Auto
      }
    }
  }, [settings.jobType]);

  const filteredProjects = useMemo(() => 
    projects.filter(project => 
      activeFilter === 'all' || project.category === activeFilter
    ), [activeFilter]
  );

  const openCaseStudy = useCallback((projectId: string) => {
    // Track case study viewing
    trackEvent('case_study_viewed', 'portfolio', projectId);

    const event = new CustomEvent('openCaseStudy', { detail: { projectId } });
    window.dispatchEvent(event);
  }, []);

  return (
    <section id="work" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="gradient-text">Product Portfolio</span>
          </h2>

          {/* Portfolio Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-background/50 p-1 backdrop-blur-sm border border-border">
              <button
                onClick={() => setActiveFilter('product-management')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeFilter === 'product-management'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                Product Management
              </button>
              <button
                onClick={() => setActiveFilter('product-design')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeFilter === 'product-design'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                Product Design
              </button>
              <button
                onClick={() => setActiveFilter('brand-development')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeFilter === 'brand-development'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                Brand Development
              </button>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeFilter === 'all'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                All Projects
              </button>
            </div>
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