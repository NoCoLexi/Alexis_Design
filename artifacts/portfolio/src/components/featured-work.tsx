import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";
import { trackEvent, trackSynthesizerEvent } from "@/lib/analytics";
import { useAdminPanel } from "@/hooks/use-admin-panel";
import { 
  usePortfolioFilters, 
  VerticalFilter, 
  verticalLabels, 
  availableVerticals
} from "@/hooks/use-portfolio-filters";
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
import iLaveImage from "@assets/!-Lave_frames_1_1778442960084.png";
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
import providenceSystemCoverImage from "@assets/FullSizeRender 4_1755218415405.jpg";
import providenceSystemFullSpreadImage from "@assets/FullSizeRender 19_1755218954872.jpg";
import providenceSystemOldCoverImage from "@assets/FullSizeRender 15_1755218951707.jpg";
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
import lifespanHealthCoverImage from "@assets/FullSizeRender 13_1764028488191.jpg";
import providenceSchoolsMaterialsImage from "@assets/providence-schools-materials_1756173000000.jpg";
import jwuBrandingImage from "@assets/FullSizeRender 2_1754523503518.jpg";
import outsideTvImage from "@assets/Screenshot_2014-01-06_22.29.34_1770666947914.png";
import outsideTvCoverImage from "@assets/Screenshot_2014-01-06_22.29.55_1770667850426.png";
import mallinckrodtMedicalLogo from "@assets/Mallinckrodt_Medical_transparent_1770668716629.png";
import trxGroupImage from "@assets/IMG_6319_1770666807153.jpg";
import trxPlankImage from "@assets/IMG_6349_1770666810955.jpg";
import magazineArticleImage from "@assets/20181006_071644_1770666824971.jpg";
import trxPortraitImage from "@assets/Alexis_TRX_1_1770666878409.jpg";
import trxHandstandImage from "@assets/Alexis_TRX_handstand_1770666909059.png";
import trxRipImage from "@assets/Alexis_6_1770667005999.jpg";
import handshakrHeroImage from "@assets/screenshot-1778439647569.png";
import siStartScreenImage from "@assets/si-start-screen_1778447747326.jpg";
import siOpengraphImage from "@assets/si-opengraph_1778447747327.jpg";
import siHomeImage from "@assets/Stakeholder_invaders_home_1778449156633.png";
import siPlayingImage from "@assets/si-playing_1778447747328.jpg";
import siGameoverImage from "@assets/si-gameover_1778447747329.jpg";
import siWinImage from "@assets/si-win_1778447747330.jpg";


// Preload critical images immediately when component loads
const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

// Preload the slow-loading images
preloadImage(eagWhiteBgImage);
preloadImage(paPortalImage);

// Type definitions for roles and verticals
type Role = 'product-management' | 'product-design' | 'brand-development';
type Vertical = 'government' | 'healthcare' | 'education';


interface Project {
  id: string;
  title: string;
  description: string;
  category: 'product-management' | 'product-design' | 'brand-development' | 'marketing';
  roles: Role[];
  verticals: Vertical[];
  image: string;
  images?: string[]; // For rotating images
  slideshow?: string[]; // For case study slideshow
  metrics: { label: string; value: string; color: string }[];
  tags: string[];
  canonicalTags: string[]; // Canonical tags for filtering
  award?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 'lifespan-health-care',
    title: 'Lifespan Health Care',
    description: 'Comprehensive healthcare brand development featuring patient-focused messaging, community healthcare positioning, and professional medical marketing materials.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
    image: lifespanHealthCoverImage,
    slideshow: [
      lifespanHealthCoverImage,
      lifespanHealthBrochureImage,
      lifespanHealthBookletImage
    ],
    metrics: [
      { label: 'Healthcare Branding', value: '100%', color: 'text-chart-1' },
      { label: 'Community Focus', value: '95%', color: 'text-primary' }
    ],
    tags: ['Healthcare Branding', 'Medical Marketing', 'Community Health', 'Patient Care'],
    canonicalTags: []
  },
  {
    id: 'handshakr',
    title: 'HandShakr',
    description: 'An AI-powered networking companion that captures the people you meet, analyzes your conversation, syncs the contact to a Notion database, and auto-blocks calendar time to remind you to follow up — so a great handshake never goes cold.',
    category: 'product-design',
    roles: ['product-design', 'product-management'],
    verticals: [],
    image: handshakrHeroImage,
    metrics: [
      { label: '10 Hours', value: 'Solo Build', color: 'text-chart-1' },
      { label: '1 Agent', value: 'Replit Agent 4', color: 'text-primary' }
    ],
    tags: ['AI Agent', 'Networking', 'Replit Agent 4', 'Build-a-thon'],
    canonicalTags: []
  },
  {
    id: 'stakeholder-invaders',
    title: 'Stakeholder Invaders',
    description: 'A change-management arcade game where you play as the change agent, converting skeptical stakeholders into advocates using tactics drawn from real organizational strategy, not bullets.',
    category: 'product-design',
    roles: ['product-design', 'product-management'],
    verticals: [],
    image: siHomeImage,
    slideshow: [siHomeImage, siStartScreenImage, siPlayingImage, siWinImage, siGameoverImage],
    liveUrl: '/stakeholder-invaders/',
    metrics: [
      { label: 'Solo Build', value: '1 Evening', color: 'text-chart-1' },
      { label: '5 Tactics', value: 'Real OCM', color: 'text-primary' }
    ],
    tags: ['Game Design', 'Change Management', 'AI-Built', 'Replit'],
    canonicalTags: []
  },
  {
    id: 'gatorade-zipatoni',
    title: 'Gatorade',
    description: 'Brand development and sports marketing design concepts created during my tenure at Zipatoni, focusing on label design and sports marketing materials for the iconic brand.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
    image: gatoradeSportsImage,
    slideshow: [
      gatoradeLabelImage,
      gatoradeSportsImage
    ],
    metrics: [
      { label: 'Design Concepts', value: '15+', color: 'text-chart-1' },
      { label: 'Brand Recognition', value: '95%', color: 'text-primary' }
    ],
    tags: ['Brand Development', 'Sports Marketing', 'Label Design', 'Zipatoni Agency'],
    canonicalTags: []
  },
  {
    id: 'fairgrounds-coffee',
    title: 'FairGrounds',
    description: 'Complete brand identity and product packaging design for a hip underground coffee bar in Maine, featuring vibrant drink packaging, merchandise, and seasonal storefront design.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
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
    tags: ['Brand Identity', 'Logo Design', 'Product Packaging', 'Community Coffee'],
    canonicalTags: []
  },
  {
    id: 'budweiser-zipatoni',
    title: 'Budweiser',
    description: 'Beer brand campaign development during my time at Zipatoni, creating compelling marketing materials and brand campaigns for one of America\'s most iconic beer brands.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
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
    tags: ['Beer Marketing', 'Campaign Development', 'Brand Strategy', 'Zipatoni Agency'],
    canonicalTags: []
  },
  {
    id: 'ca-innovation-award',
    title: 'California GovTech Innovation Award',
    description: 'I led the team that won the 2023 California Government Technology Innovation Award for outstanding contributions to public-sector technology.',
    category: 'product-management',
    roles: ['product-management'],
    verticals: ['government'],
    image: caAwardImage,
    award: 'Innovation Award',
    metrics: [
      { label: '4', value: 'Award-Winning Applications', color: 'text-chart-1' },
      { label: '2023', value: 'Innovation Summit', color: 'text-primary' }
    ],
    tags: ['Gov Tech', 'Innovation Award', 'Public Service'],
    canonicalTags: ['govtech', 'award', 'public-service']
  },
  {
    id: 'grants-management-sikich',
    title: 'Grants Management',
    description: 'Comprehensive grants management system built on Salesforce to map together systems across the state, enabling management to run unified reports and streamline grant oversight processes.',
    category: 'product-design',
    roles: ['product-design', 'product-management'],
    verticals: ['government'],
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
    tags: ['Salesforce', 'Government Systems', 'Data Integration', 'Reporting Dashboard'],
    canonicalTags: ['govtech', 'salesforce', 'public-service']
  },
  {
    id: 'pa-portal',
    title: 'Public Assistance Closeouts App',
    description: 'A stalled grant app needed stakeholder alignment. I led 100+ hours of research and created artifacts that unblocked progress.',
    category: 'product-management',
    roles: ['product-management'],
    verticals: ['government'],
    image: paCloseoutNewImage,
    award: 'Innovation Award',
    metrics: [
      { label: '$2.1B', value: 'Disaster Relief Platform', color: 'text-chart-1' },
      { label: '$243M', value: 'Projects Closed Out', color: 'text-primary' }
    ],
    tags: ['UX Research', 'Stakeholder Alignment', 'Process Design'],
    canonicalTags: ['govtech', 'award', 'public-service']
  },
  {
    id: 'caloes',
    title: 'Cal OES Engage Community Portal',
    description: 'California Governor\'s Office of Emergency Services Engage Community Portal. Modernizing legacy software with a CRM platform connecting residents to state and local municipalities for accessible grant funding.',
    category: 'product-management',
    roles: ['product-management'],
    verticals: ['government'],
    image: calOesImage,
    metrics: [
      { label: '545.5%', value: 'User Base Increase', color: 'text-chart-1' },
      { label: '30k+', value: 'Subrecipient Users', color: 'text-primary' }
    ],
    tags: ['Product Management', 'Government Tech', 'SaaS CRM'],
    canonicalTags: ['govtech', 'public-service', 'salesforce']
  },
  {
    id: 'ocm',
    title: 'Office of Change Management (OCM)',
    description: 'Leading a comprehensive government, state-wide system change initiative to transform California\'s digital infrastructure by unifying different legacy applications into a cohesive user experience.',
    category: 'product-management',
    roles: ['product-management'],
    verticals: ['government'],
    image: ocmWarningCenterImage,
    metrics: [
      { label: '86.3%', value: 'User Adoption', color: 'text-chart-1' },
      { label: '23', value: 'Org-wide Applications', color: 'text-primary' }
    ],
    tags: ['Change Management', 'Product Strategy', 'Government Innovation'],
    canonicalTags: ['govtech', 'public-service']
  },
  {
    id: 'eag',
    title: 'Enterprise Architecture Group (EAG)',
    description: 'Integrating Cal OES technology infrastructure through strategic platform consolidation, Centers of Excellence initiatives, standardization of development practices, and implementation of governance frameworks.',
    category: 'product-management',
    roles: ['product-management'],
    verticals: ['government'],
    image: eagCoverImage,
    metrics: [
      { label: '83%', value: 'Compliance', color: 'text-chart-1' },
      { label: '39M', value: 'Californian Residents', color: 'text-primary' }
    ],
    tags: ['Platform Engineering', 'Tech Strategy', 'Process Optimization'],
    canonicalTags: ['govtech']
  },
  {
    id: 'coe-engage',
    title: 'Cal OES IT Center of Excellence',
    description: 'Transforming the Engage Center of Excellence into a unified development framework that integrates competing consulting agencies and siloed programs to create consistent user experiences across state applications.',
    category: 'product-management',
    roles: ['product-management'],
    verticals: ['government'],
    image: coeScreen1Image,
    slideshow: [
      coeSite1Image,
      coeSite2Image
    ],
    metrics: [
      { label: '33', value: 'Developers Unified', color: 'text-chart-1' },
      { label: '76%', value: 'Compliance Rate', color: 'text-primary' }
    ],
    tags: ['Center of Excellence', 'Development Standards', 'Team Integration'],
    canonicalTags: ['govtech']
  },
  {
    id: 'ilave',
    title: 'iLave',
    description: 'Led the product team for this Dual-market mobile app, connecting busy professionals with on-demand laundry pickup and delivery services, streamlining the user experience from scheduling to payment.',
    category: 'product-design',
    roles: ['product-design'],
    verticals: [],
    image: iLaveImage,
    metrics: [
      { label: 'User Adoption', value: '300%', color: 'text-primary' },
      { label: 'Market Penetration', value: '85%', color: 'text-chart-2' }
    ],
    tags: ['Fintech', 'German Market', 'Banking UX'],
    canonicalTags: []
  },
  {
    id: 'subscriptex',
    title: 'Subscriptex',
    description: 'A comprehensive subscription management system with advanced analytics and user experience optimization for the German financial sector.',
    category: 'product-design',
    roles: ['product-design'],
    verticals: [],
    image: subscriptexImage,
    metrics: [
      { label: 'Subscription Growth', value: '156%', color: 'text-chart-4' },
      { label: 'Churn Reduction', value: '43%', color: 'text-chart-2' }
    ],
    tags: ['Design System', 'German Market', 'Financial UX'],
    canonicalTags: []
  },
  {
    id: 'wechore',
    title: 'WeChore',
    description: 'A modern task management platform designed to streamline household responsibilities, school homework, and assignments through intuitive design and smart automation for families and students.',
    category: 'product-design',
    roles: ['product-design'],
    verticals: [],
    image: weChoreImage,
    metrics: [
      { label: 'Task Completion', value: '92%', color: 'text-chart-3' },
      { label: 'User Retention', value: '78%', color: 'text-primary' }
    ],
    tags: ['Task Management', 'Education', 'Family Productivity'],
    canonicalTags: ['accessibility']
  },
  {
    id: 'providence-school-system',
    title: 'Providence School System',
    description: 'Comprehensive strategic planning and brand development for Providence School Department, including magnet program branding, mission-driven materials, and strategic frameworks to support educational excellence and community engagement across the entire school system.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
    image: providenceSystemCoverImage,
    slideshow: [
      providenceSystemOldCoverImage,
      providenceSystemFullSpreadImage,
      providenceSystemMissionImage,
      providenceSystemVisionImage,
      providenceSystemObjectivesImage,
      providenceSchoolsCoverImage,
      providenceSchoolsBrochureImage
    ],
    metrics: [
      { label: 'Strategic Frameworks', value: '5+', color: 'text-chart-1' },
      { label: 'Educational Programs', value: '12+', color: 'text-primary' }
    ],
    tags: ['Educational Strategy', 'Strategic Planning', 'Magnet Schools', 'Community Engagement', 'School Systems'],
    canonicalTags: ['public-service']
  },
  {
    id: 'abc6-rebrand-alexis-design',
    title: 'WLNE-ABC6',
    description: 'Company-wide brand transformation for ABC6 News under Alexis Design, working directly with the marketing director to redesign everything from studio backdrops to mic holders and outdoor advertising.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: [],
    image: abc6CoverImage,
    slideshow: [
      abc6SeinfeldImage,
      abc6RosieImage
    ],
    metrics: [
      { label: 'Brand Touchpoints', value: '100+', color: 'text-chart-1' },
      { label: 'Complete Transformation', value: '100%', color: 'text-primary' }
    ],
    tags: ['Television Branding', 'Studio Design', 'Outdoor Advertising', 'Alexis Design'],
    canonicalTags: []
  },
  {
    id: 'ttools-alexis-design',
    title: 'TTools',
    description: 'Complete brand identity and product licensing system created under Alexis Design for stylus technology products, successfully sold to Fellows Office Products at Staples.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: [],
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
    tags: ['Brand Identity', 'Product Licensing', 'Retail Partnership', 'Alexis Design'],
    canonicalTags: []
  },
  {
    id: 'ri-convention-center',
    title: 'RI Convention Center Authority',
    description: 'Professional brochure design for Rhode Island Convention Center Authority featuring sophisticated architectural photography and premium hospitality branding.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
    image: riConventionCenterImage,
    slideshow: [
      riConventionCenterImage,
      riConventionInteriorImage,
      riConventionReportImage
    ],
    metrics: [
      { label: 'Professional Branding', value: '100%', color: 'text-chart-1' },
      { label: 'Hospitality Focus', value: '95%', color: 'text-primary' }
    ],
    tags: ['Hospitality Branding', 'Convention Marketing', 'Architectural Photography', 'Tourism Promotion'],
    canonicalTags: ['govtech']
  },
  {
    id: 'jwu-branding',
    title: 'Johnson & Wales University',
    description: 'Comprehensive university brand development including capital campaign materials, mission statement design, core values communication, and strategic marketing collateral.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
    image: jwuBrandingImage,
    metrics: [
      { label: 'University Branding', value: '100%', color: 'text-chart-1' },
      { label: 'Strategic Messaging', value: '95%', color: 'text-primary' }
    ],
    tags: ['University Branding', 'Higher Education', 'Capital Campaign', 'Strategic Communications'],
    canonicalTags: []
  },
  {
    id: 'tf-green-gala',
    title: 'T.F. Green Airport Gala Invitation',
    description: 'Elegant event branding and invitation design for TF Green Airport\'s Grand Opening Gala, featuring sophisticated passport-themed materials and premium event presentation.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
    image: tfGreenGalaImage,
    metrics: [
      { label: 'Premium Event Design', value: '100%', color: 'text-chart-1' },
      { label: 'Aviation Theme Integration', value: '95%', color: 'text-primary' }
    ],
    tags: ['Event Design', 'Aviation Branding', 'Premium Invitations', 'Gala Marketing'],
    canonicalTags: ['govtech']
  },
  {
    id: 'mallinckrodt-medical',
    title: 'Mallinckrodt Medical',
    description: 'Corporate communications and brand development during the Imcera merger and company split between Chemicals and Medical divisions. Worked directly with scientists on internal and external materials, supporting crisis communications and sales team initiatives.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
    image: mallinckrodtMedicalLogo,
    metrics: [
      { label: 'Corporate Rebrand', value: '100%', color: 'text-chart-1' },
      { label: 'Crisis Communications', value: 'Strategic', color: 'text-primary' }
    ],
    tags: ['Healthcare Branding', 'Corporate Communications', 'Crisis PR', 'Pharmaceutical'],
    canonicalTags: []
  },
  {
    id: 'health-wellness-expertise',
    title: 'NASM Personal Trainer',
    description: 'Certified Personal Trainer (CPT) and NASM Nutrition Coach with 23+ years dedicated to metabolic health. Certifications include AFAA Group Fitness, Les Mills BodyCOMBAT, TRX Sports Medicine, and YogaFit Level I-V. Voted Top 3 Best Personal Trainer in Mount Washington Valley.',
    category: 'brand-development',
    roles: ['brand-development'],
    verticals: ['healthcare'],
    image: outsideTvCoverImage,
    slideshow: [
      trxGroupImage,
      trxPlankImage,
      magazineArticleImage,
      trxRipImage
    ],
    award: 'Top Trainer Award',
    metrics: [
      { label: '23+', value: 'Years Experience', color: 'text-chart-1' },
      { label: '7+', value: 'Certifications', color: 'text-primary' }
    ],
    tags: ['Personal Training', 'Nutrition Coaching', 'Health Sciences', 'Fitness Instruction'],
    canonicalTags: ['award']
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
      className={`glass rounded-2xl overflow-hidden hover:glow-purple group transition-all duration-700 ${
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
          className={`w-full h-full ${project.image === mallinckrodtMedicalLogo ? 'object-contain p-8' : 'object-cover object-top'} group-hover:scale-105 transition-transform duration-500`}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          style={{
            ...(project.image === mallinckrodtMedicalLogo ? { backgroundColor: '#ffffff' } : {}),
            ...(disableParallax
              ? (project.image === riConventionCenterImage ? { objectPosition: 'center 35%' } : {})
              : {
                  transform: `translateY(${parallaxY * 0.1}px)`,
                  transition: 'transform 0.1s ease-out',
                  ...(project.image === riConventionCenterImage ? { objectPosition: 'center 35%' } : {})
                })
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
            <Badge 
              key={`${project.id}-tag-${tagIndex}`} 
              variant="outline" 
              className="text-xs"
            >
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
                <div className={`text-4xl font-bold mb-1 ${metric.color}`}>
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
  const { filters, setVertical } = usePortfolioFilters();

  const financeProjects = ['handshakr', 'wechore', 'stakeholder-invaders', 'ilave', 'subscriptex'];
  const healthcarePriority = ['fairgrounds-coffee', 'providence-school-system'];
  
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      if (filters.vertical !== 'all') {
        if (filters.vertical === 'finance') {
          if (!financeProjects.includes(project.id)) return false;
        } else if (filters.vertical === 'healthcare') {
          if (project.verticals.includes('healthcare')) return true;
          if (project.verticals.length === 0 && !financeProjects.includes(project.id)) return true;
          return false;
        } else {
          if (!project.verticals.includes(filters.vertical as Vertical)) return false;
        }
      }
      
      return true;
    });

    if (filters.vertical === 'finance') {
      return [...filtered].sort(
        (a, b) => financeProjects.indexOf(a.id) - financeProjects.indexOf(b.id)
      );
    }

    if (filters.vertical === 'healthcare') {
      const rank = (id: string) => {
        const i = healthcarePriority.indexOf(id);
        return i === -1 ? healthcarePriority.length : i;
      };
      return [...filtered].sort((a, b) => rank(a.id) - rank(b.id));
    }

    return [...filtered].sort((a, b) => {
      if (a.id === 'ca-innovation-award') return -1;
      if (b.id === 'ca-innovation-award') return 1;
      return 0;
    });
  }, [filters.vertical]);

  const openCaseStudy = useCallback((projectId: string) => {
    trackEvent('case_study_viewed', 'portfolio', projectId);
    const event = new CustomEvent('openCaseStudy', { detail: { projectId } });
    window.dispatchEvent(event);
  }, []);

  return (
    <section id="work" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="gradient-text">Product, Design & Strategy</span>
          </h2>

          {/* Industry Filter (pills) */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              {availableVerticals.map((vertical) => {
                const isActive = filters.vertical === vertical;
                return (
                  <button
                    key={vertical}
                    onClick={() => setVertical(vertical)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                    data-testid={`vertical-filter-${vertical}`}
                  >
                    {verticalLabels[vertical]}
                  </button>
                );
              })}
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

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects match the current filters.</p>
            <button
              onClick={() => setVertical('all')}
              className="text-primary hover:underline text-sm"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}