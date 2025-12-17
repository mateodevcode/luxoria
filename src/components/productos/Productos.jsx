"use client";

import React, { useState } from "react";
import ListaProductos from "./ListaProductos";

const Productos = () => {
  const [enlaceSeleccionado, setEnlaceSeleccionado] =
    useState("recien_llegados");

  const tabs = [
    { id: "recien_llegados", label: "Recien llegados" },
    { id: "ofertas", label: "Ofertas" },
    { id: "todo_el_catalogo", label: "Todo el catalogo" },
  ];

  return (
    <div className="font-poppins flex flex-col gap-5 items-center py-10 bg-primero">
      <h2 className="text-3xl md:text-5xl font-light">Joyeria Luxoria</h2>
      <div className="flex w-full justify-center border-b border-t border-segundo/20">
        <ul className="flex gap-12">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setEnlaceSeleccionado(tab.id)}
              className={`cursor-pointer select-none relative transition-colors duration-300 py-4 ${
                enlaceSeleccionado === tab.id
                  ? "text-segundo"
                  : "text-cuarto hover:text-cuarto/70"
              }`}
            >
              {tab.label}

              {/* Línea debajo animada */}
              {enlaceSeleccionado === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cuarto rounded-full animate-in fade-in duration-300" />
              )}
            </li>
          ))}
        </ul>
      </div>

      <ListaProductos filtroProductos={enlaceSeleccionado} />
    </div>
  );
};

export default Productos;
