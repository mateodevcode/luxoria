"use client";

import React, { useContext, useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { BsFilter, BsFilterLeft } from "react-icons/bs";
import { MdApps } from "react-icons/md";
import { CollectionCard } from "./CollectionCard";
import { FaSquare } from "react-icons/fa6";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { promoProductos } from "@/data/data.promo";

const ListaProductos = ({ filtroProductos }) => {
  const { productos, anchoPantalla } = useContext(AppContext);
  const [sizeGrid, setSizeGrid] = useState("grid-cols-4");
  const [isPromotionVisible, setIsPromotionVisible] = useState(true);
  const [haveAPromo, setHaveAPromo] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (anchoPantalla < 768) {
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
  }, [isPromotionVisible, anchoPantalla]);

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
    <div className="w-full h-full bg-primero p-6 pb-20">
      <div className="flex items-center justify-center w-full border border-segundo/20 h-14">
        <div className="h-full flex items-center justify-center gap-2 border-r border-segundo/20 px-4 text-segundo">
          <span className="text-sm">Filtros</span>
          <BsFilter className="text-2xl" />
        </div>
        <div className="h-full flex items-center justify-center gap-2 px-4 text-segundo w-full md:w-80">
          <span className="text-xs md:text-sm">
            Mostrando {productosFiltrados.length} de {productos.length}{" "}
            productos
          </span>
          {/* <BsFilterLeft className="text-2xl" /> */}
        </div>
        <div className="w-full h-full md:flex items-center justify-end gap-2 mx-4 hidden text-segundo">
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
            className="cursor-pointer select-none active:scale-95 transition-all duration-200 text-segundo hover:text-segundo/70"
            onClick={() => setSizeGrid("grid-cols-1")}
          >
            <FaSquare className="text-xl" />
          </button>
          <button
            className="cursor-pointer select-none active:scale-95 transition-all duration-200 text-segundo hover:text-segundo/70"
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
          <Link
            href={`${promoProductos.url}`}
            className="overflow-hidden flex items-center justify-start h-[600px] flex-col"
          >
            <div className="bg-linear-to-br from-gray-200 via-gray-100 to-gray-300 hover:via-gray-300 w-full h-full text-segundo flex items-center justify-center flex-col max-h-[500px] transition-all duration-300">
              <Image
                src={promoProductos.src}
                alt={promoProductos.alt}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
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
