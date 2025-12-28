"use client";

import { useCartStore } from "@/core/store/cartStore";
import { Trash2, Plus, Minus } from "lucide-react";

export function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Carrito vacío</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
        >
          <div className="flex-1">
            <h4 className="font-bold">{item.name}</h4>
            <p className="text-gray-600">${item.price}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              disabled={item.quantity === 1}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <p className="font-bold w-24 text-right">
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            onClick={() => removeItem(item.productId)}
            className="p-2 hover:bg-red-100 rounded text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold text-yellow-600">
            ${total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={clearCart}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded"
        >
          Vaciar Carrito
        </button>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded mt-2">
          Proceder al Pago
        </button>
      </div>
    </div>
  );
}
