// src/app/api/carts/route.js

import { connectDB } from "@/core/db";
import { Cart } from "@/core/models/Cart";
import { validateCart } from "@/core/validators/cart";
import { successResponse, errorResponse } from "@/core/utils/response";
import { ValidationError } from "@/core/utils/errors";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, items, total } = body;

    // Validar
    const validation = validateCart({ userId, items, total });
    if (!validation.isValid) {
      throw new ValidationError("Validación fallida", validation.errors);
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

    const response = successResponse(cart, "Carrito actualizado", 201);
    return new Response(response.body, { status: response.statusCode });
  } catch (error) {
    console.error("Error en POST /api/carts:", error);

    if (error instanceof ValidationError) {
      const response = errorResponse(error.errors, error.message, 400);
      return new Response(response.body, { status: response.statusCode });
    }

    const response = errorResponse(
      { error: error.message },
      "Error creando carrito",
      500
    );
    return new Response(response.body, { status: response.statusCode });
  }
}
