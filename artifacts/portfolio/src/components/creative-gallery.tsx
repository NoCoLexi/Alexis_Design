import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import beerAdvertising from "@assets/IMG_1656_1754523468629.jpg";
import gatoradePoster from "@assets/IMG_1620_1754523481860.jpg";
import universityBrochure from "@assets/FullSizeRender 2_1754523503518.jpg";
import gatoradeLabelConcept from "@assets/IMG_1622_1754577096170.jpg";
import lifespanReports from "@assets/FullSizeRender 13_1754523521763.jpg";
import schoolMaterials from "@assets/FullSizeRender 4_1754523633019.jpg";
import budweiserAd from "@assets/FullSizeRender 35_1754523657712.jpg";
import galaInvitation from "@assets/IMG_1642_1754523678624.jpg";
import jwuPortfolio from "@assets/FullSizeRender 14_1754576730756.jpg";
import seinfeldBillboard from "@assets/IMG_1654_1754576872134.jpg";
import rosieBillboards from "@assets/IMG_1652_1754576874123.jpg";
import newsBillboards from "@assets/IMG_1655_1754576894772.jpg";
import hiltonDesignBoard from "@assets/Hilton Design Board_1754956391330.jfif";
import edgewaterResortBoard from "@assets/Edgewater Resort Cape Cod_1754956408189.jfif";
import abc6WeatherCampaign from "@assets/FullSizeRender 16_1754957722931.jpg";
import camelbackResortBoard from "@assets/Scottsdale Camelback Mood Board 07-02-2019_Page_1_1754963751790.jpg";
import mchgInstallation from "@assets/IMG_6685_1754963973715.jpg";

interface GalleryItem {
  id: string;
  category: 'print' | 'outdoor' | 'brand' | 'interior';
  image: string;
  title: string;
  description?: string;
}

const galleryItems: GalleryItem[] = [
  // Print Design Items
  { 
    id: '1', 
    category: 'print', 
    image: universityBrochure, 
    title: 'JWU Anniversary Materials',
    description: 'Johnson & Wales University anniversary celebration materials'
  },
  { 
    id: '2', 
    category: 'print', 
    image: lifespanReports, 
    title: 'Lifespan Healthcare Annual Reports',
    description: 'Professional healthcare industry publications'
  },
  { 
    id: '3', 
    category: 'print', 
    image: schoolMaterials, 
    title: 'Providence Schools Brand Materials',
    description: 'Educational institution branding and materials'
  },
  { 
    id: '4', 
    category: 'print', 
    image: galaInvitation, 
    title: 'TF Green Airport opening Gala event',
    description: 'Elegant event invitation and program design'
  },
  { 
    id: '5', 
    category: 'print', 
    image: jwuPortfolio, 
    title: 'Johnson & Wales University Materials',
    description: 'University brand development and recruitment materials'
  },
  
  // Brand Design Items
  { 
    id: '6', 
    category: 'brand', 
    image: gatoradePoster, 
    title: 'Gatorade Sports Brand Dev',
    description: 'Athletic brand campaign and poster design'
  },
  { 
    id: '7', 
    category: 'brand', 
    image: gatoradeLabelConcept, 
    title: 'Gatorade Label Design Concept',
    description: 'Product packaging and label innovation'
  },
  { 
    id: '8', 
    category: 'brand', 
    image: budweiserAd, 
    title: 'Budweiser Brand Dev Campaign',
    description: 'Premium beer brand advertising materials'
  },
  { 
    id: '9', 
    category: 'brand', 
    image: beerAdvertising, 
    title: 'Beer Brand Campaign',
    description: 'Complete brand identity and advertising suite'
  },
  
  // Outdoor Advertising Items
  { 
    id: '10', 
    category: 'outdoor', 
    image: seinfeldBillboard, 
    title: 'Seinfeld TV Show Campaign',
    description: 'Large-scale outdoor advertising for television'
  },
  { 
    id: '11', 
    category: 'outdoor', 
    image: rosieBillboards, 
    title: 'Rosie O\'Donnell Show Campaign',
    description: 'Entertainment industry outdoor campaigns'
  },
  { 
    id: '12', 
    category: 'outdoor', 
    image: newsBillboards, 
    title: 'ABC 6 News Campaign',
    description: 'News media outdoor advertising and branding'
  },
  { 
    id: '15', 
    category: 'outdoor', 
    image: abc6WeatherCampaign, 
    title: 'ABC6 Weather Campaign',
    description: 'Outdoor billboard campaign for ABC6 weather personalities and programming'
  },
  
  // Interior Design Items
  { 
    id: '13', 
    category: 'interior', 
    image: hiltonDesignBoard, 
    title: 'Hilton Hotel Interior',
    description: 'Commercial hospitality design concept\nwith material selection and furnishing'
  },
  { 
    id: '14', 
    category: 'interior', 
    image: edgewaterResortBoard, 
    title: 'Edgewater Resort Cape Cod',
    description: 'Luxury resort interior design concept\nand comprehensive furnishing plan'
  },
  { 
    id: '16', 
    category: 'interior', 
    image: camelbackResortBoard, 
    title: 'Scottsdale Camelback Resort',
    description: 'Southwestern luxury resort mood board\nwith furniture and material selection'
  },
  { 
    id: '17', 
    category: 'interior', 
    image: mchgInstallation, 
    title: 'MCHG Installation',
    description: 'Modern commercial space with brick walls\nand custom woodwork meeting area'
  },
];

interface CarouselProps {
  items: GalleryItem[];
  title: string;
  description: string;
}

function CategoryCarousel({ items, title, description }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'start',
    skipSnaps: false,
    dragFree: true
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold gradient-text mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="h-10 w-10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="h-10 w-10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {items.map((item) => (
            <div key={item.id} className="embla__slide flex-[0_0_240px] md:flex-[0_0_280px]">
              <div className="relative group h-60 md:h-72 rounded-xl overflow-hidden bg-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CreativeGallery() {
  const categories = [
    { 
      id: 'print', 
      title: 'Print Design', 
      description: 'Editorial layouts, brochures, and brand development materials'
    },
    { 
      id: 'outdoor', 
      title: 'Outdoor Advertising', 
      description: 'Billboard campaigns and large-scale advertising'
    },
    { 
      id: 'interior', 
      title: 'Interior Design', 
      description: 'Commercial space design and furnishing concepts developed at GSCF'
    },
  ];

  return (
    <section id="gallery" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl section-glow mb-12 text-center">
            Creative Portfolio
          </h2>
        </div>

        {/* Category Carousels */}
        {categories.map((category) => {
          const categoryItems = galleryItems.filter(item => item.category === category.id);
          return (
            <CategoryCarousel
              key={category.id}
              items={categoryItems}
              title={category.title}
              description={category.description}
            />
          );
        })}
      </div>
    </section>
  );
}
