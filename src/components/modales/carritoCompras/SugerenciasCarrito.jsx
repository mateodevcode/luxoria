"use client";

import React, { useContext, useEffect, useState } from "react";
import { useCart } from "@/core/hooks/useCart";
import { AppContext } from "@/context/AppContext";
import { productosCarrito } from "@/data/data.productos.carrito";
import { formatoDinero } from "@/libs/formatoDinero";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const SugerenciasCarrito = () => {
  const { setOpenModalCarritoCompras, productos } = useContext(AppContext);
  const { items, addItem, isAuthenticated } = useCart();
  const [longitudItems, setLongitudItems] = useState(0);
  const [sizeSeleccionada, setSizeSeleccionada] = useState({});

  const handleSizeChange = (productId, newSize) => {
    setSizeSeleccionada((prev) => ({
      ...prev,
      [productId]: newSize,
    }));
  };

  useEffect(() => {
    setLongitudItems(3);

    if (items.length === 0) {
      setLongitudItems(3);
    } else if (items.length === 1) {
      setLongitudItems(2);
    } else if (items.length >= 2) {
      setLongitudItems(1);
    }
  }, [items]);

  return (
    <div
      className={`w-full h-full flex items-center justify-start flex-col gap-4 relative ${
        items.length > 0 ? "pb-32" : ""
      }`}
    >
      <button
        className="w-full bg-segundo hover:bg-segundo/80 text-primero text-center p-3 uppercase mb-4 cursor-pointer select-none active:scale-95 duration-75 font-medium text-xs rounded-xs"
        onClick={() => {
          setOpenModalCarritoCompras(false);
          router.push("/productos");
        }}
      >
        Ver productos
      </button>
      <h3 className="text-xs font-bold  uppercase text-segundo">
        Joyas que te pueden gustar
      </h3>

      {productosCarrito.slice(0, longitudItems).map((product, index) => {
        const producto = productos.find((prod) => prod._id === product);

        if (!producto) return null;

        const tallas = producto.size || [];
        const tallaSeleccionada =
          sizeSeleccionada[producto._id] || tallas[0] || "";

        return (
          <div
            key={index}
            className="w-full bg-gray-50 flex items-center gap-2 p-4"
            onClick={() => {
              setOpenModalCarritoCompras(false);
              router.push(`/productos/${producto?.url}`);
            }}
          >
            <div className="w-4/12 flex items-center justify-center">
              <Image
                src={producto?.imageUrl || "/logo/icon-2.png"}
                alt={producto?.nombre || "productos"}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="w-8/12 flex flex-col gap-1 text-segundo">
              <span className=" font-semibold text-sm hover:text-cuarto">
                {producto?.nombre}
              </span>
              <span className=" font-bold text-sm">
                {formatoDinero(producto?.precio)}
              </span>
              <div className="w-full flex items-center gap-2">
                <div
                  className="relative flex-1 rounded-xs h-12"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Listbox
                    value={tallaSeleccionada}
                    onChange={(e) => handleSizeChange(producto._id, e)}
                  >
                    {({ open }) => (
                      <div>
                        <Listbox.Button className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm rounded-xs focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition h-12 px-4 ">
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
                                    selected ? "text-segundo bg-segundo/10" : ""
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
                  className={`w-1/2 p-3 bg-segundo hover:bg-segundo/80 text-primero text-xs font-medium cursor-pointer select-none active:scale-95 duration-75 uppercase h-12 rounded-xs`}
                  onClick={async (e) => {
                    e.stopPropagation();

                    if (!isAuthenticated) {
                      toast.error("Debes iniciar sesión", {
                        description:
                          "Inicia sesión para agregar productos al carrito",
                        position: "bottom-right",
                      });
                      return;
                    }

                    await addItem({
                      ...producto,
                      size: tallaSeleccionada,
                    });
                  }}
                >
                  comprar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SugerenciasCarrito;
