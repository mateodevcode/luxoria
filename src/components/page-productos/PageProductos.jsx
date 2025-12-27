"use client";

import React, { useState } from "react";
import ListaProductosPage from "./ListaProductosPage";

const PageProductos = () => {
  const [enlaceSeleccionado, setEnlaceSeleccionado] =
    useState("recien_llegados");

  const tabs = [
    { id: "recien_llegados", label: "Recien llegados" },
    { id: "ofertas", label: "Ofertas" },
    { id: "todo_el_catalogo", label: "Todo el catalogo" },
  ];

  return (
    <div className="font-poppins flex flex-col gap-2 items-center bg-primero">
      <div className="flex w-full justify-center border-b border-t border-segundo/20">
        <ul className="flex gap-12">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setEnlaceSeleccionado(tab.id)}
              className={`cursor-pointer select-none relative transition-colors duration-300 py-4 text-sm md:text-base ${
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

      <ListaProductosPage filtroProductos={enlaceSeleccionado} />
    </div>
  );
};

export default PageProductos;
