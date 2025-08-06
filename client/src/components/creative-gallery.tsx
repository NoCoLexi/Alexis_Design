import { useState } from "react";
import { Button } from "@/components/ui/button";
import beerAdvertising from "@assets/IMG_1656_1754523468629.jpg";
import gatoradePoster from "@assets/IMG_1620_1754523481860.jpg";
import universityBrochure from "@assets/FullSizeRender 2_1754523503518.jpg";
import blackBookCover from "@assets/FullSizeRender 11_1754523511007.jpg";
import lifespanReports from "@assets/FullSizeRender 13_1754523521763.jpg";
import schoolMaterials from "@assets/FullSizeRender 4_1754523633019.jpg";
import budweiserAd from "@assets/FullSizeRender 35_1754523657712.jpg";
import galaInvitation from "@assets/IMG_1642_1754523678624.jpg";
import massHighwayAd from "@assets/FullSizeRender 22_1754523814537.jpg";

interface GalleryItem {
  id: string;
  category: 'print' | 'branding' | 'interior' | 'photography';
  image: string;
  title: string;
}

const galleryItems: GalleryItem[] = [
  // Print Design Items
  { id: '1', category: 'print', image: beerAdvertising, title: 'Beer Advertising Campaign' },
  { id: '2', category: 'print', image: gatoradePoster, title: 'Gatorade Sports Marketing' },
  { id: '3', category: 'print', image: universityBrochure, title: 'University Marketing Materials' },
  
  // Branding Items
  { id: '4', category: 'branding', image: blackBookCover, title: 'Black Book of Trade Secrets' },
  { id: '5', category: 'branding', image: lifespanReports, title: 'Lifespan Healthcare Annual Reports' },
  { id: '6', category: 'branding', image: schoolMaterials, title: 'Providence Schools Brand Materials' },
  
  // Additional Print Design Items
  { id: '7', category: 'print', image: budweiserAd, title: 'Budweiser Marketing Campaign' },
  { id: '8', category: 'print', image: galaInvitation, title: 'Gala Event Invitation Design' },
  { id: '9', category: 'print', image: massHighwayAd, title: 'Mass Highway Express Lane Campaign' },

];

export default function CreativeGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'all' || item.category === activeFilter
  );

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'print', label: 'Print Design' },
    { id: 'branding', label: 'Branding' }
  ];

  return (
    <section id="gallery" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Creative Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Diverse creative work spanning print design, branding, interior design, and photography
          </p>
        </div>

        {/* Gallery Categories */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? 'default' : 'outline'}
                onClick={() => setActiveFilter(category.id)}
                className={activeFilter === category.id ? 'gradient-bg-accent' : ''}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square rounded-xl overflow-hidden group cursor-pointer hover:glow-purple transition-all duration-300"
              onClick={() => setSelectedImage(item.image)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img
              src={selectedImage}
              alt="Gallery item"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-muted-foreground text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
