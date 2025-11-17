"use client";

import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Drawer() {
  const { openModalCarritoCompras, setOpenModalCarritoCompras } =
    useContext(AppContext);

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
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-30"
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
            className="fixed top-0 right-0 w-full md:w-3/4 h-full max-w-md bg-[#F9F9F9] z-40 overflow-y-auto"
          >
            {/* Botón de cerrar */}
            <div className="bg-gray-200 px-6 py-3 flex justify-between items-center border-b-[1px] border-gray-300">
              <h2 className="font-montserrat text-xl font-semibold">Bag</h2>
              <button
                onClick={() => setOpenModalCarritoCompras(false)}
                className="text-2xl rounded-full bg-black/10 hover:bg-black/20 p-1 cursor-pointer select-none active:scale-95 duration-75"
              >
                <IoClose />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6 h-[92svh] flex flex-col gap-4">
              <div className="w-full h-96 flex items-center justify-center">
                <span className="text-2xl font-montserrat">
                  Your bag is empty
                </span>
              </div>
              <div className="w-full h-full flex items-center justify-start flex-col gap-4">
                <button className="w-full bg-black hover:bg-black/80 text-white text-center py-2 rounded-md font-montserrat uppercase mb-4 cursor-pointer select-none active:scale-95 duration-75">
                  shop now
                </button>
                <span className="text-xs font-bold font-montserrat uppercase">
                  styles you might like
                </span>
                <div className="w-full bg-gray-200 flex items-center gap-2 p-4">
                  <div className="w-4/12">
                    <Image
                      src="/carrusel/example.png"
                      alt="Product Image"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8/12 flex flex-col gap-1">
                    <span className="font-montserrat font-semibold text-sm">
                      Glide Micro Brief - Onyx
                    </span>
                    <span className="font-montserrat font-bold text-sm">
                      $19.99
                    </span>
                    <div className="w-full flex items-center gap-2">
                      <button className="w-1/2 flex items-center justify-between p-2 border-[1px] border-black/10 rounded-sm text-sm font-montserrat">
                        <span>XS</span>{" "}
                        <MdOutlineKeyboardArrowDown className="text-xl" />
                      </button>
                      <button className="w-1/2 p-2 bg-black hover:bg-black/80 text-white rounded-sm text-sm font-semibold font-montserrat cursor-pointer select-none active:scale-95 duration-75">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 flex items-center gap-2 p-4">
                  <div className="w-4/12">
                    <Image
                      src="/carrusel/example.png"
                      alt="Product Image"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8/12 flex flex-col gap-1">
                    <span className="font-montserrat font-semibold text-sm">
                      Glide Micro Brief - Onyx
                    </span>
                    <span className="font-montserrat font-bold text-sm">
                      $19.99
                    </span>
                    <div className="w-full flex items-center gap-2">
                      <button className="w-full p-2 bg-black hover:bg-black/80 text-white rounded-sm text-sm font-semibold font-montserrat cursor-pointer select-none active:scale-95 duration-75">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 flex items-center gap-2 p-4">
                  <div className="w-4/12">
                    <Image
                      src="/carrusel/example.png"
                      alt="Product Image"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8/12 flex flex-col gap-1">
                    <span className="font-montserrat font-semibold text-sm">
                      Glide Micro Brief - Onyx
                    </span>
                    <span className="font-montserrat font-bold text-sm">
                      $19.99
                    </span>
                    <div className="w-full flex items-center gap-2">
                      <button className="w-1/2 flex items-center justify-between p-2 border-[1px] border-black/10 rounded-sm text-sm font-montserrat">
                        <span>XS</span>{" "}
                        <MdOutlineKeyboardArrowDown className="text-xl" />
                      </button>
                      <button className="w-1/2 p-2 bg-black hover:bg-black/80 text-white rounded-sm text-sm font-semibold font-montserrat cursor-pointer select-none active:scale-95 duration-75">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
