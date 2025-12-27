import Footer from "@/components/footer/Footer";
import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import NavbarMobile from "@/components/header/navbar/NavbarMobile";
import CategoriaSearch from "@/components/page-colecciones/CategoriaSearch";
import PageColecciones from "@/components/page-colecciones/PageColecciones";
import RedesLateral from "@/components/redes-lateral/RedesLateral";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="relative font-poppins">
      <BannerTop />
      <Navbar />
      <NavbarMobile />
      <RedesLateral />
      <PageColecciones />
      <Suspense fallback={<div>Loading...</div>}>
        <CategoriaSearch />
      </Suspense>
      <Footer />
      <style>{scrollbarStyles.home}</style>
    </div>
  );
};

export default page;
