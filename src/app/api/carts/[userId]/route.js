// src/app/api/carts/[userId]/route.js

import { connectDB } from "@/core/db";
import { Cart } from "@/core/models/Cart";
import { Product } from "@/core/models/Product";
import { successResponse, errorResponse } from "@/core/utils/response";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { userId } = await params;

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name price image description stock category",
    });

    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
      await cart.save();
    }

    // Sincronizar datos del producto en items
    if (cart.items && cart.items.length > 0) {
      cart.items = cart.items.map((item) => {
        if (item.productId) {
          return {
            ...item.toObject(),
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
          };
        }
        return item;
      });
    }

    const response = successResponse(cart, "Carrito obtenido");
    return new Response(response.body, { status: response.statusCode });
  } catch (error) {
    console.error("Error en GET /api/carts/[userId]:", error);
    const response = errorResponse(
      { error: error.message },
      "Error obteniendo carrito",
      500
    );
    return new Response(response.body, { status: response.statusCode });
  }
}

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { userId } = await params;
    const { productId, quantity = 1 } = await request.json();

    // Validar que el producto existe
    const product = await Product.findById(productId);
    if (!product) {
      const response = errorResponse(
        { error: "Producto no encontrado" },
        "El producto no existe",
        404
      );
      return new Response(response.body, { status: response.statusCode });
    }

    // Validar stock
    if (product.stock < quantity) {
      const response = errorResponse(
        { error: "Stock insuficiente" },
        `Solo hay ${product.stock} unidades disponibles`,
        400
      );
      return new Response(response.body, { status: response.statusCode });
    }

    // Buscar o crear carrito
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Actualizar cantidad
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Agregar nuevo item
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    // Recalcular total
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    const response = successResponse(cart, "Producto agregado al carrito");
    return new Response(response.body, { status: response.statusCode });
  } catch (error) {
    console.error("Error en POST /api/carts/[userId]:", error);
    const response = errorResponse(
      { error: error.message },
      "Error agregando producto al carrito",
      500
    );
    return new Response(response.body, { status: response.statusCode });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { userId } = await params;
    const { items, total } = await request.json();

    // Validar que todos los productos existen
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        const response = errorResponse(
          { error: "Producto no encontrado" },
          `El producto ${item.name} no existe`,
          404
        );
        return new Response(response.body, { status: response.statusCode });
      }
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items, total, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    const response = successResponse(cart, "Carrito actualizado");
    return new Response(response.body, { status: response.statusCode });
  } catch (error) {
    console.error("Error en PUT /api/carts/[userId]:", error);
    const response = errorResponse(
      { error: error.message },
      "Error actualizando carrito",
      500
    );
    return new Response(response.body, { status: response.statusCode });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { userId } = await params;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [], total: 0, updatedAt: new Date() },
      { new: true }
    );

    const response = successResponse(cart, "Carrito vaciado");
    return new Response(response.body, { status: response.statusCode });
  } catch (error) {
    console.error("Error en DELETE /api/carts/[userId]:", error);
    const response = errorResponse(
      { error: error.message },
      "Error vaciando carrito",
      500
    );
    return new Response(response.body, { status: response.statusCode });
  }
}
