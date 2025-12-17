import React from "react";
import CardCarrusel from "./CardCarrusel";
import { carruselnav } from "@/data/data.carrusel.nav";

const CarruselNav = () => {
  return (
    <div className="w-full h-[120px] bg-primero overflow-x-auto flex md:hidden">
      <div className="flex items-center px-4 h-full gap-5">
        {carruselnav.map((item, index) => (
          <CardCarrusel
            key={index}
            imageUrl={item.imageUrl}
            titulo={item.titulo}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
};

export default CarruselNav;
