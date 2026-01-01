// src/app/api/carts/route.js
import { connectDB } from "@/core/db";
import Cart from "@/core/models/Cart";
import { NextResponse } from "next/server";
import Producto from "@/core/models/producto";
import { validateCart } from "@/core/validators/cart";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, items, total } = body;

    // Validar
    const validation = validateCart({ userId, items, total });
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validación fallida",
        },
        { status: 400 }
      );
    }

    // Buscar o crear carrito
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items, total });
    } else {
      cart.items = items;
      cart.total = total;
    }

    await cart.save();

    return NextResponse.json(
      {
        success: true,
        message: "Carrito actualizado",
        data: cart,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/carts:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
