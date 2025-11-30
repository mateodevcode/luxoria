"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { navbarImages } from "@/data/imagenes";

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

  const enlacesShop = {
    underwear: [
      { name: "Boxers", href: "/shop/underwear/boxers" },
      { name: "Briefs", href: "/shop/underwear/briefs" },
      { name: "Bikinis", href: "/shop/underwear/bikinis" },
    ],
    accessories: [
      { name: "Bikinis", href: "/shop/swimwear/bikinis" },
      { name: "One-piece", href: "/shop/swimwear/one-piece" },
      { name: "Trunks", href: "/shop/swimwear/trunks" },
    ],
  };

  return (
    <div className="relative inline-block">
      {/* Enlace */}
      <li
        className="relative group cursor-pointer text-segundo text-sm"
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        Comprar
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
                <h2 className="uppercase text-lg text-segundo dark:text-primero pb-2 border-b border-gray-200 dark:border-primero">
                  underwear
                </h2>
                <ul>
                  {enlacesShop.underwear.map((item) => (
                    <li key={item.name} className="py-1">
                      <Link
                        href={item.href}
                        className="text-segundo/70 dark:text-primero font-extralight hover:text-segundo dark:hover:text-primero/70 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="uppercase text-lg font-semibold text-segundo dark:text-primero pb-2 border-b border-gray-200 dark:border-primero">
                  Accessories
                </h2>
                <ul>
                  {enlacesShop.accessories.map((item) => (
                    <li key={item.name} className="py-1">
                      <Link
                        href={item.href}
                        className="text-segundo/70 dark:text-primero font-extralight hover:text-segundo dark:hover:text-primero/70 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-10/12 h-full flex flex-col items-start">
              <div className="flex items-start justify-between h-1/3 gap-8 w-full">
                <div className="w-full">
                  <h2 className="uppercase font-semibold text-segundo dark:text-primero pb-2 border-b border-gray-200 dark:border-primero">
                    underwear
                  </h2>
                  <ul>
                    {enlacesShop.underwear.map((item) => (
                      <li key={item.name} className="py-1">
                        <Link
                          href={item.href}
                          className="text-segundo/70 dark:text-primero font-extralight hover:text-segundo dark:hover:text-primero/70 transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <h2 className="uppercase font-semibold text-segundo dark:text-primero pb-2 border-b border-gray-200 dark:border-primero">
                    Accessories
                  </h2>
                  <ul>
                    {enlacesShop.accessories.map((item) => (
                      <li key={item.name} className="py-1">
                        <Link
                          href={item.href}
                          className="text-segundo/70 dark:text-primero font-extralight hover:text-segundo dark:hover:text-primero/70 transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <h2 className="uppercase font-semibold text-segundo dark:text-primero pb-2 border-b border-gray-200 dark:border-primero">
                    Accessories
                  </h2>
                  <ul>
                    {enlacesShop.accessories.map((item) => (
                      <li key={item.name} className="py-1">
                        <Link
                          href={item.href}
                          className="text-segundo/70 dark:text-primero font-extralight hover:text-segundo dark:hover:text-primero/70 transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <h2 className="uppercase text-lg font-semibold text-segundo dark:text-primero pb-2 border-b border-gray-200 dark:border-primero">
                    Accessories
                  </h2>
                  <ul>
                    {enlacesShop.accessories.map((item) => (
                      <li key={item.name} className="py-1">
                        <Link
                          href={item.href}
                          className="text-segundo/70 dark:text-primero font-extralight hover:text-segundo dark:hover:text-primero/70 transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-11/12 h-2/3 flex flex-col items-start pb-8">
                <div className="w-full h-full flex items-start justify-center gap-6 pb-8">
                  {navbarImages.shop.imagenesBanner.map((imagen, index) => (
                    <Link
                      key={index}
                      href={`${imagen.url}`}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={imagen.src}
                        alt="Community Image"
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                      <h3
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primero text-4xl font-semibold w-full text-center py-2
                    "
                      >
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
