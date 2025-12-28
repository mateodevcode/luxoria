// src/core/models/Cart.js

import mongoose from "mongoose";

const DB_TYPE = process.env.DB_TYPE || "mongodb";

let Cart;

if (DB_TYPE === "mongodb") {
  const cartSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          name: String,
          price: Number,
          image: String,
          quantity: {
            type: Number,
            default: 1,
            min: 1,
          },
        },
      ],
      total: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

  // Índices para performance
  cartSchema.index({ userId: 1 });

  Cart = mongoose.model("Cart", cartSchema);
}

export { Cart };
