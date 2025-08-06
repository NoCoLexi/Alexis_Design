import { useState } from "react";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: string;
  category: 'print' | 'branding' | 'interior' | 'photography';
  image: string;
  title: string;
}

const galleryItems: GalleryItem[] = [
  // Print Design Items
  { id: '1', category: 'print', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Print Design Work' },
  { id: '2', category: 'print', image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Poster Design' },
  { id: '3', category: 'print', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Brochure Design' },
  
  // Branding Items
  { id: '4', category: 'branding', image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Logo Design Process' },
  { id: '5', category: 'branding', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Packaging Design' },
  { id: '6', category: 'branding', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Brand Identity' },
  
  // Interior Design Items
  { id: '7', category: 'interior', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Modern Interior Design' },
  { id: '8', category: 'interior', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Living Room Design' },
  { id: '9', category: 'interior', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Office Space Design' },
  
  // Photography Items
  { id: '10', category: 'photography', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Landscape Photography' },
  { id: '11', category: 'photography', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Portrait Photography' },
  { id: '12', category: 'photography', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600', title: 'Nature Photography' }
];

export default function CreativeGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'all' || item.category === activeFilter
  );

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'print', label: 'Print' },
    { id: 'branding', label: 'Branding' },
    { id: 'interior', label: 'Interior Design' },
    { id: 'photography', label: 'Photography' }
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
