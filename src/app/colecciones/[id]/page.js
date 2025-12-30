import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import NavbarMobile from "@/components/header/navbar/NavbarMobile";
import Loading from "@/components/loading/Loading";
import ColeccionId from "@/components/page-colecciones/coleccionesId/ColeccionId";
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
        <ColeccionId />
      </Suspense>
    </>
  );
};

export default page;
