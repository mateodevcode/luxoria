"use client";

import { AppContext } from "@/context/AppContext";
import { menuEnlaces } from "@/data/data.menu.hamburguesa";
import useIniciarSesion from "@/hooks/useIniciarSesion";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function ModalMenuHamburguesa() {
  const {
    openModalMenuHamburguesa,
    setOpenModalMenuHamburguesa,
    setOpenModalSearch,
  } = useContext(AppContext);
  const router = useRouter();
  const { handleCerrarSesion } = useIniciarSesion();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (openModalMenuHamburguesa) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalMenuHamburguesa]);

  return (
    <>
      {/* Overlay oscuro */}
      {openModalMenuHamburguesa && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalMenuHamburguesa(false)}
          className="fixed inset-0 bg-segundo/30 bg-opacity-50 z-30"
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
            className="fixed top-0 left-0 w-full md:w-3/4 h-full max-w-md bg-primero z-40 overflow-y-auto font-poppins"
          >
            {/* Botón de cerrar */}
            <div className="px-4 flex justify-between items-center border-b border-segundo/10 text-segundo">
              <div className="flex items-center gap-4 p-3">
                <AiOutlineShopping className="text-xl hover:text-cuarto text-segundo cursor-pointer select-none" />
              </div>
              <button
                onClick={() => setOpenModalMenuHamburguesa(false)}
                className="text-2xl text-segundo p-1 cursor-pointer select-none hover:rotate-180 duration-200"
              >
                <IoClose className="" />
              </button>
            </div>

            {/* Contenido */}
            <div className="h-[92svh] flex flex-col">
              <div
                onClick={() => {
                  setOpenModalMenuHamburguesa(false);
                  setOpenModalSearch(true);
                }}
                className="text-sm text-segundo hover:text-segundo transition-colors duration-200 uppercase flex items-center justify-between gap-2 py-4 px-6 border-b border-segundo/10 hover:bg-cuarto"
              >
                <span>Buscar</span>
                <LuSearch className="text-xl" />
              </div>
              {menuEnlaces.map((enlace, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setOpenModalMenuHamburguesa(false);
                    router.push(enlace.href);
                  }}
                  className="text-sm font-semibold text-segundo hover:text-segundo transition-colors duration-200 uppercase flex items-center justify-between gap-2 py-4 px-6 border-b border-segundo/10 hover:bg-cuarto"
                >
                  <span>{enlace.name}</span>
                  <MdOutlineKeyboardArrowRight className="text-2xl" />
                </div>
              ))}
              {status === "authenticated" && (
                <div
                  onClick={() => {
                    setOpenModalMenuHamburguesa(false);
                    handleCerrarSesion();
                  }}
                  className="text-sm font-semibold text-segundo hover:text-segundo transition-colors duration-200 uppercase flex items-center justify-between gap-2 py-4 px-6 border-b border-segundo/10 hover:bg-cuarto cursor-pointer select-none"
                >
                  <span>Cerrar Sesión</span>
                  <MdOutlineKeyboardArrowRight className="text-2xl" />
                </div>
              )}
              {status === "unauthenticated" && (
                <div
                  onClick={() => {
                    setOpenModalMenuHamburguesa(false);
                    router.push("/auth/iniciar-sesion");
                  }}
                  className="text-sm font-semibold text-segundo hover:text-segundo transition-colors duration-200 uppercase flex items-center justify-between gap-2 py-4 px-6 border-b border-segundo/10 hover:bg-cuarto cursor-pointer select-none"
                >
                  <span>Iniciar Sesión</span>
                  <MdOutlineKeyboardArrowRight className="text-2xl" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
