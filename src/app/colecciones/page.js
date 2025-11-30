import BannerTop from "@/components/header/banner-top/BannerTop";
import Navbar from "@/components/header/navbar/Navbar";
import PageColecciones from "@/components/page-colecciones/PageColecciones";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <div className="relative font-poppins">
      <BannerTop />
      <Navbar />
      <PageColecciones />
      <style>{scrollbarStyles.home}</style>
    </div>
  );
};

export default page;
