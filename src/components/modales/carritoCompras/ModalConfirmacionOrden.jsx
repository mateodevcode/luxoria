"use client";

import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalConfirmacionOrden() {
  const {
    openModalConfirmacionOrden,
    setOpenModalConfirmacionOrden,
    idOrdenGenerada,
    setIdOrdenGenerada,
  } = useContext(AppContext);

  useEffect(() => {
    if (openModalConfirmacionOrden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalConfirmacionOrden]);

  return (
    <>
      {/* Overlay oscuro */}
      {openModalConfirmacionOrden && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setOpenModalConfirmacionOrden(false);
          }}
          className="fixed inset-0 bg-segundo/30 bg-opacity-50 z-30"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalConfirmacionOrden && (
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
              onClick={() => {
                setOpenModalConfirmacionOrden(false);
              }}
              className="fixed inset-0 bg-segundo/20 bg-opacity-30 z-0"
            />

            {/* Modal centrado */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-80 h-80 md:w-96 md:h-96 bg-primero rounded-lg shadow-2xl z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal lo cierre
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => {
                  setOpenModalConfirmacionOrden(false);
                }}
                className="absolute top-2 right-2 text-2xl text-segundo p-1 cursor-pointer hover:rotate-180 duration-200 z-10"
              >
                <IoClose />
              </button>
              {/* Contenido */}
              <div className="flex items-center justify-center flex-col relative">
                {idOrdenGenerada && (
                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-segundo">Tu ID de orden:</p>
                    <p className="text-2xl font-bold text-blue-600 font-mono">
                      {idOrdenGenerada}
                    </p>
                    <p className="text-xs text-segundo/70 mt-2">
                      Guarda este ID para hacer seguimiento de tu pedido en{" "}
                      <Link
                        href={`/ordenes/${idOrdenGenerada}`}
                        className="text-cuarto hover:underline"
                      >
                        tu orden
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
