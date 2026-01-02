import { Phone, MessageCircle } from "lucide-react";

const FloatingContact = () => {
  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-4">
      {/* WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=+918669505727&text=I%27m%20interested%20in%20booking"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] text-primary-foreground rounded-full shadow-card hover:shadow-card-hover hover:scale-110 transition-all duration-500"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
      </a>

      {/* Phone */}
      <a
        href="tel:+918669505727"
        className="group flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-gold hover:shadow-card-hover hover:scale-110 transition-all duration-500 animate-pulse-glow"
        aria-label="Call us"
      >
        <Phone size={24} className="group-hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  );
};

export default FloatingContact;
