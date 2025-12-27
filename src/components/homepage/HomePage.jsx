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
import ModalMenuHamburguesa from "@/components/modales/ModalMenuHamburguesa";
import NavbarMobile from "../header/navbar/NavbarMobile";
import SearchResult from "../header/hover-card/SearchResult";
import Search from "../header/hover-card/Search";

export default function HomePage() {
  return (
    <div className="relative font-poppins">
      <BannerTop />
      <Navbar />
      <NavbarMobile />
      <Search />
      <SearchResult />
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
      <ModalMenuHamburguesa />
      <Reviews />
      <Footer />
      <style>{scrollbarStyles.home}</style>
    </div>
  );
}
