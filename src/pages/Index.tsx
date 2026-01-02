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
        <title>LoonCamp - Book Resorts & Cottages Near Pawna Lake, Lonavala</title>
        <meta
          name="description"
          content="Book luxury glamping domes, cottages, and resorts near Pawna Lake and Lonavala. Experience nature with private pools, lake views, and all-inclusive packages."
        />
        <meta
          name="keywords"
          content="Pawna Lake resorts, Lonavala cottages, glamping, dome resort, lakeside stay, weekend getaway"
        />
        <link rel="canonical" href="https://leestays.com" />
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
