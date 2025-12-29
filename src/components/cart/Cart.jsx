"use client";

import { useCartStore } from "@/core/store/cartStore";
import { formatoDinero } from "@/libs/formatoDinero";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-8 flex items-center justify-center gap-4 font-poppins">
        <ShoppingCart className="text-segundo/50" />
        <p className="text-segundo/50 text-lg">Carrito vacío</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-poppins">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 rounded-lg justify-between"
        >
          <div className="flex items-start gap-4">
            <Image
              src={item.productId.imageUrl}
              alt={item.productId.nombre}
              width={100}
              height={100}
              className="object-cover"
            />
            <div>
              <h4 className="font-semibold text-sm">{item.productId.nombre}</h4>
              <p>M</p>
              <p className="text-gray-600 text-xs">
                {formatoDinero(item.productId.precio)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center">
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
                disabled={item.quantity === 1}
                className="p-2 hover:bg-cuarto/10 rounded-xs h-10 w-10 flex items-center justify-center border border-segundo/10 cursor-pointer active:scale-95 duration-200"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="p-2 text-center font-bold h-10 w-10 flex items-center justify-center">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                className="p-2 hover:bg-cuarto/10 rounded-xs h-10 w-10 flex items-center justify-center border border-segundo/10 cursor-pointer active:scale-95 duration-200"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="p-2 hover:bg-red-600/5 rounded-xs h-10 w-10 flex items-center justify-center border border-segundo/10 cursor-pointer active:scale-95 duration-200"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}

      {/* <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold text-segundo">
            {formatoDinero(total)}
          </span>
        </div>
        <button
          onClick={clearCart}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xs"
        >
          Vaciar Carrito
        </button>
      </div> */}
    </div>
  );
}
