import { useState, useEffect } from "react";
import { X, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import engageOnboardingVideo from "@assets/Engage_Onboarding_1_1754580372224.mp4";
import engageRoadmapImage from "@assets/Engage Roadmap_1754580703265.png";
import engageInterviewsImage from "@assets/02.02—interviews_1754580788428.png";
import iLaveImage from "@assets/!-Lave group Alt_1754580875717.png";
import driverOnboardingVideo from "@assets/▶ Driver 1st Iteration - onboarding_1754581040697.mp4";
import weChoreImage from "@assets/WeChore Diagonal_1754581130624.png";
import weChoreUsabilityVideo from "@assets/▶ Usability Test 3 - WeChore Branding_1754581219835.mp4";
import subscriptexImage from "@assets/Subscriptex Layers_1754581352868.png";
import subscriptexVideo from "@assets/▶ Final Iteration - subscriptex design system_1754581362306.mp4";

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
  image: string;
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
  closeouts: {
    id: 'closeouts',
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
    video: engageOnboardingVideo,
    award: '2023 California Government Technology Innovation Award for Public Service'
  },
  lave: {
    id: 'lave',
    title: '!-Lave Laundry Service App',
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
    description: 'Mobile subscription management app designed for German market expansion, featuring secure financial tracking and multilingual UX research.',
    overview: 'Design a mobile-friendly app from an existing desktop website helping consumers manage their subscriptions, expanding into the German market with culturally-adapted UX patterns.',
    challenge: 'Create a trusted mobile experience that helps users feel safe providing financial information while managing recurring subscriptions, with specific adaptation for German market preferences.',
    role: 'Complete product redesign including brand development, design system creation, user research validation, and German market adaptation with native speaker testing.',
    timeline: '8 weeks',
    team: ['Product Manager (Research Provider)', 'German Accountant (Cultural Consultant)', 'UX Designer (Solo)'],
    tools: ['Figma', 'FigJam', 'Figma Mirror', 'Adobe Illustrator', 'Google Suite', 'Galaxy S21 Ultra', 'Loom'],
    process: [
      'Analyzed existing desktop wireframes and user research data',
      'Conducted competitive analysis of TrueBill, Tilla, and Subby apps',
      'Developed brand identity and comprehensive design system',
      'Created user flows and mobile-optimized information architecture',
      'Designed three prototype iterations with progressive fidelity',
      'Conducted usability testing including German market validation',
      'Refined design based on cultural preferences and accessibility needs'
    ],
    outcomes: [
      'Complete mobile app design system with German market adaptation',
      'Culturally-validated user experience reducing financial anxiety',
      'Streamlined subscription input via payment information integration',
      'Direct website navigation for cancellations (German preference)',
      'Accessibility-focused navigation with larger touch targets',
      'Multi-iteration testing validation with native German speaker'
    ],
    keyInsights: [
      'Germans prefer direct website navigation over customer service for cancellations',
      'Word "Alert" translates better than "Notification" in German context',
      'Red/orange colors create urgency anxiety around financial numbers',
      'Trust-building requires transparent, non-monetized app experience',
      'Cultural consultation essential for international market expansion'
    ],
    image: subscriptexImage,
    video: subscriptexVideo
  }
};

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
          {/* Hero Image/Video */}
          <div className="aspect-video rounded-xl overflow-hidden">
            {caseStudy.video ? (
              <video 
                src={caseStudy.video} 
                className="w-full h-full object-cover"
                controls
                poster={caseStudy.image}
              />
            ) : (
              <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-full object-cover" />
            )}
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
