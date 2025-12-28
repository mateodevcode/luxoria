// src/core/db.js

import mongoose from "mongoose";

if (!process.env.URL_URI_MONGODB) {
  throw new Error("Falta la url de Database");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.URL_URI_MONGODB);
    console.log("Database connected");
  } catch (error) {
    console.error("Error al conectar a Database", error);
  }
};
