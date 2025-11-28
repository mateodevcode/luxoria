"use client";

import React, { useContext, useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { BsFilter, BsFilterLeft } from "react-icons/bs";
import { MdApps } from "react-icons/md";
import { CollectionCard } from "./CollectionCard";
import { FaSquare } from "react-icons/fa6";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";

const ListaProductos = ({ filtroProductos }) => {
  const { productos } = useContext(AppContext);
  const [sizeGrid, setSizeGrid] = useState("grid-cols-4");
  const [isPromotionVisible, setIsPromotionVisible] = useState(true);
  const [haveAPromo, setHaveAPromo] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobil: sm, md
        setSizeGrid("grid-cols-1");
      } else {
        // Desktop: lg, xl, 2xl - Siempre 4 columnas cuando hay publicidad
        setSizeGrid(isPromotionVisible ? "grid-cols-4" : "grid-cols-4");
      }
    };

    // Ejecutar al cargar
    handleResize();

    // Escuchar cambios
    window.addEventListener("resize", handleResize);

    // Limpiar evento
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isPromotionVisible]);

  // const collections = [
  //   {
  //     id: 1,
  //     title: "Casa Nova Trunk",
  //     price: "$160.00",
  //     priceEUR: "€150.00",
  //     images: ["/seccion/slider/slider-2.png", "/seccion/slider/slider.png"],
  //     alt: "Casa Nova Trunk",
  //     tags: ["Popular", "Summer"],
  //     discount: "20%",
  //     url: "/products/collectios-1",
  //   },
  //   {
  //     id: 2,
  //     title: "Urban Explorer Backpack",
  //     price: "$120.00",
  //     priceEUR: "€110.00",
  //     images: [
  //       "/seccion/slider/slider.png",
  //       "/seccion/slider/slider-2.png",
  //       "/seccion/slider/slider.png",
  //     ],
  //     alt: "Urban Explorer Backpack",
  //     tags: ["New", "Trending"],
  //     discount: "15%",
  //     url: "/products/collectios-2",
  //   },
  //   {
  //     id: 3,
  //     title: "Minimalist Tote Bag",
  //     price: "$90.00",
  //     priceEUR: "€85.00",
  //     images: ["/seccion/slider/slider-2.png", "/seccion/slider/slider.png"],
  //     alt: "Minimalist Tote Bag",
  //     tags: ["Bestseller"],
  //     discount: "10%",
  //     url: "/products/collectios-3",
  //   },
  //   {
  //     id: 4,
  //     title: "Leather Crossbody",
  //     price: "$200.00",
  //     priceEUR: "€190.00",
  //     images: ["/seccion/slider/slider.png", "/seccion/slider/slider-2.png"],
  //     alt: "Leather Crossbody",
  //     tags: ["Luxury"],
  //     discount: "25%",
  //     url: "/products/collectios-4",
  //   },
  //   {
  //     id: 5,
  //     title: "Sport Utility Pack",
  //     price: "$130.00",
  //     priceEUR: "€120.00",
  //     images: ["/seccion/slider/slider-2.png", "/seccion/slider/slider.png"],
  //     alt: "Sport Utility Pack",
  //     tags: ["Active"],
  //     discount: "18%",
  //     url: "/products/collectios-5",
  //   },
  // ];

  // Función para filtrar productos según el tab activo
  const getProductosFiltrados = () => {
    switch (filtroProductos) {
      case "recien_llegados":
        // Últimos 7 productos ordenados por createdAt (más recientes primero)
        return productos
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 7);

      case "ofertas":
        // Solo productos donde isOferta es true
        return productos.filter((producto) => producto.isOferta === true);

      case "todo_el_catalogo":
        // Todos los productos
        return productos;

      default:
        return productos;
    }
  };

  const productosFiltrados = getProductosFiltrados();

  return (
    <div className="w-full h-full bg-primero dark:bg-segundo p-6 pb-20">
      <div className="flex items-center justify-center w-full border border-segundo/20 dark:border-primero/20 h-14">
        <div className="h-full flex items-center justify-center gap-2 border-r border-segundo/20 dark:border-primero/20 px-4 text-segundo dark:text-primero">
          <span className="font-semibold text-sm">Filtros</span>
          <BsFilter className="text-2xl" />
        </div>
        {/* <div className="h-full flex items-center justify-center gap-2 border-r border-segundo/20 dark:border-primero/20 px-4 text-segundo dark:text-primero">
          <span className="font-semibold text-sm">Featured</span>
          <BsFilterLeft className="text-2xl" />
        </div> */}
        <div className="w-full h-full md:flex items-center justify-end gap-2 mx-4 hidden text-segundo dark:text-primero">
          <button
            className="cursor-pointer select-none active:scale-95 transition-all duration-200"
            onClick={() => setSizeGrid("grid-cols-3")}
          >
            <AiFillAppstore className="text-2xl" />
          </button>
          <button
            className="cursor-pointer select-none active:scale-95 transition-all duration-200"
            onClick={() => setSizeGrid("grid-cols-4")}
          >
            <MdApps className="text-2xl" />
          </button>
        </div>
        {/* Mobile */}
        <div className="w-full h-full flex items-center justify-end gap-2 mx-4 md:hidden">
          <button
            className="cursor-pointer select-none active:scale-95 transition-all duration-200 text-segundo dark:text-primero hover:text-segundo/70 dark:hover:text-primero/70"
            onClick={() => setSizeGrid("grid-cols-1")}
          >
            <FaSquare className="text-xl" />
          </button>
          <button
            className="cursor-pointer select-none active:scale-95 transition-all duration-200 text-segundo dark:text-primero hover:text-segundo/70 dark:hover:text-primero/70"
            onClick={() => setSizeGrid("grid-cols-2")}
          >
            <AiFillAppstore className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Grid de colecciones */}
      <div className={`grid gap-6 md:gap-6 mt-8 ${sizeGrid}`}>
        {/* Publicidad condicional - siempre primera */}
        {haveAPromo && (
          <div className="overflow-hidden flex items-center justify-start h-[600px] flex-col">
            <div className="bg-linear-to-br from-gray-200 via-gray-100 to-gray-300 hover:via-gray-300 w-full h-full text-segundo flex items-center justify-center flex-col max-h-[500px] transition-all duration-300">
              <img
                src="/colecciones/billance-2.png"
                alt="promo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Colecciones */}
        {productosFiltrados.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 overflow-hidden"
          >
            <CollectionCard item={item} filtroProductos={filtroProductos} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProductos;
