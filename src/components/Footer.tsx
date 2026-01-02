import { Instagram, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Properties", href: "#properties" },
  { name: "Destinations", href: "#destinations" },
  { name: "About Us", href: "#" },
  { name: "FAQs", href: "#" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-header text-header-foreground relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center">
                <span className="text-primary font-display text-lg font-semibold">LC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-display font-semibold tracking-[0.15em]">
                  LoonCamp
                </span>
                <span className="text-header-foreground/50 text-[10px] tracking-[0.2em] uppercase">
                  Luxury Escapes
                </span>
              </div>
            </div>
            <p className="text-header-foreground/60 text-sm leading-relaxed mb-6">
              Curating extraordinary escapes at Pawna Lake and Lonavala.
              Experience luxury, nature, and unforgettable memories.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/leestays/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-header-foreground/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Follow on Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-cream">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-header-foreground/60 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-cream">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+918669505727"
                className="flex items-center gap-3 text-header-foreground/60 hover:text-primary transition-colors duration-300 text-sm"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-header-foreground/5">
                  <Phone size={14} />
                </div>
                <span>+91 8669 505 727</span>
              </a>
              <a
                href="mailto:hrushikeshmore953@gmail.com"
                className="flex items-center gap-3 text-header-foreground/60 hover:text-primary transition-colors duration-300 text-sm"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-header-foreground/5">
                  <Mail size={14} />
                </div>
                <span>hrushikeshmore953@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-header-foreground/60 text-sm">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-header-foreground/5 flex-shrink-0">
                  <MapPin size={14} />
                </div>
                <span>Pawna Lake, Lonavala,<br />Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-cream">
              Book Your Stay
            </h4>
            <p className="text-header-foreground/60 text-sm mb-6">
              Ready for an extraordinary escape? Get in touch for personalized recommendations.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=+918669505727&text=I%27m%20interested%20in%20booking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-gold"
            >
              Start Planning
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-header-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-header-foreground/40 text-sm">
            © {new Date().getFullYear()} LoonCamp. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-header-foreground/40">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
