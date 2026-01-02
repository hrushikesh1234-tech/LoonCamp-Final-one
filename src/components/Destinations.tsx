import DestinationCard from "./DestinationCard";
import pawnaLake from "@/assets/pawna-lake.jpg";
import lonavala from "@/assets/lonavala.jpg";

const destinations = [
  {
    image: pawnaLake,
    title: "Pawna Lake",
    subtitle: "Lakeside Luxury Retreats",
    overlayTitle: "Pawna Lake",
    propertyCount: 8,
    categoryId: "camping"
  },
  {
    image: lonavala,
    title: "Lonavala",
    subtitle: "Mountain Escapes",
    overlayTitle: "Lonavala",
    propertyCount: 5,
    categoryId: "villa"
  },
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4 animate-fade-up">
            Discover
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold mb-6 animate-fade-up delay-100">
            Choose Your Escape
          </h2>
          <div className="flex items-center justify-center gap-3 animate-fade-up delay-200">
            <div className="w-12 h-px bg-border" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-12 h-px bg-border" />
          </div>
        </div>

        {/* Destination Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          {destinations.map((destination, index) => (
            <div
              key={destination.title}
              className="animate-fade-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <DestinationCard {...destination} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
