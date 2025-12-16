"use client";

import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalImagen() {
  const {
    openModalImagen,
    setOpenModalImagen,
    productoSeleccionado,
    setProductoSeleccionado,
  } = useContext(AppContext);

  useEffect(() => {
    if (openModalImagen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalImagen]);

  return (
    <>
      {/* Overlay oscuro */}
      {openModalImagen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setOpenModalImagen(false);
            setProductoSeleccionado(null);
          }}
          className="fixed inset-0 bg-segundo/30 bg-opacity-50 z-30"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalImagen && (
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
                setOpenModalImagen(false);
                setProductoSeleccionado(null);
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
                  setOpenModalImagen(false);
                  setProductoSeleccionado(null);
                }}
                className="absolute top-2 right-2 text-2xl text-segundo p-1 cursor-pointer hover:rotate-180 duration-200 z-10"
              >
                <IoClose />
              </button>
              {/* Contenido */}
              <div className="flex items-center justify-center flex-col relative">
                <div className="w-80 h-80 md:w-96 md:h-96 overflow-hidden">
                  <Image
                    src={
                      productoSeleccionado.imageUrl || productoSeleccionado.url
                    }
                    alt={productoSeleccionado.publicId}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
