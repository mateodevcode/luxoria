"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { enlacesShop } from "@/data/enlaces";
import { navbarImages } from "@/data/imagenes";

export default function Esmeraldas() {
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
        Esmeraldas
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
          } h-[80svh] bg-primero dark:bg-segundo shadow-lg border-b z-50 overflow-hidden`}
          style={{
            zIndex: 999,
          }}
        >
          <div className="flex items-center justify-center gap-8 p-8 h-full">
            <div className="w-2/8 h-full flex flex-col gap-4">
              <div>
                <ul>
                  {enlacesShop.underwear.map((item, index) => (
                    <li key={index} className="py-1">
                      <Link
                        href={item.href}
                        className="text-segundo dark:text-primero font-montserrat dark:hover:text-gray-400 transition-colors duration-200 text-2xl font-normal hover:text-segundo/70"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-10/12 h-full flex flex-col items-start">
              <div className="w-full h-full flex items-start justify-center gap-8 pb-8 font-montserrat">
                {navbarImages.community.imagenesBanner.map((image, index) => (
                  <div key={index} className="w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <Link
                      href={image.link}
                      className="flex items-center gap-2 py-3 uppercase text-lg text-segundo dark:text-primero dark:hover:text-primero/80 active:scale-95 transition-transform duration-200"
                    >
                      <span>learn more</span>
                      <MdKeyboardArrowRight />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
