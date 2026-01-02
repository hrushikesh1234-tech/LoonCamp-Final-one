import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Star, MapPin, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

interface PropertyCardProps {
  id?: string;
  images?: string[];
  image: string; // fallback for single image
  title: string;
  price: string;
  priceNote: string;
  amenities: string[];
  isTopSelling?: boolean;
  location?: string;
  rating?: number;
}

const PropertyCard = ({
  id = "1",
  images,
  image,
  title,
  price,
  priceNote,
  amenities,
  isTopSelling = false,
  location = "Pawna Lake",
  rating = 4.9,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  const propertyImages = images && images.length > 0 ? images : [image];

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/property/${id}`;
    const text = `🏡 *${title}*\n📍 ${location}\n💰 *${price}* ${priceNote}\n\nCheck out this beautiful property on LoonCamp:\n${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://api.whatsapp.com/send?phone=918669505727&text=I%27m%20interested%20in%20booking%20${encodeURIComponent(title)}`, '_blank');
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      // Swipe left -> next image
      setCurrentImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));
    } else if (diff < -minSwipeDistance) {
      // Swipe right -> prev image
      setCurrentImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="group h-full">
      <div className="bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-700 hover:-translate-y-2 cursor-pointer h-full relative border border-border/50">
        <div 
          className="block h-full"
          onClick={() => navigate(`/property/${id}`)}
        >
          {/* Image Container */}
          <div 
            className="relative overflow-hidden aspect-[4/3]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={propertyImages[currentImageIndex]}
              alt={title}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
            />

            {/* Navigation Arrows (Visible on hover) */}
            {propertyImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Dots indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {propertyImages.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex ? "bg-primary w-4" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Top Badge */}
            {isTopSelling && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-medium px-3 py-1.5 shadow-gold border-none">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Top Rated
              </Badge>
            )}

            {/* Rating Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-card/90 backdrop-blur-md rounded-full">
              <Star className="w-3 h-3 text-primary fill-primary" />
              <span className="text-foreground text-sm font-medium">{rating}</span>
            </div>

            {/* Quick Action Overlay (Mobile Friendly) */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-primary shadow-lg"
                onClick={handleShare}
                title="Share on WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-primary hover:bg-gold-light text-primary-foreground shadow-lg"
                onClick={handleBookNow}
                title="Book Now"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>

            {/* Location */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-cream text-sm z-20">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>

            {/* Amenities Preview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-[10px] uppercase tracking-wider px-2 py-1 bg-secondary text-muted-foreground rounded-md font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-primary">
                  {price}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{priceNote}</span>
              </div>

              <Button variant="link" className="text-primary font-medium p-0 h-auto hover:text-gold-light group/link">
                View Details
                <span className="inline-block transition-transform group-hover/link:translate-x-1 ml-1">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
