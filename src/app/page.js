import Colecciones from "@/components/colecciones/Colecciones";
import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import Productos from "@/components/productos/Productos";
import Footer from "@/components/footer/Footer";
import RedesLateral from "@/components/redes-lateral/RedesLateral";
import ImageCarousel from "@/components/hero/ImageCarousel";
import ColeccionesCarousel from "@/components/colecciones/ColeccionesCarousel";
import CarruselInfinito from "@/components/beneficios/CarruselInfinito";
import ModalImagen from "@/components/page-productos/productosId/ModalImagen";
import ModalCarritoCompras from "@/components/modales/ModalCarritoCompras";
import CarruselNav from "@/components/header/carrusel/CarruselNav";
import Reviews from "@/components/reviews/Reviews";
import ModalReview from "@/components/reviews/ModalReviews";
import CarruselBanner from "@/components/carrusel-banner/CarruselBanner";

export default function Home() {
  return (
    <div className="relative font-poppins">
      <BannerTop />
      <Navbar />
      <CarruselNav />
      <RedesLateral />
      <Hero />
      <ImageCarousel />
      <Colecciones />
      <ColeccionesCarousel />
      <CarruselInfinito />
      <Productos />
      <ModalImagen />
      <ModalCarritoCompras />
      <CarruselBanner />
      <ModalReview />
      <Reviews />
      <Footer />
      <style>{scrollbarStyles.home}</style>
    </div>
  );
}
