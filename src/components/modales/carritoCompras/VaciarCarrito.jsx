"use client";

import { useCart } from "@/core/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import React from "react";

const VaciarCarrito = () => {
  const { clearCart, items } = useCart();

  return (
    <>
      {items.length > 0 && (
        <div
          className="w-full flex items-center justify-end gap-2 text-segundo cursor-pointer select-none active:scale-95 duration-200 hover:text-red-600 p-4"
          onClick={() => clearCart()}
        >
          <span className="text-xs">Vaciar carrito</span>
          <ShoppingBag className="w-3 h-3" />
        </div>
      )}
    </>
  );
};

export default VaciarCarrito;
