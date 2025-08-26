import { useState, useEffect } from "react";
import { X, Award, Calendar, MapPin, Trophy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";
import bestOfCaAwardsGraphic from "@assets/Best-of-CA-Awards-graphic2_1756172176096.jpg";

// Import CA Innovation Summit award images
import caGovTechAward1 from "@assets/CA Gov Tech Awards 2023_1754603816058.jpg";
import caGovTechAward2 from "@assets/CA Gov Tech Awards 2023_1754604147417.jpg";
import caGovTechAwardCopy from "@assets/CA Gov Tech Awards 2023 - Copy_1754965863645.jpg";

interface AwardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AwardModal({ isOpen, onClose }: AwardModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const awardImages = [
    { src: caGovTechAward1, alt: "California Innovation Summit 2023 - Award Ceremony" },
    { src: caGovTechAward2, alt: "California Innovation Summit 2023 - Recognition Event" },
    { src: caGovTechAwardCopy, alt: "California Innovation Summit 2023 - Award Documentation" }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      trackEvent('award_modal_opened', 'awards', 'ca_innovation_summit_2023');
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    trackEvent('award_modal_closed', 'awards', 'ca_innovation_summit_2023');
    onClose();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % awardImages.length);
    trackEvent('award_image_navigation', 'awards', `image_${currentImageIndex + 1}`);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + awardImages.length) % awardImages.length);
    trackEvent('award_image_navigation', 'awards', `image_${currentImageIndex - 1}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with enhanced blur effect */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
        data-testid="award-modal-backdrop"
      />
      
      {/* Modal Container */}
      <div className="relative bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto glass shadow-2xl">
        
        {/* Close Button */}
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          data-testid="button-close-award-modal"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
              <img src={bestOfCaAwardsGraphic} alt="Best of CA Awards" className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                2023 California Innovation Summit Award
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">
                  <Award className="w-4 h-4 mr-1" />
                  Government Technology Excellence
                </Badge>
                <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                  <Calendar className="w-4 h-4 mr-1" />
                  November 2023
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400/50">
                  <MapPin className="w-4 h-4 mr-1" />
                  Sacramento, CA
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="mb-8">
          <div className="relative">
            <img 
              src={awardImages[currentImageIndex].src}
              alt={awardImages[currentImageIndex].alt}
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              data-testid={`img-award-gallery-${currentImageIndex}`}
            />
            
            {/* Navigation Arrows */}
            {awardImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  data-testid="button-award-prev-image"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  data-testid="button-award-next-image"
                >
                  →
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {awardImages.length}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Award Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Recognition Details</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Award Category</p>
                    <p>Digital Government Innovation & Technology Excellence</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Project Recognition</p>
                    <p>CalOES Engage Platform - Transforming Emergency Management Through Digital Innovation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Event Date</p>
                    <p>November 15-16, 2023</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p>California State Capitol, Sacramento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact & Achievement */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Achievement Impact</h3>
              <div className="space-y-4 text-gray-300">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30">
                  <h4 className="font-medium text-white mb-2">Innovation Leadership</h4>
                  <p>Led product design and user experience strategy for CalOES Engage, revolutionizing how California manages emergency response coordination.</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-400/30">
                  <h4 className="font-medium text-white mb-2">Statewide Impact</h4>
                  <p>Platform serves 58 counties across California, improving disaster response coordination and community engagement during emergencies.</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                  <h4 className="font-medium text-white mb-2">Technology Excellence</h4>
                  <p>Recognized for innovative use of modern web technologies, user-centered design, and accessibility standards in government applications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/30">
          <h3 className="text-xl font-semibold text-white mb-4">Project Metrics & Recognition</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">58</div>
              <div className="text-gray-300 text-sm">Counties Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">1,200+</div>
              <div className="text-gray-300 text-sm">Emergency Coordinators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">24/7</div>
              <div className="text-gray-300 text-sm">Platform Availability</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => {
              trackEvent('external_link_click', 'awards', 'ca_gov_innovation_summit');
              window.open('https://cdt.ca.gov/innovation-summit/', '_blank');
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-200"
            data-testid="link-innovation-summit"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View CA Innovation Summit
          </Button>
          <Button
            onClick={() => {
              const element = document.getElementById('work');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                handleClose();
              }
            }}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-6 py-2 rounded-xl transition-all duration-200"
            data-testid="button-view-portfolio"
          >
            View Related Work
          </Button>
        </div>
      </div>
    </div>
  );
}