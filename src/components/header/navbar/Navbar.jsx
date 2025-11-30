"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import { logo } from "@/data/logo";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import { Phone } from "lucide-react";
import Comprar from "../hover-card/Comprar";
import Esmeraldas from "../hover-card/Esmeraldas";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const {
    setOpenModalCarritoCompras,
    setOpenModalMenuHamburguesa,
    setOpenModalSearch,
  } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // si baja más de 50px cambia
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-30 transition-colors duration-300 font-poppins font-light ${
        scrolled
          ? "bg-primero/50 backdrop-blur-sm hover:bg-primero dark:bg-segundo/50 dark:hover:bg-segundo"
          : "bg-primero dark:bg-segundo"
      }`}
    >
      <div className="w-full flex items-center justify-center">
        <div className="w-auto h-14 mt-2">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="h-12 w-full flex justify-between items-center border-b border-segundo">
        {/* Botón menú mobile */}
        <div className="flex items-center mx-5 md:mx-10 md:hidden w-10 md:w-40">
          <button onClick={() => setOpenModalMenuHamburguesa(true)}>
            <HiMenuAlt2 className="text-2xl hover:text-black/70 cursor-pointer select-none dark:hover:text-primero/70 text-segundo dark:text-primero" />
          </button>
        </div>

        <div className="flex items-center gap-8 mx-5 md:mx-10 w-10 md:w-48">
          <button className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span className="text-sm">+57 304 6005435</span>
          </button>
        </div>

        {/* Links */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-10">
            <li className="relative group cursor-pointer dark:text-primero text-segundo text-sm">
              Inicio
              <span className="absolute left-0 -bottom-1 w-0 h-px dark:bg-primero bg-segundo transition-all duration-300 group-hover:w-full"></span>
            </li>
            <Comprar />
            <li className="relative group cursor-pointer dark:text-primero text-segundo text-sm">
              Productos
              <span className="absolute left-0 -bottom-1 w-0 h-px dark:bg-primero bg-segundo transition-all duration-300 group-hover:w-full"></span>
            </li>
            <Esmeraldas />
            <li className="relative group cursor-pointer text-cuarto  text-sm uppercase">
              <Link href={"/collections"} className="relative">
                Luxoria
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-cuarto transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Iconos */}
        <div className="flex items-center gap-8 mx-5 md:mx-10 w-10 md:w-48 justify-end">
          <Link
            href="/profile"
            className="relative group hidden md:flex cursor-pointer select-none"
          >
            <BsPerson className="text-base relative z-10 text-segundo dark:text-primero hover:text-segundo" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="hover-circle"></span>
            </span>
          </Link>

          <div
            className="relative group hidden md:flex cursor-pointer select-none"
            onClick={() => setOpenModalSearch(true)}
          >
            <LuSearch className="text-base relative z-10 text-segundo dark:text-primero hover:text-segundo" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="hover-circle"></span>
            </span>
          </div>

          {/* <Themme /> */}

          <div
            className="relative group cursor-pointer select-none"
            onClick={() => setOpenModalCarritoCompras(true)}
          >
            <AiOutlineShopping className="text-base relative z-10 text-segundo dark:text-primero hover:text-segundo" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="hover-circle"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
