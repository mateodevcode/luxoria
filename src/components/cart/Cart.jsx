"use client";

import { useCartStore } from "@/core/store/cartStore";
import { formatoDinero } from "@/libs/formatoDinero";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();

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
            <div className="flex flex-col gap-1">
              <h4 className="font-medium text-xs">{item.productId.nombre}</h4>
              <p className="text-xs">Talla: {item.size}</p>
              <p className="text-segundo text-sm font-semibold">
                {formatoDinero(item.productId.precio)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              {item.quantity > 1 && (
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                  className="p-2 hover:bg-cuarto/10 rounded-xs h-10 w-10 flex items-center justify-center border border-segundo/10 cursor-pointer active:scale-95 duration-200 hover:text-cuarto"
                >
                  <Minus className="w-3 h-3" />
                </button>
              )}
              <span className="p-2 rounded-xs h-10 w-10 flex items-center justify-center border border-segundo/10 cursor-pointer active:scale-95 duration-200 select-none">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.size, item.quantity + 1)
                }
                className="p-2 hover:bg-cuarto/10 rounded-xs h-10 w-10 flex items-center justify-center border border-segundo/10 cursor-pointer active:scale-95 duration-200 hover:text-cuarto"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => removeItem(item.productId, item.size)}
              className="p-2 hover:bg-red-600/5 rounded-xs h-10 w-10 flex items-center justify-center border border-segundo/10 cursor-pointer active:scale-95 duration-200 hover:text-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
