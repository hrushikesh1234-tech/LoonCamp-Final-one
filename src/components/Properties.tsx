import { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "./PropertyCard";
import { propertyAPI } from "@/lib/api";

export interface Property {
  id?: string;
  slug: string;
  image: string;
  images: string[] | any[];
  title: string;
  price: string;
  pricePerNight?: string;
  priceNote: string;
  amenities: string[];
  is_top_selling: boolean;
  location: string;
  rating: number;
  category: "camping" | "cottage" | "villa";
  capacity: number;
  maxCapacity?: number;
  description: string;
  check_in_time?: string;
  check_out_time?: string;
  highlights?: string[];
  activities?: string[];
  policies?: string[];
  contact?: string;
  address?: string;
}

const categories = [
  { id: "camping", label: "Top Campings", location: "Pawna" },
  { id: "cottage", label: "Top Cottages", location: "Pawna" },
  { id: "villa", label: "Top Villas", location: "Lonavala" },
];

const Properties = () => {
  const [activeTab, setActiveTab] = useState("camping");
  const [properties, setProperties] = useState<Property[]>([]);
  const [categorySettings, setCategorySettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const isAutoScrolling = useRef(false);
  const sectionRefs = {
    camping: useRef<HTMLDivElement>(null),
    cottage: useRef<HTMLDivElement>(null),
    villa: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Scroll restoration logic
    const savedTab = sessionStorage.getItem('activeCategoryTab');
    if (savedTab) {
      setActiveTab(savedTab);
      // Small delay to ensure the DOM is ready for scrolling
      setTimeout(() => {
        const ref = sectionRefs[savedTab as keyof typeof sectionRefs];
        if (ref?.current) {
          ref.current.scrollIntoView({ behavior: "instant", block: "start" });
        }
      }, 100);
      sessionStorage.removeItem('activeCategoryTab');
    }

    const fetchProperties = async () => {
      try {
        const response = await propertyAPI.getPublicList();
        if (response.success) {
          // Map backend data to frontend interface
          const mappedProperties = response.data.map((p: any) => ({
            ...p,
            priceNote: p.price_note,
            isAvailable: p.is_available,
            image: p.images && p.images.length > 0 ? p.images[0].image_url : "https://images.unsplash.com/photo-1571508601166-972e0a1f3ced?w=800",
            images: p.images ? p.images.map((img: any) => img.image_url) : []
          }));
          setProperties(mappedProperties);
          if (response.categorySettings) {
            setCategorySettings(response.categorySettings);
            
            // Auto-select the first category based on dynamic sort
            const sorted = [...categories].sort((a, b) => {
              const aClosed = response.categorySettings[a.id]?.is_closed ? 1 : 0;
              const bClosed = response.categorySettings[b.id]?.is_closed ? 1 : 0;
              return aClosed - bClosed;
            });
            
            const savedTab = sessionStorage.getItem('activeCategoryTab');
            if (!savedTab && sorted.length > 0) {
              setActiveTab(sorted[0].id);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

    const handleScrollToCategory = (e: any) => {
      const { categoryId } = e.detail;
      handleTabChange(categoryId);
    };

    window.addEventListener('scrollToCategory', handleScrollToCategory);

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isAutoScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      window.removeEventListener('scrollToCategory', handleScrollToCategory);
      observer.disconnect();
    };
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const ref = sectionRefs[tabId as keyof typeof sectionRefs];
    if (ref?.current) {
      isAutoScrolling.current = true;
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Reset auto-scrolling flag after animation completes
      setTimeout(() => {
        isAutoScrolling.current = false;
      }, 1000);
    }
  };

  const sortedCategories = [...categories].sort((a, b) => {
    const aClosed = categorySettings[a.id]?.is_closed ? 1 : 0;
    const bClosed = categorySettings[b.id]?.is_closed ? 1 : 0;
    return aClosed - bClosed;
  });

  return (
    <section id="properties" className="py-24 md:py-32 bg-secondary/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Curated Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold mb-6">
            Premium Stays
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked luxury cottages and resorts in Pawna Lake & Lonavala,
            designed for unforgettable experiences.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-px bg-border" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-12 h-px bg-border" />
          </div>
        </div>
      </div>

      {/* Tabs - Sticky wrapper */}
      <div className="sticky top-0 z-50 bg-secondary/30 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-center py-6 md:py-8">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
              <TabsList className="grid w-full grid-cols-3" data-testid="tabs-property-categories">
                {sortedCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    data-testid={`button-tab-${category.id}`}
                    className="text-sm md:text-base data-[state=active]:text-[#FE28A2] data-[state=active]:drop-shadow-[0_0_6.4px_rgba(254,40,162,0.38)] transition-all duration-300"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Properties Sections */}
        {sortedCategories.map((category) => {
          const setting = categorySettings[category.id];
          const isClosed = setting?.is_closed;
          const categoryProperties = properties.filter((p) => p.category === category.id);
          
          return (
            <div
              key={category.id}
              id={category.id}
              ref={sectionRefs[category.id as keyof typeof sectionRefs]}
              className="mb-24 md:mb-32 scroll-mt-28"
            >
              <div className="mb-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground font-semibold mb-2">
                      {category.label}
                    </h3>
                    <p className="text-muted-foreground text-base">
                      Best experiences in {category.location}
                    </p>
                  </div>
                  {isClosed && (
                    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 md:p-6 text-left md:text-right max-w-full md:max-w-md backdrop-blur-sm animate-fade-in">
                      <div className="flex items-center gap-2 mb-2 md:justify-end">
                        <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                        <p className="text-destructive font-bold text-xs md:text-sm uppercase tracking-[0.2em]">Temporarily Closed</p>
                      </div>
                      <p className="text-foreground font-semibold text-lg mb-2 leading-tight">{setting.reason}</p>
                      {setting.from && setting.to && (
                        <div className="flex flex-col gap-1 mt-3">
                          <p className="text-muted-foreground text-xs font-medium">Expected Closure Period</p>
                          <p className="text-foreground/80 text-sm font-medium">
                            {new Date(setting.from).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(setting.to).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Properties Grid */}
              <div
                className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 transition-all duration-500 ${isClosed ? 'opacity-30 grayscale pointer-events-none scale-[0.98]' : 'opacity-100'}`}
                data-testid={`grid-properties-${category.id}`}
              >
                {categoryProperties.map((property, index) => (
                  <div
                    key={property.title}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-testid={`card-property-${property.title.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <PropertyCard id={property.id} slug={property.slug} {...property} />
                  </div>
                ))}
              </div>
              
              {isClosed && categoryProperties.length > 0 && (
                <div className="mt-12 text-center bg-secondary/20 rounded-2xl py-8 px-6 border border-border/50">
                  <p className="text-muted-foreground font-medium italic">
                    Bookings for {category.label} are currently paused. 
                    <br className="hidden sm:block" />
                    Please check back later or contact us for alternatives.
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary hover:text-gold-dark font-medium transition-colors duration-300"
            data-testid="link-contact-recommendations"
          >
            Contact us for custom recommendations
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Properties;
