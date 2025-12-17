"use client";

import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export default function ModalMenuHamburguesa() {
  const { openModalMenuHamburguesa, setOpenModalMenuHamburguesa } =
    useContext(AppContext);

  useEffect(() => {
    if (openModalMenuHamburguesa) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalMenuHamburguesa]);

  const menuEnlaces = [
    { name: "new arrivals", href: "/" },
    { name: "underwear", href: "/servicios" },
    { name: "alaska plus", href: "/proyectos" },
    { name: "actvewear", href: "/contacto" },
    { name: "swimwear", href: "/contacto" },
    { name: "accessories", href: "/contacto" },
    { name: "unity", href: "/contacto" },
    { name: "clerance", href: "/contacto" },
  ];

  return (
    <>
      {/* Overlay oscuro */}
      {openModalMenuHamburguesa && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalMenuHamburguesa(false)}
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-30"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalMenuHamburguesa && (
          <motion.div
            key="drawer" // ← importante para animaciones
            initial={{ x: "-75%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full md:w-3/4 h-full max-w-md bg-whitebase-500 dark:bg-blackbase-500 z-40 overflow-y-auto"
          >
            {/* Botón de cerrar */}
            <div className="px-4 flex justify-between items-center border-b-[1px] border-gray-300 text-blackbase-500 dark:text-whitebase-500">
              <div className="flex items-center gap-4">
                <button className="w-28 flex items-center font-semibold justify-between p-3 border-r-[1px] border-black/10 text-sm font-montserrat">
                  <span>English</span>{" "}
                  <MdOutlineKeyboardArrowDown className="text-xl" />
                </button>
                <div>
                  <BsPerson className="text-xl" />
                </div>
              </div>
              <button
                onClick={() => setOpenModalMenuHamburguesa(false)}
                className="text-2xl text-blackbase-500 dark:text-whitebase-500 p-1 cursor-pointer select-none hover:rotate-180 duration-200"
              >
                <IoClose className="" />
              </button>
            </div>

            {/* Contenido */}
            <div className="h-[92svh] flex flex-col">
              <Link
                href={"/"}
                className="text-sm text-blackbase-500 hover:text-blackbase-500 transition-colors duration-200 uppercase flex items-center justify-between gap-2 py-4 px-6 border-b-[1px] border-gray-300 dark:border-whitebase-500/10 hover:bg-gray-100"
              >
                <span>Search</span>
                <LuSearch className="text-xl" />
              </Link>
              {menuEnlaces.map((enlace, index) => (
                <Link
                  key={index}
                  href={enlace.href}
                  className="text-sm font-semibold text-blackbase-500 dark:text-whitebase-500 hover:text-black transition-colors duration-200 uppercase flex items-center justify-between gap-2 py-4 px-6 border-b-[1px] border-gray-300 dark:border-whitebase-500/10 hover:bg-gray-100"
                >
                  <span>{enlace.name}</span>
                  <MdOutlineKeyboardArrowRight className="text-2xl" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
