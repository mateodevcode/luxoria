"use client";

import { AppContext } from "@/context/AppContext";
import { productosCarrito } from "@/data/data.productos.carrito";
import { formatoDinero } from "@/libs/formatoDinero";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Cart } from "../cart/Cart";
import { useCart } from "@/core/hooks/useCart";
import { toast } from "sonner";
import { useCartStore } from "@/core/store/cartStore";
import { ChevronDown, CopyX, Dot, Pointer, ShoppingBag } from "lucide-react";
import { Listbox } from "@headlessui/react";

export default function ModalCarritoCompras() {
  const { openModalCarritoCompras, setOpenModalCarritoCompras, productos } =
    useContext(AppContext);
  const router = useRouter();
  const { addItem, isLoading, error, isAuthenticated, isReady, total, items } =
    useCart();
  const { removeItem, updateQuantity, clearCart } = useCartStore();
  const [longitudItems, setLongitudItems] = useState(0);
  const [sizeSeleccionada, setSizeSeleccionada] = useState({});

  useEffect(() => {
    if (openModalCarritoCompras) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalCarritoCompras]);

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

  const handleSizeChange = (productId, newSize) => {
    setSizeSeleccionada((prev) => ({
      ...prev,
      [productId]: newSize,
    }));
  };

  return (
    <>
      {openModalCarritoCompras && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalCarritoCompras(false)}
          className="fixed inset-0 bg-segundo/30 bg-opacity-50 z-30"
        />
      )}

      <AnimatePresence>
        {openModalCarritoCompras && (
          <motion.div
            key="drawer"
            initial={{ x: "75%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full md:w-3/4 h-full max-w-md bg-primero z-40 overflow-y-auto font-poppins"
          >
            <div className="bg-linear-to-r from-cuarto to-segundo px-6 py-3 flex justify-between items-center text-primero relative">
              <div className="flex items-center gap-2 relative">
                <h2 className=" text-xl font-semibold">Carrito</h2>
                {items.length > 0 && (
                  <div className="text-xs font-bold  uppercase text-segundo absolute -top-1 -right-8 bg-primero/50 w-6 h-6 flex items-center justify-center rounded-full">
                    {items.length}
                  </div>
                )}
              </div>
              <button
                onClick={() => setOpenModalCarritoCompras(false)}
                className="text-2xl rounded-full p-1 cursor-pointer select-none active:scale-95 hover:rotate-180 duration-200"
              >
                <IoClose />
              </button>
            </div>

            <div className="p-6 h-[92svh] flex flex-col gap-4">
              {items.length > 0 && (
                <div
                  className="w-full flex items-center justify-end gap-2 text-segundo cursor-pointer select-none active:scale-95 duration-200 hover:text-red-600 p-4"
                  onClick={() => clearCart()}
                >
                  <span className="text-xs">Vaciar carrito</span>
                  <ShoppingBag className="w-3 h-3" />
                </div>
              )}
              <Cart />
              <div
                className={`w-full h-full flex items-center justify-start flex-col gap-4 relative ${
                  items.length > 0 ? "pb-20" : ""
                }`}
              >
                <button
                  className="w-full bg-segundo hover:bg-segundo/80 text-primero text-center p-3 uppercase mb-4 cursor-pointer select-none active:scale-95 duration-75 font-medium text-xs"
                  onClick={() => {
                    setOpenModalCarritoCompras(false);
                    router.push("/productos");
                  }}
                >
                  Ver productos
                </button>
                <span className="text-xs font-bold  uppercase text-segundo">
                  Joyas que te pueden gustar
                </span>

                {productosCarrito
                  .slice(0, longitudItems)
                  .map((product, index) => {
                    const producto = productos.find(
                      (prod) => prod._id === product
                    );

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
                                onChange={(e) =>
                                  handleSizeChange(producto._id, e)
                                }
                              >
                                {({ open }) => (
                                  <div>
                                    <Listbox.Button className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm rounded-xs focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition h-12 px-4">
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
                              className={`w-1/2 p-3 bg-segundo hover:bg-segundo/80 text-primero text-xs font-medium cursor-pointer select-none active:scale-95 duration-75 uppercase h-12`}
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
                                console.log({
                                  ...producto,
                                  size: tallaSeleccionada,
                                });

                                // await addItem({
                                //   ...producto,
                                //   size: tallaSeleccionada,
                                // });
                              }}
                            >
                              comprar
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {items.length > 0 && (
                  <div className="sticky bottom-0 left-0 right-0 w-full bg-primero flex items-center justify-center h-20 py-4">
                    <button className="shiny-button bg-segundo text-primero p-3 w-full flex items-center justify-center relative overflow-hidden">
                      <span>Pagar</span> <Dot className="text-primero" />{" "}
                      <span className="font-semibold">
                        {formatoDinero(total)}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
