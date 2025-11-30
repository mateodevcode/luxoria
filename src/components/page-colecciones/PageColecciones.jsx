"use client";

import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import React, { useContext } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Collections = () => {
  const { colecciones, productos } = useContext(AppContext);

  const numeroProductosColeccion = (id) => {
    return productos.filter((producto) => producto.coleccionId === id).length;
  };

  return (
    <div className="bg-whitebase-500 dark:bg-blackbase-500">
      <div className="relative flex flex-col items-center py-8">
        <h2 className="text-xl font-semibold uppercase font-montserrat text-blackbase-500 dark:text-whitebase-500">
          our collections
        </h2>
        <div className="w-10 h-[3px] bg-gray-300 mt-2"></div>
      </div>
      <div className="w-9/12 mx-auto pb-20 pt-10 gap-6 md:grid grid-cols-2 hidden">
        {colecciones.map((item, index) => (
          <Link
            href={`${item.url}`}
            key={index}
            className="relative group overflow-hidden bg-amber-300 h-[450px] cursor-pointer"
          >
            {/* Imagen con zoom suave */}
            <img
              src={`${item.imageUrl}`}
              alt={`Collection ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
            />

            {/* Nombre centrado (siempre visible) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold font-montserrat z-10 text-center px-4 drop-shadow-lg">
                {item.nombre}
              </h3>
            </div>

            {/* Overlay sin fondo, solo para contener las animaciones */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {/* Texto superior - Cantidad de productos */}
              <div className="transform -translate-y-full group-hover:translate-y-0 transition duration-1000 ease-out">
                <div className="text-white mt-2 mx-2 py-2 px-4 rounded">
                  <p className="text-white text-lg font-medium font-montserrat text-center drop-shadow-md">
                    {numeroProductosColeccion(item._id)} productos
                  </p>
                </div>
              </div>

              {/* Texto inferior - Ver colección */}
              <div className="transform translate-y-full group-hover:translate-y-0 transition duration-500 ease-out">
                <div className="text-white mb-2 mx-2 py-2 px-4 flex items-center justify-center gap-2">
                  <p className="text-white/80 text-lg font-medium font-montserrat text-center cursor-pointer hover:text-gray-200 transition duration-1000 drop-shadow-md uppercase">
                    ver colección
                  </p>
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Contenedor principal con scroll horizontal en móvil */}
      <div className="w-full px-4 pb-20 flex md:hidden">
        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
          {colecciones.map((item, index) => (
            <Link
              href={`${item.url}`}
              key={index}
              className="relative group overflow-hidden h-[250px] cursor-pointer flex-shrink-0 w-[300px]"
            >
              {/* Imagen con zoom suave */}
              <img
                src={`${item.imageUrl}`}
                alt={`Collection ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
              />

              {/* Nombre centrado (siempre visible) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-montserrat z-10 text-center px-4 drop-shadow-lg">
                  {item.nombre}
                </h3>
              </div>

              {/* Overlay sin fondo, solo para contener las animaciones */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Texto superior - Cantidad de productos */}
                <div className="transform -translate-y-full group-hover:translate-y-0 transition duration-1000 ease-out">
                  <div className="text-white mt-2 mx-2 py-2 px-4 rounded">
                    <p className="text-white text-lg font-medium font-montserrat text-center drop-shadow-md">
                      {numeroProductosColeccion(item._id)} productos
                    </p>
                  </div>
                </div>

                {/* Texto inferior - Ver colección */}
                <div className="transform translate-y-full group-hover:translate-y-0 transition duration-500 ease-out">
                  <div className="text-white mb-2 mx-2 py-2 px-4 flex items-center justify-center gap-2">
                    <p className="text-white/80 text-lg font-medium font-montserrat text-center cursor-pointer hover:text-gray-200 transition duration-1000 drop-shadow-md uppercase">
                      ver colección
                    </p>
                    <MdKeyboardArrowRight />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
