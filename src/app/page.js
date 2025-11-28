import Colecciones from "@/components/colecciones/Colecciones";
import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import Beneficios from "@/components/beneficios/Beneficios";
import Productos from "@/components/productos/Productos";

export default function Home() {
  return (
    <div className="relative font-poppins">
      <BannerTop />
      <Navbar />
      <Hero />
      <Colecciones />
      <Beneficios />
      <Productos />
      <style>{scrollbarStyles.home}</style>
    </div>
  );
}
