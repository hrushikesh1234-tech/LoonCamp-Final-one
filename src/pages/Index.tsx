import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Properties from "@/components/Properties";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LoonCamp - #1 Luxury Pawna Lake Camping & Lonavala Villa Booking</title>
        <meta
          name="description"
          content="LoonCamp offers the best luxury glamping domes at Pawna Lake and premium villas in Lonavala. Book lakeside camping with pool, AC, and meals. Top-rated stays near Mumbai & Pune."
        />
        <meta
          name="keywords"
          content="Pawna camping, Pawna Lake resorts, Lonavala villa booking, glamping near Mumbai, luxury dome resort, lakeside stay Lonavala"
        />
        <link rel="canonical" href="https://looncamp.com" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Destinations />
          <Properties />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </>
  );
};

export default Index;
