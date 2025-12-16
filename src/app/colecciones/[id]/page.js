import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import Loading from "@/components/loading/Loading";
import ColeccionId from "@/components/page-colecciones/coleccionesId/ColeccionId";
import RedesLateral from "@/components/redes-lateral/RedesLateral";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <BannerTop />
      <Navbar />
      <RedesLateral />
      <Suspense fallback={<Loading />}>
        <ColeccionId />
      </Suspense>
    </>
  );
};

export default page;
