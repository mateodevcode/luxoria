"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import { logo } from "@/data/logo";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";

const NavbarMobile = () => {
  const [scrolled, setScrolled] = useState(false);
  const {
    setOpenModalCarritoCompras,
    setOpenModalMenuHamburguesa,
    anchoPantalla,
  } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // si baja más de 50px cambia
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (anchoPantalla > 768) {
    return null;
  }

  return (
    <div
      className={`sticky top-0 z-30 transition-colors duration-300 font-poppins font-light ${
        scrolled
          ? "bg-primero/50 backdrop-blur-sm hover:bg-primero"
          : "bg-primero"
      }`}
    >
      <div className="h-12 w-full flex justify-between items-center border-b border-segundo">
        {/* Botón menú mobile */}
        <div className="flex items-center mx-3 md:hidden md:w-40 hover:text-cuarto cursor-pointer select-none text-segundo">
          <button onClick={() => setOpenModalMenuHamburguesa(true)}>
            <HiMenuAlt2 className="text-2xl" />
          </button>
        </div>

        <div className="w-full flex items-center justify-center md:hidden">
          <Link href={"/"} className="w-32 h-8 relative">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 768px) 128px, 128px"
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <div
          className="relative group cursor-pointer select-none mx-3 md:hidden md:w-40"
          onClick={() => setOpenModalCarritoCompras(true)}
        >
          <AiOutlineShopping className="text-2xl md:text-base relative z-10 text-segundo hover:text-cuarto" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="hover-circle"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
