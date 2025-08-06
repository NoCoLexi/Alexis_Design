import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'product-management' | 'product-design';
  image: string;
  metrics: { label: string; value: string; color: string }[];
  tags: string[];
  award?: string;
}

const projects: Project[] = [
  {
    id: 'caloes',
    title: 'Cal OES Engage Portal',
    description: 'Modernizing government legacy software with a SaaS CRM platform connecting Californians to state and local municipalities for accessible grant funding.',
    category: 'product-management',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
    metrics: [
      { label: 'User Base Increase', value: '545.5%', color: 'text-primary' },
      { label: 'Successful Onboarding', value: '203%', color: 'text-chart-2' }
    ],
    tags: ['Product Management', 'Government Tech', 'SaaS CRM']
  },
  {
    id: 'closeouts',
    title: 'PA Portal Closeouts App',
    description: 'Streamlining the reimbursement process for California subrecipients. Winner of the 2023 California Government Technology Innovation Award.',
    category: 'product-management',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
    metrics: [
      { label: 'Projects Closed', value: '$244M', color: 'text-chart-4' },
      { label: 'Registered Users', value: '5,507', color: 'text-chart-1' }
    ],
    tags: ['Product Management', 'Government Innovation', 'Process Optimization'],
    award: '2023 CA Gov Tech Innovation Award'
  },
  {
    id: 'lave',
    title: '!-Lave Laundry Service',
    description: 'Canadian start-up platform connecting customers to local laundromats through existing drivers, creating new revenue streams for multiple stakeholders.',
    category: 'product-design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
    metrics: [],
    tags: ['User Research', 'Mobile Design', 'Service Design']
  },
  {
    id: 'wechore',
    title: 'WeChore Task Management',
    description: 'Task management app encouraging kids to complete household chores through research-based, human-centered design solutions.',
    category: 'product-design',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
    metrics: [],
    tags: ['User Research', 'Child UX', 'Gamification']
  }
];

export default function FeaturedWork() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const openCaseStudy = (projectId: string) => {
    const event = new CustomEvent('openCaseStudy', { detail: { projectId } });
    window.dispatchEvent(event);
  };

  return (
    <section id="work" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Featured Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Driving innovation through product management and user-centered design
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="glass rounded-xl p-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'ghost'}
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'gradient-bg-primary' : ''}
            >
              All Projects
            </Button>
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
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass rounded-2xl overflow-hidden hover:glow-purple transition-all duration-500 group cursor-pointer"
              onClick={() => openCaseStudy(project.id)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-primary/80 text-primary-foreground">
                    {project.category === 'product-management' ? 'Product Management' : 'Product Design'}
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
                    {project.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
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
          ))}
        </div>
      </div>
    </section>
  );
}
