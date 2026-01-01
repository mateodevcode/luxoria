import Footer from "@/components/footer/Footer";
import BannerTop from "@/components/header/banner-top/BannerTop";
import CarruselNav from "@/components/header/carrusel/CarruselNav";
import Navbar from "@/components/header/navbar/Navbar";
import NavbarMobile from "@/components/header/navbar/NavbarMobile";
import ModalCarritoCompras from "@/components/modales/carritoCompras/ModalCarritoCompras";
import ModalMenuHamburguesa from "@/components/modales/ModalMenuHamburguesa";
import PageProductos from "@/components/page-productos/PageProductos";
import ModalImagen from "@/components/page-productos/productosId/ModalImagen";
import RedesLateral from "@/components/redes-lateral/RedesLateral";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <div className="relative font-poppins">
      <BannerTop />
      <Navbar />
      <NavbarMobile />
      <CarruselNav />
      <RedesLateral />
      <PageProductos />
      <ModalImagen />
      <ModalCarritoCompras />
      <ModalMenuHamburguesa />
      <Footer />
      <style>{scrollbarStyles.home}</style>
    </div>
  );
};

export default page;
