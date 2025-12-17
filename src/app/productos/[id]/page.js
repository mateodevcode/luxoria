import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import Loading from "@/components/loading/Loading";
import ModalCarritoCompras from "@/components/modales/ModalCarritoCompras";
import ModalImagen from "@/components/page-productos/productosId/ModalImagen";
import ProductosId from "@/components/page-productos/productosId/ProductosId";
import RedesLateral from "@/components/redes-lateral/RedesLateral";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <BannerTop />
      <Navbar />
      <RedesLateral />
      <Suspense fallback={<Loading />}>
        <ProductosId />
      </Suspense>
      <ModalImagen />
      <ModalCarritoCompras />
    </>
  );
};

export default page;
