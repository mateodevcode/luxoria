// components/Drawer.js
import { motion } from "framer-motion";
import { useState } from "react";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* === Botón para abrir el drawer === */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 p-3 bg-gray-800 text-white rounded-md shadow-lg"
      >
        ☰ Menú
      </button>

      {/* === Overlay oscuro (fondo) === */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      {/* === Drawer: se desliza desde la izquierda === */}
      <motion.div
        initial={{ x: "-75%" }}
        animate={isOpen ? { x: 0 } : { x: "-75%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 w-3/4 h-full max-w-md bg-white shadow-xl z-40 overflow-y-auto"
      >
        {/* Botón de cerrar */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        {/* Contenido del menú */}
        <div className="pt-16 px-6 pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Menú</h2>
          <ul className="space-y-6">
            <li>
              <a
                href="/shop"
                className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                SHOP
              </a>
            </li>
            <li>
              <a
                href="/collections"
                className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Colecciones
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
}
