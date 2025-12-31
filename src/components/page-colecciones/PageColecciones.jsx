"use client";

import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Collections = () => {
  const { colecciones, productos } = useContext(AppContext);

  const numeroProductosColeccion = (id) => {
    return productos.filter((producto) => producto.coleccionId === id).length;
  };

  return (
    <div className="bg-primero dark:bg-segundo font-poppins">
      <div className="relative flex flex-col items-center py-8">
        <h2 className="text-xl font-semibold uppercase text-segundo dark:text-primero">
          Nuestras colecciones
        </h2>
        <div className="w-10 h-[3px] bg-cuarto mt-2"></div>
      </div>
      <div className="w-11/12 mx-auto pb-20 pt-10 gap-6 md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 hidden">
        {colecciones.map((item, index) => (
          <Link
            href={`/colecciones/${item.url}`}
            key={index}
            className="relative group overflow-hidden md:h-[400px] lg:h-[300px] cursor-pointer"
          >
            {/* Imagen con zoom suave */}
            <Image
              src={item.imageUrlHor || "/logo/icon-2.png"}
              alt={`Collection ${index + 1}`}
              width={800}
              height={800}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
            />

            {/* Overlay sin fondo, solo para contener las animaciones */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {/* Texto superior - Cantidad de productos */}
              <div className="transform -translate-y-full group-hover:translate-y-0 transition duration-1000 ease-out">
                <div className="text-primero mt-2 mx-2 py-2 px-4 rounded">
                  <p className="text-primero text-xl font-medium text-center drop-shadow-md">
                    {numeroProductosColeccion(item._id)} productos
                  </p>
                </div>
              </div>

              {/* Texto inferior - Ver colección */}
              <div className="transform translate-y-full group-hover:translate-y-0 transition duration-500 ease-out">
                <div className="text-primero mb-2 mx-2 py-2 px-4 flex items-center justify-center gap-2">
                  <p className="text-primero text-xl font-medium text-center cursor-pointer hover:text-gray-200 transition duration-1000 drop-shadow-md uppercase">
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
      <div className="w-full px-4 pb-5 flex md:hidden">
        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
          {colecciones.map((item, index) => (
            <Link
              href={`/colecciones/${item.url}`}
              key={index}
              className="relative group overflow-hidden h-[250px] cursor-pointer shrink-0 w-[400px]"
            >
              {/* Imagen con zoom suave */}
              <Image
                src={item.imageUrlHor || "/logo/icon-2.png"}
                alt={`Collection ${index + 1}`}
                width={800}
                height={800}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
              />

              {/* Overlay sin fondo, solo para contener las animaciones */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Texto superior - Cantidad de productos */}
                <div className="transform -translate-y-full group-hover:translate-y-0 transition duration-1000 ease-out">
                  <div className="text-primero mt-2 mx-2 py-2 px-4 rounded">
                    <p className="text-primero text-lg font-medium text-center drop-shadow-md">
                      {numeroProductosColeccion(item._id)} productos
                    </p>
                  </div>
                </div>

                {/* Texto inferior - Ver colección */}
                <div className="transform translate-y-full group-hover:translate-y-0 transition duration-500 ease-out">
                  <div className="text-primero mb-2 mx-2 py-2 px-4 flex items-center justify-center gap-2">
                    <p className="text-primero/80 text-lg font-medium text-center cursor-pointer hover:text-gray-200 transition duration-1000 drop-shadow-md uppercase">
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
