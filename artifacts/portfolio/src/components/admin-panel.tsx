import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Globe, Briefcase } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


type Vertical = 'government' | 'healthcare' | 'finance' | 'education';

interface AdminSettings {
  companyName: string;
  jobType: 'PM' | 'Design' | 'Brand' | 'Auto';
  vertical: Vertical;
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
  const [jobType, setJobType] = useState<'PM' | 'Design' | 'Brand' | 'Auto'>('Auto');
  const [vertical, setVertical] = useState<Vertical>('government');
  const [isDetecting, setIsDetecting] = useState(false);

  // Load saved settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('alexis-portfolio-admin');
    if (saved) {
      const settings: AdminSettings = JSON.parse(saved);
      setJobUrl(settings.jobUrl || '');
      setCompanyName(settings.companyName || '');
      setJobType(settings.jobType || 'Auto');
      setVertical(settings.vertical || 'government');
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
      let detectedJobType: 'PM' | 'Design' | 'Brand' | 'Auto' = 'Auto';
      const urlLower = url.toLowerCase();

      if (urlLower.includes('product') && (urlLower.includes('manager') || urlLower.includes('management'))) {
        detectedJobType = 'PM';
      } else if (urlLower.includes('design') || urlLower.includes('ux') || urlLower.includes('ui')) {
        detectedJobType = 'Design';
      } else if (urlLower.includes('brand') || urlLower.includes('marketing') || urlLower.includes('communications')) {
        detectedJobType = 'Brand';
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
      vertical,
      jobUrl
    };

    // Generate custom URL with query parameters
    const params = new URLSearchParams();
    if (settings.companyName) params.set('company', settings.companyName);
    if (settings.jobType !== 'Auto') params.set('focus', settings.jobType.toLowerCase());
    if (settings.vertical !== 'government') params.set('vertical', settings.vertical);

    const customUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    // Copy URL to clipboard and offer to navigate
    navigator.clipboard.writeText(customUrl).then(() => {
      const navigate = confirm(`Custom portfolio URL copied to clipboard!\n\n${customUrl}\n\nClick OK to test this URL now, or Cancel to just copy it.`);
      if (navigate) {
        window.open(customUrl, '_blank');
      }
    }).catch(() => {
      // Fallback - show URL in alert
      const navigate = confirm(`Custom portfolio URL:\n\n${customUrl}\n\nPlease copy this URL manually.\n\nClick OK to test this URL now, or Cancel to just copy it.`);
      if (navigate) {
        window.open(customUrl, '_blank');
      }
    });

    onApply(settings);
    onClose();
  };

  const handleReset = () => {
    setJobUrl('');
    setCompanyName('');
    setJobType('Auto');
    setVertical('government');
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

        {/* Vertical Selection */}
        <div className="mt-6">
          <label className="text-sm font-medium mb-3 block">Industry Vertical (Default View)</label>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="vertical-government"
                name="vertical"
                value="government"
                checked={vertical === 'government'}
                onChange={() => setVertical('government')}
                className="w-4 h-4 text-primary border-2 border-primary/50 focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="vertical-government" className="text-sm cursor-pointer">Government</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="vertical-finance"
                name="vertical"
                value="finance"
                checked={vertical === 'finance'}
                onChange={() => setVertical('finance')}
                className="w-4 h-4 text-primary border-2 border-primary/50 focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="vertical-finance" className="text-sm cursor-pointer">Productivity</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="vertical-healthcare"
                name="vertical"
                value="healthcare"
                checked={vertical === 'healthcare'}
                onChange={() => setVertical('healthcare')}
                className="w-4 h-4 text-primary border-2 border-primary/50 focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="vertical-healthcare" className="text-sm cursor-pointer">Brand Dev</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="vertical-education"
                name="vertical"
                value="education"
                checked={vertical === 'education'}
                onChange={() => setVertical('education')}
                className="w-4 h-4 text-primary border-2 border-primary/50 focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="vertical-education" className="text-sm cursor-pointer">Education</label>
            </div>
          </div>
        </div>

        {/* Job Type Selection (Role) */}
        <div className="mt-6">
          <label className="text-sm font-medium mb-3 block">Role Focus (By Role View)</label>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="pm"
                name="jobType"
                value="PM"
                checked={jobType === 'PM'}
                onChange={(e) => setJobType('PM')}
                className="w-4 h-4 text-primary border-2 border-primary/50 focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="pm" className="text-sm cursor-pointer">Product Management</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="design"
                name="jobType"
                value="Design"
                checked={jobType === 'Design'}
                onChange={(e) => setJobType('Design')}
                className="w-4 h-4 text-primary border-2 border-primary/50 focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="design" className="text-sm cursor-pointer">UX/UI Design</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="brand"
                name="jobType"
                value="Brand"
                checked={jobType === 'Brand'}
                onChange={(e) => setJobType('Brand')}
                className="w-4 h-4 text-primary border-2 border-primary/50 focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="brand" className="text-sm cursor-pointer">Brand Development</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="auto"
                name="jobType"
                value="Auto"
                checked={jobType === 'Auto'}
                onChange={(e) => setJobType('Auto')}
                className="w-4 h-4 text-primary border-2 border-primary/50 focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="auto" className="text-sm cursor-pointer">Default (PM)</label>
            </div>
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
              Preview: "Hi <strong>{companyName}</strong>, I'm Alexis" • 
              Vertical: <strong>{vertical === 'government' ? 'Government' :
                              vertical === 'finance' ? 'Productivity' :
                              vertical === 'healthcare' ? 'Brand Dev' : 'Education'}</strong> • 
              Role: <strong>{jobType === 'Auto' ? 'Product Management' : 
                              jobType === 'PM' ? 'Product Management' : 
                              jobType === 'Design' ? 'Product Design' : 'Brand Development'}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}