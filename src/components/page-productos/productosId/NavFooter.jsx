import { formatoDinero } from "@/libs/formatoDinero";
import Image from "next/image";
import React from "react";

const NavFooter = ({ producto, setOpenModalTallas }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-50 text-segundo border-t border-segundo flex justify-around items-center py-1 shadow-lg transition-all duration-500 animate-fadeIn font-poppins z-20 gap-4">
      <div className="flex items-center gap-4 mx-4 md:mx-0">
        <div className="h-16 w-16 md:h-16 md:w-16 flex items-center gap-4">
          <Image
            src={producto?.imageUrl || "/logo/icon-2.png"}
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
        <button
          className="uppercase bg-segundo hover:bg-segundo/80 px-6 py-2 rounded-xs font-semibold text-sm text-primero hover:active:scale-95 transition-all duration-300 cursor-pointer select-none"
          onClick={() => setOpenModalTallas(true)}
        >
          agregar
        </button>
      </div>
    </nav>
  );
};

export default NavFooter;
