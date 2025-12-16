import Colecciones from "@/components/colecciones/Colecciones";
import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import Beneficios from "@/components/beneficios/Beneficios";
import Productos from "@/components/productos/Productos";
import Footer from "@/components/footer/Footer";
import RedesLateral from "@/components/redes-lateral/RedesLateral";
import ImageCarousel from "@/components/hero/ImageCarousel";
import ColeccionesCarousel from "@/components/colecciones/ColeccionesCarousel";
import CarruselInfinito from "@/components/beneficios/CarruselInfinito";
import ModalImagen from "@/components/page-productos/productosId/ModalImagen";

export default function Home() {
  return (
    <div className="relative font-poppins">
      <BannerTop />
      <Navbar />
      <RedesLateral />
      <Hero />
      <ImageCarousel />
      <Colecciones />
      <ColeccionesCarousel />
      {/* <Beneficios /> */}
      <CarruselInfinito />
      <Productos />
      <ModalImagen />
      <Footer />
      <style>{scrollbarStyles.home}</style>
    </div>
  );
}
