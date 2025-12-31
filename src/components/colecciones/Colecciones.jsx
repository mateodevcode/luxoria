"use client";

import { AppContext } from "@/context/AppContext";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Colecciones = () => {
  const { anchoPantalla, colecciones } = useContext(AppContext);
  const router = useRouter();

  const coleccionesMobile = colecciones.slice(0, 2);
  const coleccionesShow =
    anchoPantalla < 1020 ? coleccionesMobile : colecciones;

  return (
    <div className="w-full border-b border-segundo">
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-0">
        {coleccionesShow.map((coleccion, index) => (
          <div
            key={index}
            onClick={() => router.push(`/colecciones/${coleccion.url}`)}
            className={`group relative h-72 overflow-hidden cursor-pointer transition-all duration-300 ${
              index === 1 ? "border-l border-r border-segundo/20" : ""
            }`}
          >
            <Image
              src={coleccion.imageUrlPortada || "/logo/logo.png"}
              alt={coleccion.nombre || "banner"}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

            {/* Contenido */}
            <div className="absolute bottom-4 left-8 flex items-center justify-center text-center text-segundo/70 group-hover:text-cuarto p-4 z-10 gap-2 transition-all duration-300">
              <h3 className="text-base font-light">Comprar ahora</h3>
              <MoveRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colecciones;
