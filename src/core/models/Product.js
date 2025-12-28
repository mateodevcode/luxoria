// src/core/models/Product.js

import mongoose from "mongoose";

const DB_TYPE = process.env.DB_TYPE || "mongodb";

let Product;

if (DB_TYPE === "mongodb") {
  const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      description: String,
      category: {
        type: String,
        enum: ["Anillos", "Collares", "Pulseras", "Pendientes", "Otros"],
      },
      stock: {
        type: Number,
        default: 0,
        min: 0,
      },
      image: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

  Product = mongoose.model("Product", productSchema);
}

export { Product };
