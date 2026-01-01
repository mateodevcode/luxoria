import Footer from "@/components/footer/Footer";
import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import NavbarMobile from "@/components/header/navbar/NavbarMobile";
import Loading from "@/components/loading/Loading";
import ModalCarritoCompras from "@/components/modales/carritoCompras/ModalCarritoCompras";
import ModalImagen from "@/components/page-productos/productosId/ModalImagen";
import ModalTallas from "@/components/page-productos/productosId/ModalTallas";
import ProductosId from "@/components/page-productos/productosId/ProductosId";
import RedesLateral from "@/components/redes-lateral/RedesLateral";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <BannerTop />
      <Navbar />
      <NavbarMobile />
      <RedesLateral />
      <Suspense fallback={<Loading />}>
        <ProductosId />
      </Suspense>
      <Footer />
      <ModalTallas />
      <ModalImagen />
      <ModalCarritoCompras />
    </>
  );
};

export default page;
