"use client";

import { AppContext } from "@/context/AppContext";
import { useCart } from "@/core/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

export default function ModalTallas() {
  const { openModalTallas, setOpenModalTallas, productos } =
    useContext(AppContext);
  const params = useParams();
  const producto = productos.find((producto) => producto.url === params.id);
  const [sizeSeleccionada, setSizeSeleccionada] = useState("");
  const { addItem, isLoading, error, isAuthenticated, isReady, total, items } =
    useCart();

  useEffect(() => {
    if (openModalTallas) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalTallas]);

  return (
    <>
      {/* Overlay oscuro */}
      {openModalTallas && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalTallas(false)}
          className="fixed inset-0 bg-segundo/30 bg-opacity-50 z-30 font-poppins"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalTallas && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center font-poppins"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModalTallas(false)}
              className="fixed inset-0 bg-segundo/70 bg-opacity-30 z-0"
            />

            {/* Modal centrado */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-50 w-96 h-96"
              onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal lo cierre
            >
              <div className="absolute -top-6 right-10 bg-primero h-10 w-10 flex items-center justify-center rounded-full">
                <button
                  onClick={() => setOpenModalTallas(false)}
                  className="text-2xl rounded-full p-1 cursor-pointer select-none active:scale-95 hover:rotate-180 duration-200"
                >
                  <IoClose />
                </button>
              </div>

              <div className="flex flex-col items-center gap-8">
                <div className="w-48 h-48">
                  <Image
                    src={producto?.imageUrl || "/logo/icon-2.png"}
                    alt="imagen producto"
                    className="h-full object-cover rounded-full"
                    width={300}
                    height={300}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-6 gap-2">
                    {producto?.size.map((size) => (
                      <button
                        key={size}
                        className={`border border-segundo p-2 text-xs rounded font-semibold hover:border-cuarto transition-colors hover:bg-cuarto h-10 w-10 flex items-center justify-center ${
                          size === sizeSeleccionada ? "bg-cuarto" : "bg-primero"
                        }`}
                        onClick={() => {
                          setSizeSeleccionada(size);
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <button
                    className={`bg-cuarto  text-primero p-3 w-full flex items-center justify-center relative overflow-hidden rounded-xs font-semibold ${
                      sizeSeleccionada === ""
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-cuarto/80"
                    }`}
                    disabled={sizeSeleccionada === ""}
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
                      setOpenModalTallas(false);
                    }}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
