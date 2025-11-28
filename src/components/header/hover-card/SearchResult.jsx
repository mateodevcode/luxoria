"use client";

import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function SearchResult() {
  const { openModalSearchResult, setOpenModalSearchResult, search, setSearch } =
    useContext(AppContext);

  useEffect(() => {
    if (search.length > 0) {
      setOpenModalSearchResult(true);
    } else {
      setOpenModalSearchResult(false);
    }
  }, [search]);

  return (
    <>
      {/* Overlay oscuro */}
      {openModalSearchResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalSearchResult(false)}
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-30"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalSearchResult && (
          <motion.div
            key="drawer"
            initial={{ y: "-75%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full bg-whitebase-500 dark:bg-blackbase-500 z-30 h-screen overflow-y-auto"
          >
            {/* Botón de cerrar */}
            <div className="flex flex-col items-start w-8/12 mx-auto pt-32 font-montserrat">
              <div className="w-full flex flex-col mb-4">
                <div className="w-full flex justify-between items-center border-b border-blackbase-500/20 dark:border-whitebase-500/20 pb-2">
                  <span className="text-blackbase-500 dark:text-whitebase-500 text-lg">
                    Suggestions
                  </span>
                  <div className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded-sm">
                    <span className="font-montserrat text-sm">4</span>
                  </div>
                </div>
                <div>
                  <ul className="flex flex-col gap-4 mt-4 text-blackbase-500/80 dark:text-whitebase-500/80">
                    <li>Sheer</li>
                    <li>Spartacus</li>
                    <li>Socks</li>
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-col mb-4">
                <div className="w-full flex justify-between items-center border-b border-blackbase-500/20 dark:border-whitebase-500/20 pb-2">
                  <span className="text-blackbase-500 dark:text-whitebase-500">
                    Productos
                  </span>
                  <div className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded-sm">
                    <span className="font-montserrat text-sm">4</span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full py-4">
                    <div className="flex gap-4">
                      <Image
                        src="/section-4/example-1.webp"
                        alt="Product Example"
                        width={70}
                        height={70}
                        className="object-contain bg-red-400"
                      />
                      <div className="flex flex-col gap-1 text-blackbase-500 dark:text-whitebase-500">
                        <span>Kourus Bikini Swin Top in Black</span>
                        <span className="font-semibold">$49.00</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full py-4">
                    <div className="flex gap-4">
                      <Image
                        src="/section-4/example-1.webp"
                        alt="Product Example"
                        width={70}
                        height={70}
                        className="object-contain bg-red-400"
                      />
                      <div className="flex flex-col gap-1 text-blackbase-500 dark:text-whitebase-500">
                        <span>Kourus Bikini Swin Top in Black</span>
                        <span className="font-semibold">$49.00</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full py-4">
                    <div className="flex gap-4">
                      <Image
                        src="/section-4/example-1.webp"
                        alt="Product Example"
                        width={70}
                        height={70}
                        className="object-contain bg-red-400"
                      />
                      <div className="flex flex-col gap-1 text-blackbase-500 dark:text-whitebase-500">
                        <span>Kourus Bikini Swin Top in Black</span>
                        <span className="font-semibold">$49.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col mb-4">
                <div className="w-full flex justify-between items-center border-b border-blackbase-500/20 dark:border-whitebase-500/20 pb-2">
                  <span className="text-blackbase-500 dark:text-whitebase-500 text-lg">
                    Collections
                  </span>
                  <div className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded-sm">
                    <span className="font-montserrat text-sm">4</span>
                  </div>
                </div>
                <div>
                  <ul className="flex flex-col gap-4 mt-4 text-blackbase-500/80 dark:text-whitebase-500/80">
                    <li>S</li>
                    <li>Score share slim</li>
                  </ul>
                </div>
              </div>
              <div className="border-px border-blackbase-500 dark:border-whitebase-500 p-4 flex justify-between items-center text-blackbase-500 dark:text-whitebase-500 cursor-pointer hover:bg-blackbase-500/5 dark:hover:bg-whitebase-500/5 duration-75 active:scale-95 uppercase font-semibold rounded-md px-6">
                <span>{`search for "s"`}</span>
                <MdKeyboardArrowRight className="text-3xl" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
