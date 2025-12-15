import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Colecciones = () => {
  const colecciones = [
    {
      id: 1,
      title: "Colección 1",
      image: "/colecciones/billance-fondo.png",
      description: "Descripción colección 1",
    },
    {
      id: 2,
      title: "Colección 2",
      image: "/colecciones/nova-fondo.png",
      description: "Descripción colección 2",
    },
    {
      id: 3,
      title: "Colección 3",
      image: "/colecciones/prisma-fondo.png",
      description: "Descripción colección 3",
    },
  ];

  return (
    <div className="w-full border-b border-segundo">
      <div className="grid grid-cols-3 gap-0">
        {colecciones.map((coleccion, index) => (
          <div
            key={index}
            className={`group relative h-72 overflow-hidden cursor-pointer transition-all duration-300 ${
              index === 1 ? "border-l border-r border-segundo/20" : ""
            }`}
          >
            <Image
              src={coleccion.image}
              alt={coleccion.title}
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
