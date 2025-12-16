"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { navbarImages } from "@/data/imagenes";
import { categorias, enlacesComprar } from "@/data/data.enlace.comprar";
import EnlaceHeader from "./components/EnlaceHeader";
import TituloEnlace from "./components/TituloEnlace";

export default function Comprar() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // si baja más de 50px cambia
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const scheduleClose = () => {
    timeoutRef.current = setTimeout(close, 150);
  };

  const enterCard = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const leaveCard = () => {
    close();
  };

  return (
    <div className="relative inline-block">
      {/* Enlace */}
      <li
        className="relative group cursor-pointer text-segundo text-sm"
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        <Link href={"/productos"}>Comprar</Link>
        <span className="absolute left-0 -bottom-1 w-0 h-px bg-segundo transition-all duration-300 group-hover:w-full"></span>
      </li>

      {/* Hover Card */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={enterCard}
          onMouseLeave={leaveCard}
          className={`fixed left-0 right-0 ${
            scrolled ? "top-28" : "top-34"
          } h-svh bg-primero dark:bg-segundo shadow-lg border-b z-50 overflow-hidden`}
          style={{
            zIndex: 999,
          }}
        >
          <div className="flex items-center justify-center gap-8 p-8 h-full">
            <div className="w-2/8 h-full flex flex-col gap-4">
              <div>
                <TituloEnlace categoria={categorias[0]} />
                <ul>
                  {enlacesComprar[categorias[0]].map((item, index) => (
                    <EnlaceHeader key={index} item={item} />
                  ))}
                </ul>
              </div>
              <div>
                <TituloEnlace categoria={categorias[1]} />
                <ul>
                  {enlacesComprar[categorias[1]].map((item, index) => (
                    <EnlaceHeader key={index} item={item} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-10/12 h-full flex flex-col items-start">
              <div className="flex items-start justify-between h-1/3 gap-8 w-full">
                <div className="w-full">
                  <TituloEnlace categoria={categorias[2]} />
                  <ul>
                    {enlacesComprar[categorias[2]].map((item, index) => (
                      <EnlaceHeader key={index} item={item} />
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <TituloEnlace categoria={categorias[3]} />
                  <ul>
                    {enlacesComprar[categorias[3]].map((item, index) => (
                      <EnlaceHeader key={index} item={item} />
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <TituloEnlace categoria={categorias[4]} />
                  <ul>
                    {enlacesComprar[categorias[4]].map((item, index) => (
                      <EnlaceHeader key={index} item={item} />
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <TituloEnlace categoria={categorias[5]} />
                  <ul>
                    {enlacesComprar[categorias[5]].map((item, index) => (
                      <EnlaceHeader key={index} item={item} />
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-11/12 h-2/3 flex flex-col items-start pb-8">
                <div className="w-full h-full flex items-start justify-center gap-6 pb-8">
                  {navbarImages.comprar.imagenesBanner.map((imagen, index) => (
                    <Link
                      key={index}
                      href={`${imagen.url}`}
                      className="w-full h-full relative hover:opacity-70 transition-all duration-200"
                    >
                      <Image
                        src={imagen.src}
                        alt={imagen.alt}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                      <h3 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-segundo text-5xl w-full text-center py-2 font-semibold text-shadow-lg/30">
                        {imagen.nombre}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
