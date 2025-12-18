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

const ProductosId = () => {
  const { productos } = useContext(AppContext);
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
    <div className="bg-primero pb-20">
      <ProductoDetalle />

      <div className="w-11/12 md:w-9/12 mx-auto py-10">
        <SliderProducts
          productos={productos}
          titulo={"También te puede gustar"}
          recientes={false}
        />
      </div>

      <div className="w-8/12 mx-auto py-10">
        <ProductsExhibitions />
      </div>

      <div className="w-9/12 mx-auto py-10">
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
        <nav className="fixed bottom-0 left-0 w-full bg-gray-50 text-segundo border-t border-segundo flex justify-around items-center py-1 shadow-lg transition-all duration-500 animate-fadeIn font-poppins z-20 gap-4">
          <div className="flex items-center gap-4 mx-4 md:mx-0">
            <div className="h-16 w-16 md:h-16 md:w-16 flex items-center gap-4">
              <Image
                src={producto?.imageUrl}
                alt="imagen producto"
                className="h-full object-cover rounded-full"
                width={500}
                height={500}
              />
            </div>
            <div className="flex flex-col">
              <h3>{producto?.nombre}</h3>
              <p className="text-xs font-semibold">
                {formatoDinero(producto?.precio)}
              </p>
            </div>
            <div className="md:grid grid-cols-6 gap-1 hidden">
              {producto?.size.map((size) => (
                <button
                  key={size}
                  className="border border-segundo p-2 text-xs rounded font-semibold hover:border-cuarto transition-colors bg-primero hover:bg-cuarto/50"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-4 md:mx-0">
            <button className="uppercase bg-segundo hover:bg-segundo/80 px-6 py-2 rounded font-semibold text-sm text-primero hover:active:scale-95 transition-all duration-300">
              add
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default ProductosId;
