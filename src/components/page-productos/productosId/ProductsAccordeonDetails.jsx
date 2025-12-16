"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegFileLines } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdOutlineChecklistRtl } from "react-icons/md";
import { LuWashingMachine } from "react-icons/lu";
import { PiTruckFill } from "react-icons/pi";

export function ProductsAccordeonDetails() {
  const [openItem, setOpenItem] = useState("");

  const toggleItem = (itemId) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <div className="w-full">
      {/* Item 1 */}
      <div className="border-b dark:border-whitebase-500/10 border-blackbase-500/10">
        <button
          type="button"
          className="flex w-full items-center justify-between py-3 text-left font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          onClick={() => toggleItem("item-1")}
        >
          <div className="flex items-center gap-2">
            <FaRegFileLines />
            <h3 className="font-semibold">Description</h3>
          </div>
          <span
            className={`transform transition-transform duration-200 ${
              openItem === "item-1" ? "rotate-180" : ""
            }`}
          >
            <MdKeyboardArrowDown className="text-2xl text-blackbase-500 dark:text-whitebase-500" />
          </span>
        </button>
        <AnimatePresence>
          {openItem === "item-1" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pb-4 text-gray-700 leading-relaxed text-xs">
                <p className="text-gray-900">Are you DTF?</p>

                <p>
                  If you love our signature GLIDE Thong, you're going to fall
                  hard for the all-new FLAUNT Thong. Designed with even thinner
                  straps and a sleek, barely-there feel, this thong takes
                  minimalism to the next level.
                </p>

                <p>
                  Crafted from ultra-soft, touchable fabric, it features a
                  flattering triangle back where the delicate strings meet for a
                  modern, elevated silhouette.
                </p>

                <p>
                  Choose from timeless black or turn heads with three vibrant
                  dual-tone color combos. Smooth, striking, and unapologetically
                  sexy — the FLAUNT Thong is here to elevate your top-drawer
                  game.
                </p>

                <p className="font-semibold text-gray-900 italic">
                  So, are you Down To Flaunt?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Item 2 */}
      <div className="border-b dark:border-whitebase-500/10 border-blackbase-500/10">
        <button
          type="button"
          className="flex w-full items-center justify-between py-3 text-left font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          onClick={() => toggleItem("item-2")}
        >
          <div className="flex items-center gap-2 text-blackbase-500 dark:text-whitebase-500">
            <MdOutlineChecklistRtl />
            <span className="font-semibold font-montserrat text-blackbase-500 dark:text-whitebase-500">
              Product Details
            </span>
          </div>
          <span
            className={`transform transition-transform duration-200 ${
              openItem === "item-2" ? "rotate-180" : ""
            }`}
          >
            <MdKeyboardArrowDown className="text-2xl text-blackbase-500 dark:text-whitebase-500" />
          </span>
        </button>
        <AnimatePresence>
          {openItem === "item-2" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pb-4 text-gray-700 leading-relaxed text-xs">
                <ul className="list-disc list-inside mb-4">
                  <li>Ultra thin profile Thong</li>
                  <li>Single logo patch on front centre of brief</li>
                  <li>6mm thin straps and waistband</li>
                </ul>
                <p className="font-semibold text-blackbase-500">
                  Fabric Composition:
                </p>
                <p className="text-blackbase-500">95% Rayon 5% Spandex</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Item 3 */}
      <div className="border-b dark:border-whitebase-500/10 border-blackbase-500/10">
        <button
          type="button"
          className="flex w-full items-center justify-between py-3 text-left font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          onClick={() => toggleItem("item-3")}
        >
          <div className="flex items-center gap-2 text-blackbase-500 dark:text-whitebase-500">
            <LuWashingMachine />
            <span className="font-semibold font-montserrat text-blackbase-500 dark:text-whitebase-500">
              Care Guide
            </span>
          </div>
          <span
            className={`transform transition-transform duration-200 ${
              openItem === "item-3" ? "rotate-180" : ""
            }`}
          >
            <MdKeyboardArrowDown className="text-2xl text-blackbase-500 dark:text-whitebase-500" />
          </span>
        </button>
        <AnimatePresence>
          {openItem === "item-3" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pb-4 text-gray-700 leading-relaxed text-xs">
                <p className="text-blackbase-500 mb-2">
                  Cold gentle machine wash (in a wash bag), like colours Use
                  mild detergent; no bleach, no fabric softeners Turn inside
                  out; do not wring Line dry flat or in shade; no tumble dry Do
                  not dry clean; cool iron only if needed (avoid elastics)
                </p>
                <p className="text-blackbase-500">
                  Keeps the fabric soft, colour-true, and the stretch snapping
                  back wear after wear.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Item 4 */}
      <div className="border-b dark:border-whitebase-500/10 border-blackbase-500/10">
        <button
          type="button"
          className="flex w-full items-center justify-between py-3 text-left font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          onClick={() => toggleItem("item-4")}
        >
          <div className="flex items-center gap-2 text-blackbase-500 dark:text-whitebase-500">
            <PiTruckFill />
            <span className="font-semibold font-montserrat text-blackbase-500 dark:text-whitebase-500">
              Delivery & Returns
            </span>
          </div>
          <span
            className={`transform transition-transform duration-200 ${
              openItem === "item-4" ? "rotate-180" : ""
            }`}
          >
            <MdKeyboardArrowDown className="text-2xl text-blackbase-500 dark:text-whitebase-500" />
          </span>
        </button>
        <AnimatePresence>
          {openItem === "item-4" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pb-4 text-gray-700 leading-relaxed text-xs">
                <p className="text-blackbase-500 mb-1">
                  See our Shipping Policy here .
                </p>
                <p className="text-blackbase-500">
                  See our Returns Policy here .
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
