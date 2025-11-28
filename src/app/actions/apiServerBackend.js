// app/actions/apiServer.js
"use server";
const API_SECRET_KEY = process.env.API_SECRET_KEY;
const URL_BACKEND = process.env.URL_BACKEND || "http://localhost:3000";

export async function apiServerBackend(enpoint, metodo = "GET", datos = null) {
  try {
    const res = await fetch(`${URL_BACKEND}${enpoint}`, {
      method: metodo,
      headers: {
        "x-api-key": API_SECRET_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: metodo !== "GET" ? JSON.stringify(datos) : null,
    });

    const data = await res.json();
    return {
      success: data.success ?? false,
      message: data.message,
      data: data.data,
      error: data.error,
      status: res.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "No se pudo conectar con el servidor",
      error: error.message,
      data: null,
      status: 500,
    };
  }
}
