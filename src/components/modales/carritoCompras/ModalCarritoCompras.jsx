"use client";

import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect } from "react";
import { Cart } from "@/components/cart/Cart";
import HeaderCarritoCompras from "./HeaderCarritoCompras";
import VaciarCarrito from "./VaciarCarrito";
import SugerenciasCarrito from "./SugerenciasCarrito";
import BotonesPago from "./BotonesPago";

export default function ModalCarritoCompras() {
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
            <HeaderCarritoCompras />
            <div className="p-6 h-[92svh] flex flex-col gap-4">
              <VaciarCarrito />
              <Cart />
              <SugerenciasCarrito />
              <BotonesPago />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
