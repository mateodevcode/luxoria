"use client";

import React, { useState } from "react";
import { productosGancho } from "@/data/data.productos.gancho";
import { formatoDinero } from "@/libs/formatoDinero";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/core/hooks/useCart";
import { toast } from "sonner";

const SugerenciaId = ({ productos }) => {
  const [sizeSeleccionada, setSizeSeleccionada] = useState({});
  const router = useRouter();
  const { addItem, isLoading, error, isAuthenticated, isReady, total, items } =
    useCart();

  const handleSizeChange = (productId, newSize) => {
    setSizeSeleccionada((prev) => ({
      ...prev,
      [productId]: newSize,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="max-w-2xl mx-auto p-6 font-sans border border-segundo/10 relative h-72 mt-4">
        <h2 className="text-xl text-center absolute -top-4 bg-primero px-4 mx-auto left-0 right-0 w-max">
          Anillos de compromiso
        </h2>

        <div className="flex flex-col h-full gap-2">
          {productosGancho.map((product, index) => {
            const productoFind = productos.find((p) => p._id === product);

            if (!productoFind) return null;

            const tallas = productoFind.size || [];
            const tallaSeleccionada =
              sizeSeleccionada[productoFind._id] || tallas[0] || "";

            return (
              <div key={index} className="h-1/2 w-full flex items-center">
                <Image
                  src={productoFind.imageUrl || "/logo/icon-2.png"}
                  alt={productoFind.nombre || "imagen sugerencia"}
                  className="h-full object-cover"
                  width={200}
                  height={200}
                />
                <div>
                  <h3 className="text-sm">{productoFind.nombre}</h3>
                  <p className="font-bold text-sm mt-2">
                    {formatoDinero(productoFind.precio)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="relative rounded-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Listbox
                        value={tallaSeleccionada}
                        onChange={(e) => handleSizeChange(productoFind._id, e)}
                      >
                        {({ open }) => (
                          <div>
                            <Listbox.Button className="bg-transparent focus text-segundo/80 border border-segundo/10 text-xs rounded-xs focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition h-12 px-4 w-20">
                              <div className="flex items-center gap-2">
                                <span className="capitalize">
                                  {tallaSeleccionada}
                                </span>
                              </div>
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-segundo/70" />
                              </span>
                            </Listbox.Button>

                            {open && (
                              <Listbox.Options
                                className="absolute z-10 mt-2 w-full bg-primero border border-segundo/10 text-segundo/70 rounded-xs shadow-lg max-h-60 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60
                                  [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent"
                              >
                                {tallas.map((tipo, index) => (
                                  <Listbox.Option
                                    key={index}
                                    value={tipo}
                                    className={({ active, selected }) =>
                                      `cursor-pointer px-4 py-2 ${
                                        active ? "bg-segundo/5" : ""
                                      } ${
                                        selected
                                          ? "text-segundo bg-segundo/10"
                                          : ""
                                      }`
                                    }
                                  >
                                    {tipo}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            )}
                          </div>
                        )}
                      </Listbox>
                    </div>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();

                        if (!isAuthenticated) {
                          toast.error("Debes iniciar sesión", {
                            position: "top-right",
                          });
                          return;
                        }

                        if (sizeSeleccionada === "") {
                          toast.error("Por favor, selecciona una talla", {
                            position: "top-right",
                          });
                          return;
                        }

                        await addItem({
                          ...productoFind,
                          size: tallaSeleccionada,
                        });

                        toast.success(
                          `${productoFind.nombre} agregado al carrito`,
                          {
                            position: "top-right",
                          }
                        );
                      }}
                      className="uppercase font-semibold bg-segundo/5 flex items-center justify-center gap-1 cursor-pointer p-3 text-xs hover:bg-segundo hover:text-primero transition-colors h-12 rounded-xs"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SugerenciaId;
