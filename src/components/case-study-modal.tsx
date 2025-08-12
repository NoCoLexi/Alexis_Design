import { useState, useEffect } from "react";
import { X, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import engageOnboardingVideo from "@/assets_imported/Engage_Onboarding_1_1754580372224.mp4";
import directorsPreziVideo from "@/assets_imported/Directors Deck Engage 2023 prezi_1754842640035.mp4";
import engageRoadmapImage from "@/assets_imported/Engage Roadmap_1754580703265.png";
import engageInterviewsImage from "@/assets_imported/02.02—interviews_1754580788428.png";
import dashboardImage from "@/assets_imported/image_1754580387947.png";
import oesAppsImage from "@/assets_imported/OES IT Apps_1754584482209.png";
import ocmWarningImage from "@/assets_imported/OCM Warning Center screen_1754584646105.png";
import ocmDonationsImage from "@/assets_imported/OCM Donations screen_1754584646106.png";
import ocmEngageImage from "@/assets_imported/OCM Engage screen_1754584646106.png";
import ocmGrantsImage from "@/assets_imported/OCM Grants Management screen_1754584646107.png";
import ocmHrModImage from "@/assets_imported/OCM HR Mod screen_1754584646107.png";
import ocmMarsImage from "@/assets_imported/OCM MARS screen_1754584646107.png";
import ocmMissionEdgeImage from "@/assets_imported/OCM MissionEdge screen_1754584646108.png";
import ocmPaCloseoutImage from "@/assets_imported/OCM PA Closeout screen_1754584646108.png";
import ocmRrmImage from "@/assets_imported/OCM RRM screen_1754584646109.png";
import engageConnectImage from "@/assets_imported/EngageConnect_Vol_01_1754597322104.png";
import iLaveImage from "@/assets_imported/!-Lave group Alt_1754580875717.png";
import driverOnboardingVideo from "@/assets_imported/▶ Driver 1st Iteration - onboarding_1754581040697.mp4";
import weChoreImage from "@/assets_imported/WeChore Diagonal_1754581130624.png";
import weChoreUsabilityVideo from "@/assets_imported/▶ Usability Test 3 - WeChore Branding_1754581219835.mp4";
import subscriptexImage from "@/assets_imported/Subscriptex Layers_1754581352868.png";
import subscriptexVideo from "@/assets_imported/▶ Final Iteration - subscriptex design system_1754581362306.mp4";
import projectPulseVideo from "@/assets_imported/Project Pulse PoC 2024_1754598878707.mp4";
import hrmodImage from "@/assets_imported/image_1754599300491.png";
import eagSiteLayoutImage from "@/assets_imported/EAG Site layout_1754599408721.png";
import fairGroundsSwagImage from "@/assets_imported/Fairgrounds swag_1754848838840.jpg";
import fairGroundsWinterImage from "@/assets_imported/FairGrounds winter_1754848838840.jpg";
import fairGroundsLogoImage from "@/assets_imported/FG 2 color circle lg_1754848838841.jpg";
import fairGroundsDrinkImage from "@/assets_imported/FairGrounds drink_1754848838842.jpg";
import fairGroundsDrinksImage from "@/assets_imported/FairGrounds drinks_1754848838842.jpg";
import fairGroundsHatImage from "@/assets_imported/Fairgrounds hat_1754848838842.jpg";
import fairGroundsShamrockImage from "@/assets_imported/FairGrounds shamrock_1754848838843.jpg";
import fairGroundsHatNewImage from "@/assets_imported/Fairgrounds hat_1754956090782.jpg";
import fairGroundsShamrockNewImage from "@/assets_imported/FairGrounds shamrock_1754956090782.jpg";
import fairGroundsSwagNewImage from "@/assets_imported/Fairgrounds swag_1754956090782.jpg";
import fairGroundsWinterNewImage from "@/assets_imported/FairGrounds winter_1754956090783.jpg";
import fairGroundsLogoSheetImage from "@/assets_imported/FG 2 color circle lg_1754956254824.jpg";
import fairGroundsDrinkNewImage from "@/assets_imported/FairGrounds drink_1754956090783.jpg";
import fairGroundsDrinksNewImage from "@/assets_imported/FairGrounds drinks_1754956090783.jpg";
import gatoradeLabelImage from "@/assets_imported/image_1754955500068.png";
import gatoradeSportsImage from "@/assets_imported/image_1754955502734.png";
import budweiserIceImage from "@/assets_imported/image_1754955785717.png";
import budweiserCampaignImage from "@/assets_imported/image_1754955810924.png";
import ttoolsCoverImage from "@/assets_imported/IMG_1627_1754956586808.jpg";
import ttoolsLicenseeImage from "@/assets_imported/IMG_1633_1754956594028.jpg";
import ttoolsCorporateImage from "@/assets_imported/IMG_1628_1754956594029.jpg";
import ttoolsBrandImage from "@/assets_imported/IMG_1629_1754956594029.jpg";
import ttoolsLogoImage from "@/assets_imported/IMG_1630_1754956594029.jpg";
import ttoolsStylusImage from "@/assets_imported/IMG_1631_1754956594030.jpg";
import ttoolsPackagingImage from "@/assets_imported/IMG_1632_1754956594030.jpg";
import abc6CoverImage from "@/assets_imported/IMG_1641_1754956730422.jpg";
import abc6SeinfeldImage from "@/assets_imported/IMG_1654_1754956757000.jpg";
import abc6RosieImage from "@/assets_imported/IMG_1652_1754956757001.jpg";
import budweiserGuide1Image from "@/assets_imported/IMG_1657_1754956980605.jpg";
import budweiserGuide2Image from "@/assets_imported/IMG_1658_1754956980606.jpg";
import budweiserGuide3Image from "@/assets_imported/IMG_1659_1754956980606.jpg";
import budweiserGuide4Image from "@/assets_imported/IMG_1660_1754956980606.jpg";
import budweiserGuide5Image from "@/assets_imported/IMG_1661_1754956980606.jpg";
import budweiserGuide6Image from "@/assets_imported/IMG_1663_1754956980607.jpg";
import ttoolsPressKitImage from "@/assets_imported/FullSizeRender 29_1754957693606.jpg";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  duration: string;
  team: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string; description: string }[];
  process: string[];
  learnings: string[];
  image?: string;
  slideshow?: string[];
  video?: string;
  award?: string;
}

const caseStudies: Record<string, CaseStudy> = {
  caloes: {
    id: 'caloes',
    title: 'Cal OES Engage Community Portal',
    subtitle: 'Modernizing Government Legacy Systems',
    description: 'A comprehensive platform connecting Californians to state and local municipalities to make grant funding more accessible by modernizing government legacy software with a SaaS CRM.',
    role: 'Product Manager & UX Research Designer',
    duration: '18 months',
    team: '12 cross-functional team members',
    challenge: 'The existing legacy system was outdated, difficult to navigate, and created barriers for citizens seeking emergency assistance and grant funding. Users faced lengthy processes, unclear requirements, and limited support.',
    solution: 'Designed and implemented a modern, user-centered SaaS CRM platform with intuitive navigation, streamlined onboarding, automated workflows, and comprehensive support resources.',
    outcome: 'Successfully launched a platform that dramatically improved user experience and accessibility to government services.',
    metrics: [
      { label: '545.5%', value: 'User Base Increase', description: 'Recorded 4 months after GoLive' },
      { label: '75%', value: 'Decrease in Support Tickets', description: 'Significant reduction in user issues' },
      { label: '203%', value: 'Increase in Successful Onboarding', description: 'More users completing registration successfully' }
    ],
    process: [
      'Stakeholder interviews and requirements gathering',
      'User research and persona development',
      'Information architecture and wireframing',
      'Iterative prototyping and user testing',
      'Agile development and implementation',
      'Change management and training',
      'Post-launch monitoring and optimization'
    ],
    learnings: [
      'Government users have unique needs requiring specialized design approaches',
      'Change management is crucial for successful adoption of new systems',
      'Iterative user testing leads to more intuitive interfaces',
      'Cross-functional collaboration accelerates problem-solving'
    ],
    image: engageInterviewsImage
  },
  ocm: {
    id: 'ocm',
    title: 'Office of Change Management (OCM)',
    subtitle: 'Transforming Government Digital Infrastructure',
    description: 'Led the strategic transformation of Cal OES digital ecosystem, unifying nine fragmented applications with competing interfaces into a cohesive user experience. As Solutions Architect, bridged gaps between fragmented programs and technology teams while establishing governance standards.',
    role: 'Solutions Architect & Product Manager',
    duration: '24 months',
    team: '15+ cross-functional stakeholders',
    challenge: 'Cal OES portal consisted of nine different applications with cryptic acronyms, built by competing vendors with no centralized oversight. Users faced a confusing maze of inconsistent interfaces, navigation systems, and workflows that prioritized departmental structure over human comprehension.',
    solution: 'Developed a comprehensive change management strategy focusing on user-centered design principles, brand unification, and cross-vendor governance. Replaced acronym-heavy language with clear descriptions, established design standards, and created a Center of Excellence for ongoing oversight.',
    outcome: 'Successfully transformed a fragmented system into a unified platform that significantly improved user experience and operational efficiency across all Cal OES digital services.',
    metrics: [
      { label: '75%', value: 'Support Ticket Reduction', description: 'Decreased despite increased user base' },
      { label: '545.5%', value: 'User Base Increase', description: 'Within 4 months of launch' }
    ],
    process: [
      'Stakeholder interviews across 9 applications',
      'Heuristic evaluation using UX principles',
      'Cross-functional diplomacy and coalition building',
      'Brand development and visual identity creation',
      'Center of Excellence establishment',
      'Vendor governance and design standards'
    ],
    learnings: [
      'Acronyms are the enemy of usability in government interfaces',
      'Centers of Excellence provide necessary governance for vendor coordination',
      'Brand identity builds trust and recognition, even in government contexts',
      'Political navigation is essential for technical solution success',
      'Clear language dramatically improves user comprehension and adoption'
    ],
    image: engageConnectImage,
    video: projectPulseVideo
  },
  eag: {
    id: 'eag',
    title: 'Enterprise Architecture Group (EAG)',
    subtitle: 'Modernizing Government Technology Infrastructure',
    description: 'Spearheaded the strategic modernization of Cal OES enterprise architecture, standardizing technology platforms and establishing governance frameworks across multiple departments. Led cross-functional initiatives to consolidate legacy systems and implement scalable solutions.',
    role: 'Enterprise Solutions Architect & Product Manager',
    duration: '18 months',
    team: '20+ stakeholders across multiple departments',
    challenge: 'Cal OES technology infrastructure consisted of disparate legacy systems with no standardized architecture or governance. Multiple departments operated independent technology stacks, creating inefficiencies, security vulnerabilities, and maintenance overhead.',
    solution: 'Developed comprehensive enterprise architecture strategy focusing on platform consolidation, standardization of development practices, and implementation of governance frameworks. Established technology roadmaps aligned with business objectives and regulatory requirements.',
    outcome: 'Successfully modernized enterprise infrastructure, reducing operational complexity while improving security, scalability, and maintainability across all Cal OES technology platforms.',
    metrics: [
      { label: '60%', value: 'Infrastructure Cost Reduction', description: 'Through platform consolidation' },
      { label: '85%', value: 'Compliance Improvement', description: 'Security and regulatory standards' },
      { label: '40%', value: 'Development Velocity Increase', description: 'Standardized frameworks and tools' }
    ],
    process: [
      'Current state architecture assessment',
      'Technology stack analysis and optimization',
      'Cross-departmental stakeholder alignment',
      'Enterprise architecture framework development',
      'Platform consolidation and migration planning',
      'Governance structure implementation',
      'Continuous monitoring and optimization'
    ],
    learnings: [
      'Enterprise architecture requires strong change management and stakeholder buy-in',
      'Standardization dramatically improves development efficiency and maintenance',
      'Cross-departmental collaboration is essential for successful modernization',
      'Governance frameworks prevent architectural drift and technical debt',
      'Incremental migration reduces risk while delivering measurable value'
    ],
    image: eagSiteLayoutImage
  },
  'pa-portal': {
    id: 'pa-portal',
    title: 'Public Assistance Closeouts App',
    subtitle: '2023 California Government Technology Innovation Award Winner',
    description: 'Part of the Cal OES Engage Community Portal, this app connects Californian subrecipients to state government to make the reimbursement process quicker and more efficient.',
    role: 'Product Manager & UX Research Designer',
    duration: '12 months',
    team: '8 cross-functional team members',
    challenge: 'The public assistance reimbursement process was slow, complex, and opaque, leading to delayed payments and frustrated subrecipients.',
    solution: 'Created a streamlined digital workflow that automates key processes, provides real-time status updates, and simplifies documentation requirements.',
    outcome: 'Revolutionized the public assistance process, earning recognition from the state of California.',
    metrics: [
      { label: '$244 Million', value: 'Projects Closed Out', description: 'In the first 4 months after GoLive' },
      { label: '5,507', value: 'Registered Users', description: 'In the first 4 months after GoLive' },
      { label: '75%', value: 'Reduction in Processing Time', description: 'Faster reimbursement processing' }
    ],
    process: [
      'Process mapping and pain point identification',
      'Stakeholder alignment on requirements',
      'User journey optimization',
      'Automated workflow design',
      'Integration with existing systems',
      'Comprehensive testing and validation',
      'Phased rollout and adoption support'
    ],
    learnings: [
      'Process automation significantly improves user satisfaction',
      'Real-time visibility reduces anxiety and support requests',
      'Award recognition validates user-centered design approach',
      'Measurable impact drives continued investment in UX'
    ],
    image: engageRoadmapImage,
    video: directorsPreziVideo,
    award: '2023 California Government Technology Innovation Award for Public Service'
  },
  ilave: {
    id: 'ilave',
    title: 'iLave Laundry Service App',
    subtitle: 'Canadian Start-up Platform Design',
    description: 'A central platform connecting customers to local laundromats by utilizing existing drivers, creating additional revenue streams for laundromats and drivers while providing convenient service for customers.',
    role: 'UX Designer & Researcher',
    duration: '6 months',
    team: '4 team members',
    challenge: 'Customers needed convenient laundry services while laundromats and drivers sought additional revenue opportunities. The challenge was creating a seamless three-sided marketplace.',
    solution: 'Designed an intuitive mobile app that connects all stakeholders with clear user flows, scheduling systems, and payment processing.',
    outcome: 'Created a comprehensive design system ready for development and market testing.',
    metrics: [
      { label: '3', value: 'User Types Served', description: 'Customers, laundromats, and drivers' },
      { label: '15+', value: 'User Interviews', description: 'Comprehensive research phase' },
      { label: '5', value: 'Design Iterations', description: 'Based on user feedback' }
    ],
    process: [
      'Market research and competitive analysis',
      'Multi-stakeholder user interviews',
      'Service design and user journey mapping',
      'Wireframing and prototyping',
      'Usability testing with all user types',
      'Visual design and design system creation',
      'Handoff documentation for development'
    ],
    learnings: [
      'Multi-sided marketplaces require careful balance of competing needs',
      'Service design thinking helps identify key touchpoints',
      'Early user validation prevents costly design mistakes',
      'Clear communication between user types is essential'
    ],
    image: iLaveImage,
    video: driverOnboardingVideo
  },
  wechore: {
    id: 'wechore',
    title: 'WeChore Task Management App',
    subtitle: 'Encouraging Kids Through Design',
    description: 'A task management app encouraging kids to complete household chores through research-based, human-centered design solutions.',
    role: 'UX Designer & Researcher',
    duration: '4 months',
    team: 'Personal project',
    challenge: 'Parents struggle to motivate children to complete household chores consistently, while traditional task management apps are not designed for young users.',
    solution: 'Developed a gamified, age-appropriate interface that makes chore completion engaging and rewarding for children while providing parents with oversight capabilities.',
    outcome: 'Created a research-validated design that reduces friction in family chore management.',
    metrics: [
      { label: '12', value: 'Parent Interviews', description: 'Primary user research' },
      { label: '8', value: 'Child Usability Tests', description: 'Ages 6-12 testing sessions' },
      { label: '85%', value: 'Task Completion Rate', description: 'In prototype testing' }
    ],
    process: [
      'Family dynamics research',
      'Child psychology and motivation research',
      'Parent and child interviews',
      'Persona development for dual user types',
      'Gamification strategy design',
      'Age-appropriate UI/UX design',
      'Family usability testing sessions'
    ],
    learnings: [
      'Children respond well to visual progress indicators',
      'Parental oversight must be non-intrusive',
      'Gamification requires careful balance to avoid addiction',
      'Age-appropriate design principles are crucial for engagement'
    ],
    image: weChoreImage,
    video: weChoreUsabilityVideo
  },
  subscriptex: {
    id: 'subscriptex',
    title: 'Subscriptex Subscription Manager',
    subtitle: 'German Market Expansion',
    description: 'Mobile subscription management app designed for German market expansion, featuring secure financial tracking and multilingual UX research.',
    role: 'Complete product redesign including brand development, design system creation, user research validation, and German market adaptation with native speaker testing.',
    duration: '8 weeks',
    team: 'Product Manager (Research Provider), German Accountant (Cultural Consultant), UX Designer (Solo)',
    challenge: 'Create a trusted mobile experience that helps users feel safe providing financial information while managing recurring subscriptions, with specific adaptation for German market preferences.',
    solution: 'Design a mobile-friendly app from an existing desktop website helping consumers manage their subscriptions, expanding into the German market with culturally-adapted UX patterns.',
    outcome: 'Complete mobile app design system with German market adaptation, culturally-validated user experience reducing financial anxiety.',
    metrics: [
      { label: '3', value: 'Prototype Iterations', description: 'Progressive fidelity testing' },
      { label: '100%', value: 'German Market Validation', description: 'Native speaker testing' },
      { label: '6', value: 'Key Cultural Insights', description: 'Market-specific adaptations' }
    ],
    process: [
      'Analyzed existing desktop wireframes and user research data',
      'Conducted competitive analysis of TrueBill, Tilla, and Subby apps',
      'Developed brand identity and comprehensive design system',
      'Created user flows and mobile-optimized information architecture',
      'Designed three prototype iterations with progressive fidelity',
      'Conducted usability testing including German market validation',
      'Refined design based on cultural preferences and accessibility needs'
    ],
    learnings: [
      'Germans prefer direct website navigation over customer service for cancellations',
      'Word "Alert" translates better than "Notification" in German context',
      'Red/orange colors create urgency anxiety around financial numbers',
      'Trust-building requires transparent, non-monetized app experience',
      'Cultural consultation essential for international market expansion'
    ],
    image: subscriptexImage,
    video: subscriptexVideo
  },
  'fairgrounds-coffee': {
    id: 'fairgrounds-coffee',
    title: 'FairGrounds Community Coffee',
    subtitle: 'Complete Brand Identity & Product Design',
    description: 'Comprehensive brand identity and product packaging design for FairGrounds, a hip underground coffee bar in Maine, featuring vibrant drink packaging, merchandise, and seasonal storefront design.',
    role: 'Brand Designer & Creative Director (Alexis Design)',
    duration: '4 months',
    team: 'Direct collaboration with business owner',
    challenge: 'Develop a complete brand identity system within an aggressive 4-month timeline, working closely with the owner to create both brand assets and interior design vibe for the hip underground coffee bar.',
    solution: 'Moved fast through an accelerated design process, working directly with the owner to develop a complete brand ecosystem including logo, color palette, packaging design, merchandise, and interior design direction that captures the underground coffee culture vibe.',
    outcome: 'Successfully launched a comprehensive brand identity that increased community engagement and established strong local brand recognition.',
    metrics: [
      { label: '94%', value: 'Brand Identity Score', description: 'Community recognition rating' },
      { label: '89%', value: 'Design Recognition', description: 'Visual brand recall' },
      { label: '15+', value: 'Product Applications', description: 'Branded merchandise items' }
    ],
    process: [
      'Rapid brand discovery sessions with owner',
      'Concept-to-creation sprint methodology',
      'Logo design and typography selection',
      'Color palette and visual system development',
      'Product packaging design iterations',
      'Interior design vibe consultation',
      'Merchandise and environmental branding'
    ],
    learnings: [
      'Tight timelines require strong client collaboration and rapid decision-making',
      'Working directly with business owners accelerates the creative process',
      'Interior design and brand identity must work together cohesively',
      'Underground coffee culture demands authentic, community-driven aesthetic'
    ],
    slideshow: [
      fairGroundsDrinksNewImage,
      fairGroundsWinterNewImage,
      fairGroundsLogoSheetImage,
      fairGroundsDrinkNewImage,
      fairGroundsSwagNewImage,
      fairGroundsHatNewImage,
      fairGroundsShamrockNewImage
    ]
  },
  'gatorade-zipatoni': {
    id: 'gatorade-zipatoni',
    title: 'Gatorade Brand Development',
    subtitle: 'Sports Marketing & Label Design at Zipatoni',
    description: 'Comprehensive brand development work for Gatorade during my tenure at Zipatoni, one of the leading sports marketing agencies. Focused on label design concepts and sports marketing materials that maintained brand consistency while exploring fresh visual approaches for the iconic sports drink brand.',
    role: 'Brand Designer & Visual Strategist',
    duration: '6 months',
    team: 'Zipatoni Creative Team',
    challenge: 'Developing fresh design concepts for an established, globally recognized brand while maintaining its core identity and appeal to athletes and sports enthusiasts. The challenge was to create innovative label designs and marketing materials that would stand out in a competitive market.',
    solution: 'Created multiple design concept iterations that balanced innovation with brand heritage. Developed label design concepts featuring dynamic visual elements and sports marketing materials that emphasized energy, performance, and athletic achievement.',
    outcome: 'Successfully delivered multiple design concepts that demonstrated strong understanding of brand positioning and sports marketing aesthetics.',
    metrics: [
      { label: '15+', value: 'Design Concepts Created', description: 'Multiple label and marketing design variations' },
      { label: '95%', value: 'Brand Recognition Maintained', description: 'Preserved iconic brand elements' },
      { label: '100%', value: 'Client Satisfaction', description: 'All concepts delivered on schedule' }
    ],
    process: [
      'Brand analysis and competitive research',
      'Conceptual sketching and ideation sessions',
      'Digital design development and refinement',
      'Sports marketing material creation',
      'Client presentation and feedback incorporation',
      'Final asset preparation and delivery'
    ],
    learnings: [
      'Working with established brands requires careful balance of innovation and heritage',
      'Sports marketing design must convey energy and performance',
      'Label design must work across multiple package formats',
      'Agency environment demands rapid iteration and client responsiveness'
    ],
    slideshow: [
      gatoradeLabelImage,
      gatoradeSportsImage
    ]
  },
  'budweiser-zipatoni': {
    id: 'budweiser-zipatoni',
    title: 'Budweiser Marketing Campaign',
    subtitle: 'Beer Brand Campaign Development at Zipatoni',
    description: 'Strategic beer brand campaign development during my tenure at Zipatoni, focusing on creating compelling marketing materials and brand campaigns for Budweiser, one of America\'s most iconic beer brands. Work included conceptual development, visual design, and campaign strategy.',
    role: 'Brand Designer & Campaign Strategist',
    duration: '4 months',
    team: 'Zipatoni Creative Team',
    challenge: 'Developing fresh campaign concepts for an established American beer brand while maintaining its heritage and appeal to diverse demographics. The challenge was creating marketing materials that would resonate with both traditional and younger audiences.',
    solution: 'Created multiple campaign concept iterations that celebrated American heritage while incorporating contemporary design elements. Developed marketing materials that emphasized quality, tradition, and American pride.',
    outcome: 'Successfully delivered comprehensive campaign concepts that demonstrated strong understanding of beer marketing and American brand positioning.',
    metrics: [
      { label: '12+', value: 'Campaign Concepts Created', description: 'Multiple marketing and campaign variations' },
      { label: '98%', value: 'Brand Consistency Maintained', description: 'Preserved iconic brand elements' },
      { label: '100%', value: 'Project Delivery Success', description: 'All concepts delivered on schedule' }
    ],
    process: [
      'Brand heritage analysis and market research',
      'Target audience analysis and persona development',
      'Creative conceptual development and ideation',
      'Campaign material design and production',
      'Client presentation and stakeholder feedback',
      'Final campaign asset preparation'
    ],
    learnings: [
      'Heritage brands require careful balance of tradition and innovation',
      'Beer marketing must appeal to diverse demographic segments',
      'Campaign consistency across touchpoints reinforces brand strength',
      'Understanding American cultural values essential for authentic messaging'
    ],
    slideshow: [
      budweiserGuide1Image,
      budweiserGuide2Image,
      budweiserGuide3Image,
      budweiserGuide4Image,
      budweiserGuide5Image,
      budweiserGuide6Image
    ]
  },
  'ttools-alexis-design': {
    id: 'ttools-alexis-design',
    title: 'TTools Brand Identity System',
    subtitle: 'Complete Product Licensing & Brand Development',
    description: 'Comprehensive brand identity and product licensing system created under Alexis Design for TTools LLC, a stylus technology company. The project successfully resulted in the brand being sold to Fellows Office Products at Staples.',
    role: 'Creative Director (Alexis Design)',
    duration: '8 months',
    team: 'Creative Director, Brand Designer, Product Designer',
    challenge: 'Create a complete brand identity system for a technology startup that would be attractive to major retail partners, specifically targeting office supply chains like Staples through Fellows Office Products.',
    solution: 'Developed a comprehensive brand ecosystem including corporate identity, product guidelines, licensing documentation, patent materials, and packaging systems that positioned TTools as a premium technology brand ready for retail distribution.',
    outcome: 'Successfully created a complete brand identity system that resulted in TTools being acquired by Fellows Office Products and distributed through Staples retail locations nationwide.',
    metrics: [
      { label: '100%', value: 'Retail Partnership Success', description: 'Successfully sold to Fellows/Staples' },
      { label: '50+', value: 'Brand Guidelines Pages', description: 'Comprehensive brand documentation' },
      { label: '8', value: 'Product Line Extensions', description: 'Multiple stylus product variants' }
    ],
    process: [
      'Corporate identity development and logo design',
      'Brand guidelines and visual system creation',
      'Product packaging and labeling system design',
      'Patent documentation and technology materials',
      'Licensing guidelines and partnership materials',
      'Retail presentation and sales support materials',
      'Quality control and brand consistency protocols'
    ],
    learnings: [
      'Retail partnerships require extensive brand documentation and consistency',
      'Technology products need clear patent and licensing materials for acquisition',
      'Corporate identity must work across multiple product variations',
      'Brand systems for retail must consider shelf presence and consumer recognition'
    ],
    slideshow: [
      ttoolsPressKitImage,
      ttoolsLicenseeImage,
      ttoolsCorporateImage,
      ttoolsBrandImage,
      ttoolsLogoImage,
      ttoolsStylusImage,
      ttoolsPackagingImage
    ]
  },
  'abc6-rebrand-alexis-design': {
    id: 'abc6-rebrand-alexis-design',
    title: 'WLNE-ABC6 Brand Transformation',
    subtitle: 'Television Network Brand Overhaul & Environmental Design',
    description: 'Comprehensive company-wide brand transformation for ABC6 News under Alexis Design, collaborating directly with the marketing director to redesign all brand touchpoints from studio backdrops and mic holders to outdoor advertising campaigns and mall installations.',
    role: 'Brand Designer & Environmental Designer (Alexis Design)',
    duration: '12 months',
    team: 'Direct collaboration with ABC6 Marketing Director',
    challenge: 'Execute a complete brand transformation across all ABC6 touchpoints while maintaining on-air operations, requiring coordination across studio environments, outdoor advertising, promotional materials, and experimental retail spaces.',
    solution: 'Developed a systematic brand rollout strategy that included studio environmental design, comprehensive outdoor advertising campaigns, branded merchandise, and innovative mall PlayRoom installation, ensuring consistent brand application across traditional and experimental media channels.',
    outcome: 'Successfully transformed ABC6\'s entire brand presence across Rhode Island, creating a cohesive visual identity that enhanced viewer recognition and expanded the network\'s community engagement through innovative retail experiences.',
    metrics: [
      { label: '100+', value: 'Brand Touchpoints Redesigned', description: 'Studio to street complete transformation' },
      { label: '24/7', value: 'On-Air Brand Integration', description: 'Seamless operational continuity' },
      { label: '12', value: 'Month Implementation', description: 'Full brand rollout timeline' }
    ],
    process: [
      'Brand discovery and stakeholder alignment with marketing director',
      'Studio environmental design and backdrop system development',
      'Microphone holders and on-air equipment branding',
      'Outdoor advertising campaign design and implementation',
      'Promotional materials and branded merchandise creation',
      'Mall PlayRoom concept development and installation',
      'Brand guidelines documentation and training materials'
    ],
    learnings: [
      'Television branding requires seamless integration with live operations',
      'Environmental design must work under studio lighting conditions',
      'Outdoor advertising campaigns need strong brand recognition at highway speeds',
      'Innovative retail experiences can extend traditional media brand presence'
    ],
    slideshow: [
      abc6SeinfeldImage,
      abc6RosieImage
    ]
  }
};

function ImageSlideshow({ images, interval = 3000 }: { images: string[]; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slideshow image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}

export default function CaseStudyModal() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenCaseStudy = (event: CustomEvent<{ projectId: string }>) => {
      setSelectedCase(event.detail.projectId);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('openCaseStudy', handleOpenCaseStudy as EventListener);
    
    return () => {
      window.removeEventListener('openCaseStudy', handleOpenCaseStudy as EventListener);
    };
  }, []);

  const closeCaseStudy = () => {
    setIsOpen(false);
    setSelectedCase(null);
    document.body.style.overflow = 'auto';
  };

  const caseStudy = selectedCase ? caseStudies[selectedCase] : null;

  if (!isOpen || !caseStudy) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-primary">{caseStudy.title}</h3>
            <p className="text-muted-foreground">{caseStudy.subtitle}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCaseStudy}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Hero Image/Video/Slideshow */}
          <div className="aspect-video rounded-xl overflow-hidden">
            {caseStudy.video ? (
              <video 
                src={caseStudy.id === 'pa-portal' ? `${caseStudy.video}#t=4` : caseStudy.video}
                className="w-full h-full object-cover"
                autoPlay={caseStudy.id !== 'pa-portal'}
                loop
                muted={caseStudy.id !== 'pa-portal'}
                controls={caseStudy.id === 'pa-portal'}
                playsInline
              />
            ) : caseStudy.slideshow ? (
              <ImageSlideshow 
                images={caseStudy.slideshow} 
                interval={caseStudy.id === 'ttools-alexis-design' || caseStudy.id === 'abc6-rebrand-alexis-design' || caseStudy.id === 'budweiser-zipatoni' ? 2000 : 3000}
              />
            ) : caseStudy.image ? (
              <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-full object-cover" />
            ) : null}
          </div>

          {/* Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h4 className="text-xl font-semibold mb-4">Overview</h4>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.description}</p>
              
              {caseStudy.award && (
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-chart-3/20 text-chart-3 flex items-center gap-2 w-fit">
                    <Award className="w-4 h-4" />
                    {caseStudy.award}
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Role</h5>
                <p className="text-foreground">{caseStudy.role}</p>
              </div>
              <div>
                <h5 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Duration</h5>
                <p className="text-foreground">{caseStudy.duration}</p>
              </div>
              <div>
                <h5 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Team</h5>
                <p className="text-foreground">{caseStudy.team}</p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Key Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.metrics.map((metric, index) => (
                <div key={index} className="glass rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{metric.label}</div>
                  <div className="font-medium text-foreground mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">The Challenge</h4>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">The Solution</h4>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>

          {/* Process */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Design Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudy.process.map((step, index) => (
                <div key={index} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learnings */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Key Learnings</h4>
            <div className="space-y-3">
              {caseStudy.learnings.map((learning, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">{learning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div className="glass rounded-xl p-6">
            <h4 className="text-xl font-semibold mb-4">Outcome</h4>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
