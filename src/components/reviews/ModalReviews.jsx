"use client";

import { AppContext } from "@/context/AppContext";
import { colorsRandom } from "@/data/coloramdom";
import { firstLetter } from "@/data/firstLetter";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect } from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { VscVerifiedFilled } from "react-icons/vsc";

export default function ModalReview() {
  const { openModalReview, setOpenModalReview, imageSelectedReview } =
    useContext(AppContext);

  useEffect(() => {
    if (openModalReview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalReview]);

  const getColorByUserId = (userId) => {
    return colorsRandom[userId % colorsRandom.length];
  };

  return (
    <>
      {/* Overlay oscuro */}
      {openModalReview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalReview(false)}
          className="fixed inset-0 bg-segundo/30 bg-opacity-50 z-30"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalReview && (
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
              onClick={() => setOpenModalReview(false)}
              className="fixed inset-0 bg-segundo/20 bg-opacity-30 z-0"
            />

            {/* Modal centrado */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-50 w-80 h-96"
              onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal lo cierre
            >
              <div className="shrink-0 border border-segundo rounded-xl bg-primero shadow-sm">
                {/* Rating + Fecha */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(imageSelectedReview.rating) ? (
                          <IoIosStar />
                        ) : i === Math.floor(imageSelectedReview.rating) &&
                          imageSelectedReview.rating % 1 !== 0 ? (
                          <IoIosStarHalf />
                        ) : (
                          <IoIosStar className="text-gray-400" />
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {imageSelectedReview.date}
                  </span>
                </div>

                {/* Comentario */}
                <div className="px-4 py-2 flex flex-col gap-2 h-40">
                  <span className="text-lg font-semibold text-gray-800">
                    {imageSelectedReview.title}
                  </span>
                  <div className="text-gray-700 line-clamp-5">
                    ❝{imageSelectedReview.comment}❞
                  </div>
                </div>

                {/* Usuario con color aleatorio */}
                <div className="flex items-center p-4 gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center relative ${getColorByUserId(
                      imageSelectedReview.id
                    )}`}
                  >
                    <span className="text-lg font-semibold text-gray-700">
                      {firstLetter(imageSelectedReview.name)}
                    </span>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-[2px]">
                      <VscVerifiedFilled className="text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-segundo">
                      {imageSelectedReview.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {imageSelectedReview.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
