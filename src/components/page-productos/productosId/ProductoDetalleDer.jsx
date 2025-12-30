"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { CiRuler } from "react-icons/ci";
import { RiArrowDropDownFill } from "react-icons/ri";
import { formatoDinero } from "@/libs/formatoDinero";
import { useCart } from "@/core/hooks/useCart";
import Image from "next/image";

const ProductoDetalleDer = ({ producto }) => {
  const { addItem, isAuthenticated } = useCart();
  const [sizeSeleccionada, setSizeSeleccionada] = useState("");

  return (
    <div className="max-w-md mx-auto p-4 font-sans mt-10 md:mt-20">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center border-b pb-2 border-segundo/10">
          <h1 className="text-xl font-semibold">{producto.nombre}</h1>
          <p className="text-sm font-bold">{formatoDinero(producto.precio)}</p>
        </div>
        <div className="text-xs bg-segundo/5 font-semibold p-4 flex flex-col justify-center items-center rounded-xs">
          <p className="">
            Todos nuestros productos estan garantizados y cumplen con las normas
            de calidad.
          </p>
        </div>
      </div>

      {/* Promo Section */}
      {producto?.descuento > 0 && (
        <div className="mb-6 bg-segundo/5 p-2 rounded border border-segundo flex items-center justify-center">
          <div className="text-xs font-bold flex items-center gap-4">
            <span>AHORRA {producto.descuento}% CON BUNDLES</span>{" "}
            <div className="flex items-center gap-2">
              <span className="font-medium">Ver más</span>
              <RiArrowDropDownFill className="text-xl" />
            </div>
          </div>
        </div>
      )}

      {/* Color Section */}
      <div className="mb-6">
        <div
          className="text-sm font-semibold bg-segundo/5 w-max flex items-center justify-center gap-1 p-4 rounded cursor-pointer mt-4"
          onClick={() => {
            setOpenModalMySize(true);
          }}
        >
          <CiRuler />
          <span>Cual es mi talla?</span>
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">TALLAS</h3>
        <div className="grid grid-cols-6 gap-2 mb-3">
          {producto?.size.map((size) => (
            <button
              key={size}
              className={`border border-segundo py-2 text-sm rounded-xs font-bold hover:border-cuarto hover:bg-cuarto/50 transition-colors ${
                size === sizeSeleccionada ? "bg-cuarto/50" : ""
              }`}
              onClick={() => {
                setSizeSeleccionada(size);
              }}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="text-xs p-1 rounded flex gap-1">
          <Image
            src={producto?.imageUrl}
            alt="person"
            width={100}
            height={100}
            className="w-16 h-16"
          />
          <p className="text-segundo/70">
            <span className="font-semibold">Marcos usa talla M.</span> el tiene
            189 cm de altura, 90.2 cm de cintura y 101.6 cm de cadera
          </p>
        </div>
      </div>

      {/* Add to Bag */}
      <div className="">
        <button
          className="shiny-button bg-segundo text-primero p-3 w-full flex items-center justify-center relative overflow-hidden rounded-xs active:scale-95 duration-200 font-semibold"
          onClick={async (e) => {
            e.stopPropagation();

            if (!isAuthenticated) {
              toast.error("Debes iniciar sesión", {
                position: "bottom-right",
              });
              return;
            }

            if (sizeSeleccionada === "") {
              toast.error("Por favor, selecciona una talla", {
                position: "bottom-right",
              });
              return;
            }

            await addItem({
              ...producto,
              size: sizeSeleccionada,
            });
            toast.success(`${producto.nombre} agregado al carrito`, {
              position: "top-right",
            });
          }}
        >
          Agregar al carrito - {formatoDinero(producto.precio)}
        </button>
        <p className="text-xs mt-4 text-segundo/80 font-light">
          Este producto esta totalmente garantizado y cumple con las normas de
          calidad.
        </p>
      </div>
    </div>
  );
};

export default ProductoDetalleDer;
