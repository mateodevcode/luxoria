"use client";

import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatoDinero } from "@/libs/formatoDinero";

export default function CategoriaSearch() {
  const { productos } = useContext(AppContext);
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria");
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    if (categoria) {
      const filtered = productos.filter((producto) => {
        const search = categoria.toLowerCase();
        return (
          producto.nombre.toLowerCase().includes(search) ||
          producto.descripcion?.toLowerCase().includes(search) ||
          producto.detalles?.toLowerCase().includes(search)
        );
      });
      setProductosFiltrados(filtered);
    }
  }, [categoria, productos]);

  if (!categoria) {
    return;
  }

  return (
    <div className="w-full min-h-[80svh] bg-primero p-4 pb-20 md:hidden">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-segundo dark:text-primero text-2xl font-semibold capitalize">
          {categoria}
        </h1>
        <p className="text-segundo/70 dark:text-primero/70 text-sm mt-2">
          {productosFiltrados.length} producto
          {productosFiltrados.length !== 1 ? "s" : ""} encontrado
          {productosFiltrados.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid de productos */}
      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {productosFiltrados.map((producto, index) => (
            <div
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer border-segundo hover:border-cuarto border"
            >
              {/* Imagen */}
              <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src={producto.imageUrl || "/section-4/example-1.webp"}
                  alt={producto.nombre}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full p-2"
                />
              </div>

              {/* Información */}
              <div className="p-2 bg-segundo/80">
                <h3 className="text-primero text-sm font-medium line-clamp-2">
                  {producto.nombre}
                </h3>
                <p className="text-primero font-semibold text-base mt-2">
                  {formatoDinero(producto.precio) || "0.00"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
