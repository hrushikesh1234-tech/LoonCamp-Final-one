import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-resort.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury dome resort by the lake at sunset"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/30 to-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-transparent to-navy/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 md:left-16 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-fade-in delay-700" />
      <div className="absolute top-1/3 right-8 md:right-16 w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-fade-in delay-800" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Tagline */}
        <div className="overflow-hidden mb-6">
          <p className="text-primary text-sm md:text-base tracking-[0.4em] uppercase font-medium animate-fade-up">
            Experience Extraordinary
          </p>
        </div>

        {/* Main Title */}
        <div className="overflow-hidden mb-8">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold text-cream tracking-[0.08em] animate-fade-up delay-200">
            LoonCamp
          </h1>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up delay-300">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-primary" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden mb-12">
          <p className="text-cream/80 text-lg md:text-xl lg:text-2xl font-light tracking-wide animate-fade-up delay-400">
            Curated Luxury Resorts & Cottages
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-500">
          <a
            href="#properties"
            className="group px-10 py-4 bg-primary text-primary-foreground font-medium tracking-wider rounded-full hover:bg-gold-light transition-all duration-500 hover:shadow-gold hover:scale-105"
          >
            Explore Properties
          </a>
          <a
            href="#destinations"
            className="px-10 py-4 border border-cream/30 text-cream font-medium tracking-wider rounded-full hover:border-primary hover:text-primary transition-all duration-500 hover:bg-cream/5"
          >
            View Destinations
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <a
          href="#destinations"
          className="flex flex-col items-center gap-2 text-cream/60 hover:text-primary transition-colors duration-300"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>

      {/* Corner Decorations */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/20 rounded-br-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 rounded-bl-3xl" />
    </section>
  );
};

export default Hero;
