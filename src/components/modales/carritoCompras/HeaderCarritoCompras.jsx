"use client";

import { AppContext } from "@/context/AppContext";
import { useCart } from "@/core/hooks/useCart";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";

const HeaderCarritoCompras = () => {
  const { setOpenModalCarritoCompras } = useContext(AppContext);
  const { items } = useCart();

  return (
    <div className="bg-linear-to-r from-cuarto to-segundo px-6 py-3 flex justify-between items-center text-primero relative">
      <div className="flex items-center gap-2 relative">
        <h2 className=" text-xl font-semibold">Carrito</h2>
        {items.length > 0 && (
          <div className="text-xs font-bold  uppercase text-segundo absolute -top-1 -right-8 bg-primero/50 w-6 h-6 flex items-center justify-center rounded-full">
            {items.length}
          </div>
        )}
      </div>
      <button
        onClick={() => setOpenModalCarritoCompras(false)}
        className="text-2xl rounded-full p-1 cursor-pointer select-none active:scale-95 hover:rotate-180 duration-200"
      >
        <IoClose />
      </button>
    </div>
  );
};

export default HeaderCarritoCompras;
