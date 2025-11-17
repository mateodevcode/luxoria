import Colecciones from "@/components/colecciones/Colecciones";
import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";

export default function Home() {
  return (
    <div className="relative">
      <BannerTop />
      <Navbar />
      <Hero />
      <Colecciones />
      <style>{scrollbarStyles.home}</style>
    </div>
  );
}
