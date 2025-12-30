"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { SliderProducts } from "./SliderProducts";
import ProductsExhibitions from "./ProductsExhibitions";
import ProductoDetalle from "./ProductoDetalle";
import Image from "next/image";
import { AppContext } from "@/context/AppContext";
import { formatoDinero } from "@/libs/formatoDinero";
import { useVistoReciente } from "@/hooks/useVistoReciente";
import { useParams } from "next/navigation";
import NavFooter from "./NavFooter";

const ProductosId = () => {
  const { productos, setOpenModalTallas } = useContext(AppContext);
  const [showFooterNav, setShowFooterNav] = useState(false);
  const targetRef = useRef(null);
  const { recentlyViewed, addViewed, clearViewed, isLoaded } =
    useVistoReciente();
  const params = useParams();
  const producto = productos.find((producto) => producto.url === params.id);

  useEffect(() => {
    if (!producto) return;
    addViewed(producto?._id);
  }, [producto?._id, addViewed]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const halfPage = document.body.scrollHeight / 8;
      setShowFooterNav(scrollY > halfPage);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setShowFooterNav(true);
        });
      },
      { threshold: 0.3 }
    );

    if (targetRef.current) observer.observe(targetRef.current);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, []);

  return (
    <div className="bg-primero pb-20 font-poppins">
      <ProductoDetalle />

      <div className="w-11/12 md:w-9/12 mx-auto py-10">
        <SliderProducts
          productos={productos}
          titulo={"También te puede gustar"}
          recientes={false}
        />
      </div>

      <div className="w-11/12 md:w-9/12 mx-auto py-10">
        <ProductsExhibitions />
      </div>

      <div className="w-11/12 md:w-9/12 mx-auto py-10">
        {isLoaded && recentlyViewed.length > 0 && (
          <SliderProducts
            productos={
              productos.filter((p) => recentlyViewed.includes(p._id)) || []
            }
            titulo={"Productos recientemente vistos"}
            recientes={true}
          />
        )}
      </div>

      {showFooterNav && (
        <NavFooter
          producto={producto}
          setOpenModalTallas={setOpenModalTallas}
        />
      )}
    </div>
  );
};

export default ProductosId;
