"use client";

import { AppContext } from "@/context/AppContext";
import { productosCarrito } from "@/data/data.productos.carrito";
import { formatoDinero } from "@/libs/formatoDinero";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Cart } from "../cart/Cart";
import { useCartStore } from "@/core/store/cartStore";

export default function ModalCarritoCompras() {
  const { openModalCarritoCompras, setOpenModalCarritoCompras, productos } =
    useContext(AppContext);
  const router = useRouter();
  const { addItem, isLoading, error } = useCartStore();

  useEffect(() => {
    if (openModalCarritoCompras) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalCarritoCompras]);

  return (
    <>
      {/* Overlay oscuro */}
      {openModalCarritoCompras && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalCarritoCompras(false)}
          className="fixed inset-0 bg-segundo/30 bg-opacity-50 z-30"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalCarritoCompras && (
          <motion.div
            key="drawer" // ← importante para animaciones
            initial={{ x: "75%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full md:w-3/4 h-full max-w-md bg-primero z-40 overflow-y-auto font-poppins"
          >
            {/* Botón de cerrar */}
            <div className="bg-linear-to-r from-cuarto to-segundo px-6 py-3 flex justify-between items-center text-primero">
              <h2 className=" text-xl font-semibold">Carrito de compras</h2>
              <button
                onClick={() => setOpenModalCarritoCompras(false)}
                className="text-2xl rounded-full p-1 cursor-pointer select-none active:scale-95 hover:rotate-180 duration-200"
              >
                <IoClose />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6 h-[92svh] flex flex-col gap-4">
              {/* <div className="w-full h-96 flex items-center justify-center">
                <span className="text-2xl  text-segundo">
                  Tu carrito está vacío
                </span>
              </div> */}
              <Cart />
              <div className="w-full h-full flex items-center justify-start flex-col gap-4">
                <button className="w-full bg-segundo hover:bg-segundo/80 text-primero text-center p-3 uppercase mb-4 cursor-pointer select-none active:scale-95 duration-75 font-medium text-xs">
                  Ver productos
                </button>
                <span className="text-xs font-bold  uppercase text-segundo">
                  Joyas que te pueden gustar
                </span>

                {productosCarrito.map((product, index) => {
                  const producto = productos.find(
                    (prod) => prod._id === product
                  );
                  return (
                    <div
                      key={index}
                      className="w-full bg-primero flex items-center gap-2 p-4"
                      onClick={() => {
                        setOpenModalCarritoCompras(false);
                        router.push(`/productos/${producto?.url}`);
                      }}
                    >
                      <div className="w-4/12 flex items-center justify-center">
                        <Image
                          src={producto?.imageUrl}
                          alt={producto?.nombre}
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
                          {index === 1 && (
                            <button className="w-1/2 flex items-center justify-between p-2 border-px border-segundo/10 text-sm text-segundo">
                              <span>XS</span>{" "}
                              <MdOutlineKeyboardArrowDown className="text-xl" />
                            </button>
                          )}
                          <button
                            className={`${
                              index !== 1 ? "w-full" : "w-1/2"
                            } p-3 bg-segundo hover:bg-segundo/80 text-primero text-xs font-medium cursor-pointer select-none active:scale-95 duration-75 uppercase`}
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(producto);
                              console.log(producto);
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
