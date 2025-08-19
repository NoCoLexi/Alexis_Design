import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Globe, Briefcase } from 'lucide-react';

interface AdminSettings {
  companyName: string;
  jobType: 'PM' | 'Design' | 'Auto';
  jobUrl: string;
}

interface AdminPanelProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (settings: AdminSettings) => void;
}

export default function AdminPanel({ isVisible, onClose, onApply }: AdminPanelProps) {
  const [jobUrl, setJobUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState<'PM' | 'Design' | 'Auto'>('Auto');
  const [isDetecting, setIsDetecting] = useState(false);

  // Load saved settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('alexis-portfolio-admin');
    if (saved) {
      const settings: AdminSettings = JSON.parse(saved);
      setJobUrl(settings.jobUrl || '');
      setCompanyName(settings.companyName || '');
      setJobType(settings.jobType || 'Auto');
    }
  }, []);

  const detectFromUrl = async (url: string) => {
    if (!url) return;
    
    setIsDetecting(true);
    try {
      // Extract domain for company name detection
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      
      // Simple company name extraction from common job board patterns
      let detectedCompany = '';
      
      if (domain.includes('lever.co')) {
        // Lever: company.lever.co
        detectedCompany = domain.split('.')[0];
      } else if (domain.includes('greenhouse.io')) {
        // Greenhouse: company.greenhouse.io or boards.greenhouse.io/company
        if (domain.startsWith('boards.')) {
          const pathParts = urlObj.pathname.split('/');
          detectedCompany = pathParts[1] || '';
        } else {
          detectedCompany = domain.split('.')[0];
        }
      } else if (domain.includes('workday.com')) {
        // Workday: company.wd1.myworkdayjobs.com
        const subdomain = domain.split('.')[0];
        if (subdomain !== 'wd1' && subdomain !== 'myworkdayjobs') {
          detectedCompany = subdomain;
        }
      } else if (domain.includes('jobs.')) {
        // jobs.company.com
        detectedCompany = domain.replace('jobs.', '').split('.')[0];
      } else if (domain.includes('careers.')) {
        // careers.company.com
        detectedCompany = domain.replace('careers.', '').split('.')[0];
      } else {
        // Default: use main domain
        detectedCompany = domain.split('.')[0];
      }
      
      // Capitalize company name
      detectedCompany = detectedCompany.charAt(0).toUpperCase() + detectedCompany.slice(1);
      
      // Simple job type detection from URL
      let detectedJobType: 'PM' | 'Design' | 'Auto' = 'Auto';
      const urlLower = url.toLowerCase();
      
      if (urlLower.includes('product') && (urlLower.includes('manager') || urlLower.includes('management'))) {
        detectedJobType = 'PM';
      } else if (urlLower.includes('design') || urlLower.includes('ux') || urlLower.includes('ui')) {
        detectedJobType = 'Design';
      }
      
      setCompanyName(detectedCompany);
      if (detectedJobType !== 'Auto') {
        setJobType(detectedJobType);
      }
      
    } catch (error) {
      console.warn('Could not parse URL:', error);
    }
    setIsDetecting(false);
  };

  const handleUrlChange = (value: string) => {
    setJobUrl(value);
    if (value.startsWith('http')) {
      detectFromUrl(value);
    }
  };

  const handleApply = () => {
    const settings: AdminSettings = {
      companyName: companyName.trim(),
      jobType,
      jobUrl
    };
    
    // Generate custom URL with query parameters
    const params = new URLSearchParams();
    if (settings.companyName) params.set('company', settings.companyName);
    if (settings.jobType !== 'Auto') params.set('focus', settings.jobType.toLowerCase());
    
    const customUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    // Copy URL to clipboard
    navigator.clipboard.writeText(customUrl).then(() => {
      alert(`Custom portfolio URL copied to clipboard!\n\n${customUrl}`);
    }).catch(() => {
      // Fallback - show URL in alert
      alert(`Custom portfolio URL:\n\n${customUrl}\n\nPlease copy this URL manually.`);
    });
    
    onClose();
  };

  const handleReset = () => {
    setJobUrl('');
    setCompanyName('');
    setJobType('Auto');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg transform transition-transform duration-300 ease-out">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Portfolio Customization</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="hover:bg-destructive/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job URL Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Job Posting URL
            </label>
            <Input
              type="url"
              placeholder="https://company.lever.co/job-posting"
              value={jobUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="w-full"
              data-testid="input-job-url"
            />
            {isDetecting && (
              <p className="text-xs text-muted-foreground">Detecting company...</p>
            )}
          </div>

          {/* Company Name Display */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Detected Company</label>
            <Input
              placeholder="Company name will appear here"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full"
              data-testid="input-company-name"
            />
          </div>
        </div>

        {/* Job Type Selection */}
        <div className="mt-6">
          <label className="text-sm font-medium mb-3 block">Job Type Focus</label>
          <div className="flex gap-4">
            {(['PM', 'Design', 'Auto'] as const).map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={jobType === type}
                  onChange={(e) => setJobType(e.target.value as 'PM' | 'Design' | 'Auto')}
                  className="w-4 h-4 text-primary focus:ring-primary"
                  data-testid={`radio-job-type-${type.toLowerCase()}`}
                />
                <span className="text-sm">
                  {type === 'PM' ? 'Product Management' : 
                   type === 'Design' ? 'UX/UI Design' : 
                   'Auto-detect'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <Button 
            onClick={handleApply}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-generate-url"
          >
            Generate Custom URL
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            data-testid="button-reset-changes"
          >
            Reset to Default
          </Button>
        </div>

        {companyName && (
          <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Preview: "Hey <strong>{companyName}</strong> hiring team" • 
              Focus: <strong>{jobType === 'Auto' ? 'Product Management (default)' : 
                              jobType === 'PM' ? 'Product Management' : 'UX/UI Design'}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}