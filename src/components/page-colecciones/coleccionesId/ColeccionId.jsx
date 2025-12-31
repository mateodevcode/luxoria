"use client";

import React, { useContext, useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { BsFilter, BsFilterLeft } from "react-icons/bs";
import { MdApps } from "react-icons/md";
import { FaSquare } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import Link from "next/link";
import { CollectionCard } from "@/components/productos/CollectionCard";
import { AppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import { obtenerPrimeraFrase } from "@/libs/obtenerPrimeraFrase";

const ColeccionId = () => {
  const { productos, colecciones, anchoPantalla } = useContext(AppContext);
  const [sizeGrid, setSizeGrid] = useState("grid-cols-4");
  const [isPromotionVisible, setIsPromotionVisible] = useState(true);
  const [haveAPromo, setHaveAPromo] = useState(true);
  const params = useParams();

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

  const coleccionActual = colecciones.find((col) => col.url === params.id);
  const caracteristicas = coleccionActual?.caracteristicas || [];

  // Función para filtrar productos según el tab activo
  const getProductosFiltrados = () => {
    const collectionId = params.id;
    const idColeccion = colecciones.find((col) => col.url === collectionId);

    return productos.filter(
      (producto) => producto.coleccionId === idColeccion._id
    );
  };

  const productosFiltrados = getProductosFiltrados();

  const obtenerCaracteristicasProducto = (descripcion, icono = null) => {
    const frases = descripcion
      .split(/(?:\.\s+|\n\n)/)
      .map((f) => f.trim())
      .filter((f) => f.length > 0)
      .map((f) => (f.endsWith(".") ? f : f + "."));

    return { frases, icono };
  };

  // Uso en el componente
  const productoInfo = obtenerCaracteristicasProducto(
    productos[0]?.detalles || "",
    "CiCircleCheck"
  );

  return (
    <div className="w-full h-full bg-primero dark:bg-segundo p-0 md:p-6 pb-20">
      <h2 className="text-2xl md:text-3xl uppercase font-medium px-2 text-segundo text-center md:text-left mt-4 md:mt-0">
        {params.id}
      </h2>
      <div className="flex md:hidden text-center w-full mt-2 items-center justify-center text-sm">
        <span>{obtenerPrimeraFrase(coleccionActual?.descripcion)}</span>
      </div>

      <div className="w-full flex mt-4 md:mt-2 md:rounded-lg md:flex-row flex-col p-0 overflow-hidden">
        {/* Imagen - izquierda */}
        <div className="w-full md:w-1/2 h-60 md:h-96">
          <Image
            src={coleccionActual?.imageUrlHor || "/logo/logo.png"}
            alt={coleccionActual?.nombre || "banner"}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido - derecha */}
        <div className="w-full md:w-1/2 h-60 md:h-96 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-col p-6 font-light">
          <ul className="flex flex-col gap-4 text-segundo text-sm md:text-base justify-start w-full">
            {caracteristicas.map((frase, index) => (
              <li
                key={`caracteristica-${index}`}
                className="flex items-center gap-2 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CiCircleCheck className="text-2xl text-primario shrink-0" />
                <span className="text-xs md:text-lg leading-relaxed">
                  {frase}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center w-full border border-segundo/20 dark:border-primero/20 h-14 mt-10">
        <div className="h-full flex items-center justify-center gap-2 border-r border-segundo/20 dark:border-primero/20 px-4 text-segundo">
          <span className="font-semibold text-sm">Filter</span>
          <BsFilter className="text-2xl" />
        </div>
        <div className="h-full flex items-center justify-center gap-2 border-r border-segundo/20 dark:border-primero/20 px-4 text-segundo">
          <span className="font-semibold text-sm">Featured</span>
          <BsFilterLeft className="text-2xl" />
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
            className="cursor-pointer select-none active:scale-95 transition-all duration-200 text-segundo hover:text-segundo/70 dark:hover:text-primero/70"
            onClick={() => setSizeGrid("grid-cols-1")}
          >
            <FaSquare className="text-xl" />
          </button>
          <button
            className="cursor-pointer select-none active:scale-95 transition-all duration-200 text-segundo hover:text-segundo/70 dark:hover:text-primero/70"
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
            <div className="bg-linear-to-br from-primero via-primero/50 to-primero/50 w-full h-full text-segundo flex items-center justify-center flex-col max-h-[500px] transition-all duration-300">
              {/* <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2">¡Oferta Especial!</h3>
                <p className="text-lg">Hasta 50% de descuento</p>
                <p className="text-sm mt-2">No te lo pierdas</p>
                <button className="mt-4 bg-black text-primero px-4 py-2 rounded-lg hover:bg-segundo/80 transition-colors">
                  Ver Oferta
                </button>
              </div> */}
              <Image
                src={coleccionActual?.imageUrlVer || "/logo/icon-2.png"}
                alt={coleccionActual?.nombre || "promo"}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        )}

        {/* Colecciones */}
        {productosFiltrados.map((item, index) => (
          <Link
            href={`/productos/${item.url}`}
            key={index}
            className="bg-gray-100 dark:bg-gray-800 overflow-hidden"
          >
            <CollectionCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ColeccionId;
