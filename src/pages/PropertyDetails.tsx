import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Star, 
  MapPin, 
  Users, 
  Wifi, 
  Wind, 
  Coffee, 
  ChevronLeft, 
  Calendar, 
  Phone, 
  Share2, 
  MessageCircle,
  Waves,
  Utensils,
  Tv,
  Flame,
  Camera,
  Waves as Water,
  Sun,
  ShieldCheck,
  Clock,
  Car
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageSlider from "@/components/ImageSlider";
import { properties } from "@/components/Properties";
import { BookingForm } from "@/components/BookingForm";

// Helper for mapping icons
const getIcon = (amenity: string) => {
  const a = amenity.toLowerCase();
  if (a.includes("pool") || a.includes("swim")) return <Waves className="w-5 h-5" />;
  if (a.includes("ac") || a.includes("air")) return <Wind className="w-5 h-5" />;
  if (a.includes("food") || a.includes("meal") || a.includes("breakfast") || a.includes("dining")) return <Utensils className="w-5 h-5" />;
  if (a.includes("theatre") || a.includes("tv") || a.includes("projector")) return <Tv className="w-5 h-5" />;
  if (a.includes("bbq") || a.includes("bonfire") || a.includes("fire")) return <Flame className="w-5 h-5" />;
  if (a.includes("photo")) return <Camera className="w-5 h-5" />;
  if (a.includes("hike") || a.includes("walk") || a.includes("trail")) return <MapPin className="w-5 h-5" />;
  if (a.includes("boat")) return <Water className="w-5 h-5" />;
  if (a.includes("yoga") || a.includes("meditation") || a.includes("wellness")) return <Sun className="w-5 h-5" />;
  if (a.includes("parking")) return <Car className="w-5 h-5" />;
  if (a.includes("washroom") || a.includes("toilet")) return <ShieldCheck className="w-5 h-5" />;
  if (a.includes("fridge")) return <Coffee className="w-5 h-5" />;
  return <ShieldCheck className="w-5 h-5 opacity-50" />;
};

// Extended property interface with full details
interface PropertyDetail {
  id: string;
  image: string;
  images?: string[];
  title: string;
  price: string;
  pricePerNight?: string;
  priceNote: string;
  amenities: string[];
  isTopSelling: boolean;
  location: string;
  rating: number;
  category: "camping" | "cottage" | "villa";
  description: string;
  capacity: number;
  maxCapacity?: number;
  checkInTime?: string;
  checkOutTime?: string;
  highlights: string[];
  activities: string[];
  policies?: string[];
  contact?: string;
}

const PropertyDetails = () => {
  const { propertyId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [propertyId]);

  // Find property from the properties list
  const foundProperty = properties.find((p) => p.id === propertyId);
  
  // Default property data if not found
  const defaultProperty: PropertyDetail = {
    id: propertyId || "1",
    image: "https://images.unsplash.com/photo-1571508601166-972e0a1f3ced?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571508601166-972e0a1f3ced?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1537359108129-c0eb8706cbf7?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551092160-e23e9b6b8f69?w=1200&h=800&fit=crop",
    ],
    title: "Luxury Lakeside Cottage",
    price: "₹7,499",
    pricePerNight: "₹3,500",
    priceNote: "per person with meal",
    location: "Pawna Lake, Maharashtra",
    rating: 4.8,
    category: "cottage",
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
      "Toiletries",
      "Garden",
    ],
    isTopSelling: true,
    capacity: 4,
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    description:
      "Experience the ultimate luxury at our lakeside retreat. Wake up to stunning lake views, enjoy world-class amenities, and unwind in nature's embrace. Perfect for couples, families, and groups seeking an unforgettable getaway.",
    highlights: [
      "Panoramic lake views",
      "Private infinity pool",
      "Spa and wellness center",
      "Gourmet dining experience",
      "Water sports facilities",
      "Photography-worthy locations",
    ],
    activities: [
      "Boating",
      "Swimming",
      "Hiking",
      "Bonfire",
      "Stargazing",
      "Yoga and meditation",
      "Photography tours",
      "Local cultural experiences",
    ],
    policies: [
      "Free cancellation up to 7 days before check-in",
      "50% refund for cancellation 3-7 days before",
      "No refund for cancellation within 3 days",
      "Children below 5 years stay free",
    ],
    contact: "+91 8669505727",
  };

  // Merge found property with default property
  const propertyData: PropertyDetail = foundProperty
    ? {
        ...defaultProperty,
        ...foundProperty,
        images: foundProperty.images || [foundProperty.image],
        highlights: foundProperty.highlights || [
          "Excellent amenities",
          "Beautiful location",
          "Great value",
          "Friendly staff",
        ],
        activities: foundProperty.activities || [
          "Boating",
          "Bonfire",
          "Swimming",
          "Hiking",
        ],
        policies: foundProperty.policies || [
          "Free cancellation up to 7 days before check-in",
          "50% refund for cancellation 3-7 days before",
        ],
      }
    : defaultProperty;

  const isCampingOrCottage = propertyData.category === "camping" || propertyData.category === "cottage";
  const isVilla = propertyData.category === "villa";

  return (
    <>
      <Helmet>
        <title>{propertyData.title} | LoonCamp</title>
        <meta name="description" content={propertyData.description} />
        {/* Open Graph / WhatsApp Preview */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${propertyData.title} | LoonCamp`} />
        <meta property="og:description" content={`${propertyData.price} ${propertyData.priceNote} - ${propertyData.description.substring(0, 100)}...`} />
        <meta property="og:image" content={propertyData.image} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-secondary/30">
        {/* Floating Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-all group">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Back</span>
            </Link>
            <div className="hidden md:block">
              <h2 className="font-display text-lg font-semibold truncate max-w-[200px] lg:max-w-md">
                {propertyData.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                onClick={() => {
                  const shareUrl = window.location.href;
                  const text = `🏡 *${propertyData.title}*\n📍 ${propertyData.location}\n💰 *${propertyData.price}* ${propertyData.priceNote}\n\nCheck out this beautiful property on LoonCamp:\n${shareUrl}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              {propertyData.isTopSelling && (
                <Badge className="bg-primary text-primary-foreground border-none px-4 py-1.5 shadow-gold hidden sm:flex">
                  <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                  Top Selling
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section with Slider */}
        <div className="container mx-auto px-6 py-12">
          {/* Gallery Column */}
          <div className="space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl-soft ring-1 ring-border/50">
              <ImageSlider images={propertyData.images || [propertyData.image]} title={propertyData.title} />
            </div>

            {/* Mobile Booking Section - Now below images */}
            <div className="lg:hidden">
              <Card className="rounded-[2.5rem] p-8 md:p-10 bg-card shadow-2xl-soft border border-border/50 overflow-hidden relative">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative">
                  <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground block mb-2">Total Starting At</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-display font-bold text-primary tracking-tight">{propertyData.price}</span>
                      <span className="text-muted-foreground font-medium text-lg">/ {isVilla ? 'villa' : 'person'}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 font-medium flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      {propertyData.priceNote}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-gold-light h-16 rounded-2xl text-lg font-bold shadow-gold hover:shadow-gold-lg transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                          <MessageCircle className="w-6 h-6" />
                          Book Your Stay
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] rounded-[2rem] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-display">Book Your Stay</DialogTitle>
                        </DialogHeader>
                        <BookingForm 
                          propertyName={propertyData.title} 
                          pricePerPerson={parseInt(propertyData.price.replace(/[^\d]/g, "")) || 0}
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-16 rounded-2xl text-lg font-bold border-border/50 hover:bg-secondary transition-all flex items-center justify-center gap-3"
                        >
                          <Phone className="w-5 h-5 text-primary" />
                          Contact Host
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md rounded-[2rem]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-display text-center">How would you like to connect?</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-6">
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-3 h-32 rounded-3xl border-green-500/30 hover:bg-green-50 hover:border-green-500 text-green-600 transition-all group"
                            onClick={() => window.open(`https://api.whatsapp.com/send?phone=918669505727`, '_blank')}
                          >
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <MessageCircle className="w-6 h-6" />
                            </div>
                            <span className="font-bold">WhatsApp</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-3 h-32 rounded-3xl border-primary/30 hover:bg-primary/5 hover:border-primary text-primary transition-all group"
                            onClick={() => window.open(`tel:+918669505727`, '_self')}
                          >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Phone className="w-6 h-6" />
                            </div>
                            <span className="font-bold">Direct Call</span>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="pt-8 border-t border-border/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary border border-border/50">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Inquiry Support</p>
                        <p className="font-bold text-foreground">{propertyData.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start mt-8">
            <div className="lg:col-span-8 space-y-8">
              {/* Main Info */}
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border/50">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1">
                    {propertyData.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {propertyData.location}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 rounded-full text-xs font-bold text-gold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {propertyData.rating} Review Score
                  </div>
                </div>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8 leading-tight">
                  {propertyData.title}
                </h1>

                <div className="prose prose-slate max-w-none mb-12">
                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light italic">
                    {propertyData.description}
                  </p>
                </div>

                {/* Property Feature Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-secondary/50 rounded-2xl border border-border/50">
                  <div className="flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm border border-border/30">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Capacity</span>
                    <span className="text-sm font-semibold">{propertyData.capacity} Guests</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm border border-border/30">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Check-in</span>
                    <span className="text-sm font-semibold">{propertyData.checkInTime}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm border border-border/30">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Check-out</span>
                    <span className="text-sm font-semibold">{propertyData.checkOutTime}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm border border-border/30">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Status</span>
                    <span className="text-sm font-semibold text-green-600">Verified</span>
                  </div>
                </div>
              </div>

              {/* Amenities & Activities Sections */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="rounded-3xl p-8 shadow-sm border-border/50 bg-card overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
                    <Wifi className="w-6 h-6 text-primary" />
                    Amenities
                  </h3>
                  <div className="grid gap-5">
                    {propertyData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {getIcon(amenity)}
                        </div>
                        <span className="text-sm font-medium text-foreground/80">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="rounded-3xl p-8 shadow-sm border-border/50 bg-card overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
                    <Water className="w-6 h-6 text-primary" />
                    Activities
                  </h3>
                  <div className="grid gap-5">
                    {propertyData.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {getIcon(activity)}
                        </div>
                        <span className="text-sm font-medium text-foreground/80">{activity}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Highlights */}
              <Card className="rounded-3xl p-8 md:p-10 shadow-sm border-border/50 bg-card">
                <h3 className="text-2xl font-display font-semibold mb-8">What You'll Love</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {propertyData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all">
                      <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm md:text-base leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Policies */}
              {propertyData.policies && (
                <Card className="rounded-3xl p-8 md:p-10 shadow-sm border-border/50 bg-background/50 border-dashed">
                  <h3 className="text-2xl font-display font-semibold mb-8">Good to Know</h3>
                  <div className="space-y-4">
                    {propertyData.policies.map((policy, index) => (
                      <div key={index} className="flex items-center gap-4 text-muted-foreground">
                        <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{policy}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Booking Column */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28">
              <Card className="rounded-[2.5rem] p-8 md:p-10 bg-card shadow-2xl-soft border border-border/50 overflow-hidden relative">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative">
                  <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground block mb-2">Total Starting At</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-display font-bold text-primary tracking-tight">{propertyData.price}</span>
                      <span className="text-muted-foreground font-medium text-lg">/ {isVilla ? 'villa' : 'person'}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 font-medium flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      {propertyData.priceNote}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-gold-light h-16 rounded-2xl text-lg font-bold shadow-gold hover:shadow-gold-lg transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                          <MessageCircle className="w-6 h-6" />
                          Book Your Stay
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] rounded-[2rem] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-display">Book Your Stay</DialogTitle>
                        </DialogHeader>
                        <BookingForm 
                          propertyName={propertyData.title} 
                          pricePerPerson={parseInt(propertyData.price.replace(/[^\d]/g, "")) || 0}
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-16 rounded-2xl text-lg font-bold border-border/50 hover:bg-secondary transition-all flex items-center justify-center gap-3"
                        >
                          <Phone className="w-5 h-5 text-primary" />
                          Contact Host
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md rounded-[2rem]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-display text-center">How would you like to connect?</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-6">
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-3 h-32 rounded-3xl border-green-500/30 hover:bg-green-50 hover:border-green-500 text-green-600 transition-all group"
                            onClick={() => window.open(`https://api.whatsapp.com/send?phone=918669505727`, '_blank')}
                          >
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <MessageCircle className="w-6 h-6" />
                            </div>
                            <span className="font-bold">WhatsApp</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-3 h-32 rounded-3xl border-primary/30 hover:bg-primary/5 hover:border-primary text-primary transition-all group"
                            onClick={() => window.open(`tel:+918669505727`, '_self')}
                          >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Phone className="w-6 h-6" />
                            </div>
                            <span className="font-bold">Direct Call</span>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="pt-8 border-t border-border/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary border border-border/50">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Inquiry Support</p>
                        <p className="font-bold text-foreground">{propertyData.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
