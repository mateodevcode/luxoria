"use client";

import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function Search() {
  const {
    openModalSearch,
    setOpenModalSearch,
    setOpenModalSearchResult,
    search,
    setSearch,
  } = useContext(AppContext);

  return (
    <>
      {/* Overlay oscuro */}
      {openModalSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalSearch(false)}
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-30"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalSearch && (
          <motion.div
            key="drawer"
            initial={{ y: "-75%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full h-24 bg-whitebase-500 dark:bg-blackbase-500 z-40 overflow-y-auto"
          >
            {/* Botón de cerrar */}
            <div className="flex justify-between items-center w-8/12 mx-auto h-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full bg-transparent text-blackbase-500 dark:text-whitebase-500 outline-none px-4 text-xl font-montserrat"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => {
                  setOpenModalSearch(false);
                  setOpenModalSearchResult(false);
                  setSearch("");
                }}
                className="text-3xl rounded-full p-1 cursor-pointer select-none active:scale-95 duration-75 hover:text-blackbase-500/80 dark:hover:text-whitebase-500/80 text-blackbase-500 dark:text-whitebase-500 flex justify-center items-center gap-8"
              >
                {search.length > 0 && (
                  <span className="text-xl font-montserrat text-blackbase-500/50">
                    Clear
                  </span>
                )}
                <IoCloseOutline />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
