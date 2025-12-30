"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import { botonWhatsapp } from "@/data/boton-wp";
import useMensaje from "@/hooks/useMensaje";
import { icon_logo } from "@/data/logo";

const BotonWhatsapp = () => {
  const [modalOpenBotonFlotante, setModalOpenBotonFlotante] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const { handleMensaje } = useMensaje();
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Botón flotante de WhatsApp */}
      <div
        className="fixed z-40 right-2 md:right-10 bottom-4 md:bottom-8 rounded-full cursor-pointer hover:text-primero/80 text-primero dark:text-primero dark:shadow-primero/10 shadow-segundo/10 hover:opacity-70 transition-all duration-300 hover:scale-105"
        onClick={() => {
          setModalOpenBotonFlotante(!modalOpenBotonFlotante);
          setShow(false);
        }}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
            <FaWhatsapp className="text-3xl" />
          </div>
        </div>
      </div>

      {/* Modal del chat */}
      <AnimatePresence>
        {modalOpenBotonFlotante && (
          <div
            className="fixed inset-0 z-20 flex items-center justify-center"
            onClick={() => setModalOpenBotonFlotante(false)}
          >
            <motion.div
              className="absolute bottom-16 md:bottom-24 right-16 z-40 w-72 h-80 bg-segundo/10 rounded-md border-0 shadow-lg overflow-hidden font-poppins"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex flex-col h-full"
                style={{
                  backgroundImage: "url(/boton-flotante/fondo-wp.jpeg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Header */}
                <div className="h-12 bg-primero px-4 flex items-center space-x-2">
                  <div className="bg-zinc-100 w-8 h-8 rounded-full flex items-center justify-center">
                    <Image
                      src={icon_logo.src}
                      alt={icon_logo.alt}
                      width={50}
                      height={50}
                      className="w-6 h-6"
                    />
                  </div>
                  <span className="font-semibold text-sm text-segundo">
                    {botonWhatsapp.nombre}
                  </span>
                  <BsPatchCheckFill className="text-green-600" />
                </div>

                {/* Fecha */}
                <div className="w-full text-center my-2">
                  <span className="text-[10px] bg-green-300 px-3 py-1 rounded-full">
                    Hoy
                  </span>
                </div>

                {/* Área de mensajes - desplazable */}
                <div className="flex-1 overflow-y-auto px-2 space-y-2 mb-2">
                  {/* Mensajes predefinidos */}
                  <div className="flex justify-end">
                    <p className="text-xs p-2 bg-green-300 rounded-sm max-w-[70%]">
                      {botonWhatsapp.chat[0]}
                    </p>
                  </div>
                  {botonWhatsapp.chat[1] && (
                    <div className="flex justify-end">
                      <p className="text-xs p-2 bg-green-300 rounded-sm max-w-[70%]">
                        {botonWhatsapp.chat[1]}
                      </p>
                    </div>
                  )}

                  {/* Mensaje del usuario (solo si fue enviado) */}
                  {show && (
                    <div className="flex justify-start">
                      <p className="text-xs p-2 bg-primero rounded-sm max-w-[70%] text-segundo">
                        {mensaje}
                      </p>
                    </div>
                  )}
                </div>

                {/* Barra de entrada fija en la parte inferior */}
                <div className="shrink-0 bg-primero p-2 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="flex-1 h-10 px-3 py-1.5 bg-primero text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-green-400 placeholder:text-segundo/50"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleMensaje(mensaje);
                        setShow(true);
                        setMensaje(""); // Opcional: limpiar después de enviar
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (mensaje.trim()) {
                        handleMensaje(mensaje);
                        setShow(true);
                        setModalOpenBotonFlotante(false);
                        setMensaje("");
                      }
                    }}
                    className="bg-green-500 hover:bg-green-600 p-2 rounded-full text-primero transition"
                  >
                    <IoSendSharp className="text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BotonWhatsapp;
