import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import DestinationGrid from "../components/DestinationGrid";
import TripGallery from "../components/TripGallery";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import ThemedFooterAlt from "../components/ThemedFooterAlt";

export default function Home() {
  return (
    <div style={{ width: '100vw', overflowX: 'hidden', backgroundColor: '#121212' }}>
      <HeroSection />
      <CategorySection />
      <DestinationGrid />
      <TripGallery />
      <Testimonials />
      <Footer />
    </div>
  );
}
