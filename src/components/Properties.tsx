import { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "./PropertyCard";
import domeResort from "@/assets/dome-resort.jpg";
import lakestoryResort from "@/assets/lakestory-resort.jpg";
import riversideGlamping from "@/assets/riverside-glamping.jpg";
import colorfulCabins from "@/assets/colorful-cabins.jpg";
import coupleRetreat from "@/assets/couple-retreat.jpg";
import cozynestResort from "@/assets/cozynest-resort.jpg";

export interface Property {
  id?: string;
  image: string;
  images: string[];
  title: string;
  price: string;
  pricePerNight?: string;
  priceNote: string;
  amenities: string[];
  isTopSelling: boolean;
  location: string;
  rating: number;
  category: "camping" | "cottage" | "villa";
  capacity: number;
  maxCapacity?: number;
  description: string;
  checkInTime?: string;
  checkOutTime?: string;
  highlights?: string[];
  activities?: string[];
  policies?: string[];
  contact?: string;
  address?: string;
}

export const properties: Property[] = [
  // Top Campings (Pawna) - 6 properties
  {
    id: "camping-1",
    image: riversideGlamping,
    images: [riversideGlamping, colorfulCabins, cozynestResort, lakestoryResort],
    title: "Pawna Riverside Glamping",
    price: "₹2,999",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Experience ultimate glamping at Pawna River with DJ and riverfront views.",
    amenities: [
      "Private Washroom",
      "DJ on Saturday",
      "Riverview",
      "Food Included",
      "Free Activities",
      "Bonfire",
      "Garden",
      "Music",
      "Liquor Bar",
    ],
    isTopSelling: false,
    location: "Pawna Lake",
    rating: 4.7,
    category: "camping",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["River views", "DJ performance", "Bonfire night", "Garden access"],
    activities: ["Boating", "Bonfire", "Music", "Nature walks"],
    policies: ["Free cancellation up to 7 days", "No refund within 3 days"],
    contact: "+91 8669505727",
  },
  {
    id: "camping-2",
    image: cozynestResort,
    images: [cozynestResort, colorfulCabins, riversideGlamping, lakestoryResort],
    title: "CozyNest at Chavsar – Pawna Lake",
    price: "₹3,300",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Cozy camping experience at Pawna with food included and lake access.",
    amenities: [
      "Private Washroom",
      "Food Included",
      "Paid Boating",
      "Bonfire",
      "Lake Access",
    ],
    isTopSelling: false,
    location: "Pawna Lake",
    rating: 4.5,
    category: "camping",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Lake access", "Paid boating", "Bonfire", "Food included"],
    activities: ["Boating", "Bonfire", "Swimming", "Fishing"],
    policies: ["Free cancellation up to 7 days", "50% refund 3-7 days"],
    contact: "+91 8669505727",
  },
  {
    id: "camping-3",
    image: colorfulCabins,
    images: [colorfulCabins, domeResort, riversideGlamping, cozynestResort],
    title: "Lakeside Glamping Camp – Pawna Lake",
    price: "₹2,499",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Exclusive glamping camp with stargazing and lake access.",
    amenities: [
      "Canvas Tent",
      "Bonfire",
      "Stargazing",
      "Food Included",
      "Lake Access",
      "Free Activities",
      "Riverside View",
      "Camping Bed",
    ],
    isTopSelling: true,
    location: "Pawna Lake",
    rating: 4.8,
    category: "camping",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Stargazing", "Riverside views", "Canvas tents", "Free activities"],
    activities: ["Stargazing", "Bonfire", "Hiking", "Photography"],
    policies: ["Free cancellation up to 7 days"],
    contact: "+91 8669505727",
  },
  {
    id: "camping-4",
    image: riversideGlamping,
    images: [riversideGlamping, lakestoryResort, colorfulCabins, domeResort],
    title: "Adventure Camping Resort – Pawna",
    price: "₹2,799",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Adventure-packed camping with nature trails and photography opportunities.",
    amenities: [
      "Adventure Activities",
      "Campfire",
      "Stargazing",
      "Food Included",
      "Nature Trails",
      "Photography Points",
      "Lake Proximity",
      "Friendly Staff",
    ],
    isTopSelling: true,
    location: "Pawna Lake",
    rating: 4.7,
    category: "camping",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Adventure activities", "Nature trails", "Photography points", "Lake proximity"],
    activities: ["Hiking", "Adventure sports", "Photography", "Bonfire"],
    policies: ["Free cancellation up to 7 days"],
    contact: "+91 8669505727",
  },
  {
    id: "camping-5",
    image: lakestoryResort,
    images: [lakestoryResort, cozynestResort, colorfulCabins, riversideGlamping],
    title: "Nature's Embrace Camping – Pawna",
    price: "₹2,599",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Peaceful camping with local cuisine and expert guides.",
    amenities: [
      "Tent Stay",
      "Bonfire",
      "Local Cuisine",
      "Hiking",
      "Bird Watching",
      "Photography",
      "Sunset View",
      "Expert Guides",
    ],
    isTopSelling: false,
    location: "Pawna Lake",
    rating: 4.6,
    category: "camping",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Sunset views", "Expert guides", "Local cuisine", "Bird watching"],
    activities: ["Bird watching", "Hiking", "Photography", "Bonfire"],
    policies: ["Free cancellation up to 7 days"],
    contact: "+91 8669505727",
  },
  {
    id: "camping-6",
    image: domeResort,
    images: [domeResort, colorfulCabins, lakestoryResort, riversideGlamping],
    title: "Pawna Eco Glamping Site",
    price: "₹3,099",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Eco-friendly glamping with organic food and wellness activities.",
    amenities: [
      "Eco-friendly Tents",
      "Organic Food",
      "Nature Walks",
      "Wellness Activities",
      "Bonfire",
      "Lake View",
      "Sustainable Practices",
      "Garden Access",
    ],
    isTopSelling: false,
    location: "Pawna Lake",
    rating: 4.9,
    category: "camping",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Eco-friendly", "Organic food", "Wellness center", "Lake views"],
    activities: ["Yoga", "Nature walks", "Meditation", "Bonfire"],
    policies: ["Free cancellation up to 7 days"],
    contact: "+91 8669505727",
  },
  // Top Cottages (Pawna) - 7 properties
  {
    id: "cottage-1",
    image: colorfulCabins,
    images: [colorfulCabins, lakestoryResort, domeResort, riversideGlamping],
    title: "AC House with Sleeping Loft – Pawna Lake",
    price: "₹3,199",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Comfortable AC cottage with swimming pool and lake activities.",
    amenities: [
      "Private Washroom",
      "AC",
      "Common Swimming Pool",
      "Food Included",
      "Free Activities",
      "Paid Boating",
      "Bonfire",
      "Lake Access",
    ],
    isTopSelling: false,
    location: "Pawna Lake",
    rating: 4.6,
    category: "cottage",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["AC rooms", "Swimming pool", "Lake activities", "Food included"],
    activities: ["Boating", "Swimming", "Bonfire", "Games"],
    contact: "+91 8669505727",
  },
  {
    id: "cottage-2",
    image: lakestoryResort,
    images: [lakestoryResort, colorfulCabins, coupleRetreat, domeResort],
    title: "Lakestory Resort – Pawna Lake",
    price: "₹7,499",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Luxury cottage resort with private pool and smart entertainment.",
    amenities: [
      "Private Pool",
      "Private Washroom",
      "AC",
      "Mini Fridge",
      "Smart Projector",
      "Home Theatre",
      "BBQ",
      "Food Included",
      "Lake Touch",
    ],
    isTopSelling: true,
    location: "Pawna Lake",
    rating: 4.8,
    category: "cottage",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Private pool", "Home theatre", "BBQ area", "Lake touch"],
    activities: ["Swimming", "Movie nights", "BBQ", "Lake activities"],
    contact: "+91 8669505727",
  },
  {
    id: "cottage-3",
    image: coupleRetreat,
    images: [coupleRetreat, lakestoryResort, colorfulCabins, cozynestResort],
    title: "Dew Dreams – Couple Stay with Private Pool",
    price: "₹8,249",
    priceNote: "per person with meal",
    capacity: 2,
    description: "Romantic couple retreat with private pool and spa services.",
    amenities: [
      "Private Pool",
      "Lakeview Room",
      "Steam Bath",
      "Food Included",
      "Free Activities",
      "Paid Boating",
      "Bonfire",
      "Garden",
      "Room Service",
    ],
    isTopSelling: false,
    location: "Pawna Lake",
    rating: 4.9,
    category: "cottage",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Private pool", "Steam bath", "Garden", "Lakeview"],
    activities: ["Couples yoga", "Spa", "Bonfire", "Boating"],
    contact: "+91 8669505727",
  },
  {
    id: "cottage-4",
    image: colorfulCabins,
    images: [colorfulCabins, domeResort, lakestoryResort, riversideGlamping],
    title: "Serene Cottage Retreat – Pawna",
    price: "₹4,999",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Peaceful cottage with valley views and mini kitchen.",
    amenities: [
      "Private Cottage",
      "Valley View",
      "AC & Heater",
      "Attached Bathroom",
      "Mini Kitchen",
      "Bonfire",
      "Food Included",
      "Peaceful Location",
    ],
    isTopSelling: true,
    location: "Pawna Lake",
    rating: 4.7,
    category: "cottage",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Valley views", "Mini kitchen", "Private cottage", "Peaceful"],
    activities: ["Cooking", "Bonfire", "Nature walks", "Meditation"],
    contact: "+91 8669505727",
  },
  {
    id: "cottage-5",
    image: lakestoryResort,
    images: [lakestoryResort, riversideGlamping, colorfulCabins, coupleRetreat],
    title: "Riverside Cottage Escape – Pawna",
    price: "₹5,499",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Riverside cottage with water activities and natural beauty.",
    amenities: [
      "Riverside Location",
      "Private Cottage",
      "AC",
      "Balcony",
      "Food Included",
      "River Activities",
      "Bonfire",
      "Natural Beauty",
    ],
    isTopSelling: false,
    location: "Pawna Lake",
    rating: 4.8,
    category: "cottage",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Riverside views", "River activities", "Natural beauty", "Balcony"],
    activities: ["Boating", "Fishing", "River rafting", "Photography"],
    contact: "+91 8669505727",
  },
  {
    id: "cottage-6",
    image: domeResort,
    images: [domeResort, lakestoryResort, colorfulCabins, coupleRetreat],
    title: "Heritage Cottage Hotel – Pawna",
    price: "₹6,299",
    priceNote: "per person with meal",
    capacity: 4,
    description: "Heritage cottage with fine dining and spa services.",
    amenities: [
      "Heritage Architecture",
      "Fine Dining",
      "Spa Services",
      "Lake View Rooms",
      "Conference Room",
      "Bonfire",
      "Multiple Restaurants",
      "24-Hour Service",
    ],
    isTopSelling: false,
    location: "Pawna Lake",
    rating: 4.9,
    category: "cottage",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Heritage design", "Fine dining", "Spa services", "Lake views"],
    activities: ["Spa treatments", "Fine dining", "Bonfire", "Cultural tours"],
    contact: "+91 8669505727",
  },
  {
    id: "cottage-9",
    image: colorfulCabins,
    images: [colorfulCabins, lakestoryResort, domeResort, cozynestResort],
    title: "Green Canvas Cottages",
    price: "₹3,199",
    pricePerNight: "₹2,899",
    priceNote: "Adult per night",
    capacity: 2,
    description: "Extreme lakeside location with boating, bonfire, and live music on Saturdays.",
    amenities: [
      "Food Included",
      "Boating (Extra cost)",
      "Bonfire",
      "Lake access",
      "Restaurant",
      "Private Washroom",
      "Live Music and DJ on Sat",
      "Activities",
    ],
    isTopSelling: false,
    location: "Pawna Lake, Lonavala",
    rating: 4.7,
    category: "cottage",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Lakeside location", "Live music", "Boating available", "Meal included"],
    activities: ["Badminton", "Carrom", "Archery", "Bonfire", "Music", "Boating"],
    address: "At, opp. SP hotel, Pavana nagar, maval, Thakursai, Bramhanoli, Maharashtra 410406",
    contact: "+91 8669505727",
    policies: ["No Refund"],
  },
  // Top Villas (Lonavala) - 6 properties
  {
    id: "villa-1",
    image: domeResort,
    images: [domeResort, colorfulCabins, lakestoryResort, coupleRetreat],
    title: "Dome Story Resort – Malvandi Lake, Lonavala",
    price: "₹7,499",
    priceNote: "per person with meal",
    capacity: 4,
    maxCapacity: 6,
    description: "Luxury dome villa resort with lake views and exclusive amenities.",
    amenities: [
      "Private Washroom",
      "AC",
      "Mini Fridge",
      "Electric Kettle",
      "BBQ",
      "Food Included",
      "Free Boating",
      "Bonfire",
      "Lake Access",
    ],
    isTopSelling: true,
    location: "Lonavala",
    rating: 4.9,
    category: "villa",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Lake views", "Dome architecture", "Free boating", "BBQ area"],
    activities: ["Boating", "Swimming", "Bonfire", "Stargazing"],
    contact: "+91 8669505727",
  },
  {
    id: "villa-2",
    image: coupleRetreat,
    images: [coupleRetreat, domeResort, colorfulCabins, lakestoryResort],
    title: "Luxury Villa Estate – Lonavala",
    price: "₹12,999",
    priceNote: "per person with meal",
    capacity: 4,
    maxCapacity: 8,
    description: "Ultimate luxury villa with private chef and premium amenities.",
    amenities: [
      "Private Villa",
      "Mountain View",
      "Infinity Pool",
      "Private Chef",
      "Wine Cellar",
      "Spa",
      "Garden Terrace",
      "24-Hour Butler",
    ],
    isTopSelling: true,
    location: "Lonavala",
    rating: 4.9,
    category: "villa",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Private chef", "Infinity pool", "Wine cellar", "24-hour butler"],
    activities: ["Fine dining", "Spa", "Wine tasting", "Terrace dining"],
    contact: "+91 8669505727",
  },
  {
    id: "villa-3",
    image: colorfulCabins,
    images: [colorfulCabins, lakestoryResort, domeResort, coupleRetreat],
    title: "Mountain Retreat Villa – Lonavala",
    price: "₹9,999",
    priceNote: "per person with meal",
    capacity: 4,
    maxCapacity: 6,
    description: "Mountain villa with valley views and private pool.",
    amenities: [
      "Private Villa",
      "Valley View",
      "Private Pool",
      "Grill Kitchen",
      "Living Room",
      "Terrace Seating",
      "Nature Access",
      "Peaceful Location",
    ],
    isTopSelling: false,
    location: "Lonavala",
    rating: 4.8,
    category: "villa",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Valley views", "Private pool", "Grill kitchen", "Nature access"],
    activities: ["Hiking", "Grilling", "Swimming", "Nature walks"],
    contact: "+91 8669505727",
  },
  {
    id: "villa-4",
    image: lakestoryResort,
    images: [lakestoryResort, coupleRetreat, domeResort, colorfulCabins],
    title: "Heritage Villa – Lonavala",
    price: "₹10,499",
    priceNote: "per person with meal",
    capacity: 4,
    maxCapacity: 6,
    description: "Historic villa with antique furnishings and fine dining.",
    amenities: [
      "Historic Villa",
      "Antique Furnishings",
      "Private Grounds",
      "Library",
      "Music Room",
      "Fine Dining",
      "Garden",
      "Heritage Charm",
    ],
    isTopSelling: false,
    location: "Lonavala",
    rating: 4.7,
    category: "villa",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Historic architecture", "Antique furnishings", "Fine dining", "Garden"],
    activities: ["Fine dining", "Library visits", "Music events", "Garden tours"],
    contact: "+91 8669505727",
  },
  {
    id: "villa-5",
    image: riversideGlamping,
    images: [riversideGlamping, domeResort, lakestoryResort, colorfulCabins],
    title: "Waterfront Villa Paradise – Lonavala",
    price: "₹11,499",
    priceNote: "per person with meal",
    capacity: 4,
    maxCapacity: 8,
    description: "Waterfront villa with yacht access and premium water amenities.",
    amenities: [
      "Waterfront Location",
      "Private Beach Access",
      "Infinity Pool",
      "Yacht Access",
      "Fine Dining",
      "Spa Suite",
      "Entertainment Hall",
      "Concierge Service",
    ],
    isTopSelling: true,
    location: "Lonavala",
    rating: 4.9,
    category: "villa",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Waterfront location", "Yacht access", "Infinity pool", "Private beach"],
    activities: ["Yacht sailing", "Beach activities", "Water sports", "Fine dining"],
    contact: "+91 8669505727",
  },
  {
    id: "villa-6",
    image: domeResort,
    images: [domeResort, colorfulCabins, lakestoryResort, riversideGlamping],
    title: "Eco-Luxury Villa – Lonavala",
    price: "₹8,999",
    priceNote: "per person with meal",
    capacity: 4,
    maxCapacity: 6,
    description: "Sustainable luxury villa with wellness facilities.",
    amenities: [
      "Sustainable Villa",
      "Solar Powered",
      "Organic Gardens",
      "Natural Pool",
      "Wellness Center",
      "Yoga Deck",
      "Forest View",
      "Eco-Friendly Materials",
    ],
    isTopSelling: false,
    location: "Lonavala",
    rating: 4.8,
    category: "villa",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    highlights: ["Eco-friendly", "Yoga facilities", "Organic gardens", "Forest views"],
    activities: ["Yoga", "Meditation", "Nature walks", "Wellness treatments"],
    contact: "+91 8669505727",
  },
];

const categories = [
  { id: "camping", label: "Top Campings", location: "Pawna" },
  { id: "cottage", label: "Top Cottages", location: "Pawna" },
  { id: "villa", label: "Top Villas", location: "Lonavala" },
];

const Properties = () => {
  const [activeTab, setActiveTab] = useState("camping");
  const isAutoScrolling = useRef(false);
  const sectionRefs = {
    camping: useRef<HTMLDivElement>(null),
    cottage: useRef<HTMLDivElement>(null),
    villa: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
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
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    data-testid={`button-tab-${category.id}`}
                    className="text-sm md:text-base"
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
        {categories.map((category) => {
          const categoryProperties = properties.filter((p) => p.category === category.id);
          return (
            <div
              key={category.id}
              id={category.id}
              ref={sectionRefs[category.id as keyof typeof sectionRefs]}
              className="mb-24 md:mb-32 scroll-mt-28"
            >
              <div className="mb-12">
                <h3 className="font-display text-2xl md:text-3xl text-foreground font-semibold mb-2">
                  {category.label}
                </h3>
                <p className="text-muted-foreground text-base">
                  Best experiences in {category.location}
                </p>
              </div>

              {/* Properties Grid */}
              <div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                data-testid={`grid-properties-${category.id}`}
              >
                {categoryProperties.map((property, index) => (
                  <div
                    key={property.title}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-testid={`card-property-${property.title.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <PropertyCard id={property.id} {...property} />
                  </div>
                ))}
              </div>
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
