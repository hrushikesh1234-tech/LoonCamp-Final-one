import { ArrowUpRight } from "lucide-react";

interface DestinationCardProps {
  image: string;
  title: string;
  subtitle: string;
  overlayTitle: string;
  propertyCount?: number;
  categoryId?: string;
}

const DestinationCard = ({
  image,
  title,
  subtitle,
  overlayTitle,
  propertyCount = 6,
  categoryId
}: DestinationCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (categoryId) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('scrollToCategory', { detail: { categoryId } }));
    }
  };

  return (
    <a
      href="#properties"
      onClick={handleClick}
      className="group relative block overflow-hidden rounded-2xl aspect-[4/5] shadow-card hover:shadow-card-hover transition-all duration-700"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Title */}
        <div className="overflow-hidden">
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream font-semibold italic tracking-wide mb-2 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
            {overlayTitle}
          </h3>
        </div>

        {/* Subtitle & Property Count */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-cream/70 text-sm md:text-base font-light tracking-wide">
              {subtitle}
            </p>
            <p className="text-primary text-xs tracking-wider mt-1">
              {propertyCount}+ Premium Properties
            </p>
          </div>

          {/* Arrow */}
          <div className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
            <ArrowUpRight className="w-5 h-5 text-cream group-hover:text-primary-foreground transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* Top Badge */}
      <div className="absolute top-6 left-6 px-4 py-2 bg-cream/10 backdrop-blur-sm rounded-full border border-cream/20">
        <span className="text-cream text-xs tracking-wider uppercase font-medium">
          Popular
        </span>
      </div>
    </a>
  );
};

export default DestinationCard;
