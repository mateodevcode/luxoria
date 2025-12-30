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
import useMensaje from "@/hooks/useMensaje";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/core/hooks/useCart";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const {
    setOpenModalCarritoCompras,
    setOpenModalMenuHamburguesa,
    setOpenModalSearch,
    anchoPantalla,
  } = useContext(AppContext);
  const { handleMensaje } = useMensaje();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // si baja más de 50px cambia
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    if (status === "loading") return;
    if (status === "authenticated") return;

    if (status === "unauthenticated") {
      router.push("/auth/iniciar-sesion");
    } else {
      router.push("/auth/registrarse");
    }
  };

  if (anchoPantalla < 768) {
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
      <div className="w-full items-center justify-center hidden md:flex">
        <Link href={"/"} className="w-auto h-10 md:h-14 mt-2">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="h-12 w-full flex justify-between items-center border-b border-segundo">
        {/* Botón menú mobile */}
        <div className="flex items-center mx-3 md:hidden md:w-40 hover:text-cuarto cursor-pointer select-none text-segundo">
          <button onClick={() => setOpenModalMenuHamburguesa(true)}>
            <HiMenuAlt2 className="text-2xl" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-8 mx-5 md:mx-10 w-10 md:w-48">
          <button
            className="flex items-center gap-2"
            onClick={() =>
              handleMensaje("Hola, estoy interesado en más productos.")
            }
          >
            <Phone className="w-3 h-3" />
            <span className="text-sm">+57 304 6005435</span>
          </button>
        </div>

        {/* Links */}
        <nav className="hidden md:flex mx-3 md:mx-5 lg:mx-10">
          <ul className="flex items-center gap-10">
            <li className="relative group cursor-pointer text-segundo text-sm">
              <Link href={"/"}>Inicio</Link>
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-segundo transition-all duration-300 group-hover:w-full"></span>
            </li>
            <Comprar />
            <li className="relative group cursor-pointer text-segundo text-sm">
              <Link href={"/colecciones"}>Colecciones</Link>
              <span className="absolute left-0 -bottom-1 w-0 h-px dark:bg-primero bg-segundo transition-all duration-300 group-hover:w-full"></span>
            </li>
            <Esmeraldas />
            <li className="relative group cursor-pointer text-cuarto  text-sm uppercase font-medium">
              <Link href={"/sobre-nosotros"} className="relative">
                Luxoria
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-cuarto transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Iconos */}
        <div className="flex items-center gap-8 mx-3 md:mx-5 lg:mx-10 md:w-40 justify-end">
          <div
            className="relative group hidden md:flex cursor-pointer select-none"
            onClick={() => handleLogin()}
          >
            <BsPerson className="text-base relative z-10 text-segundo hover:text-cuarto" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="hover-circle"></span>
            </span>
          </div>

          <div
            className="relative group hidden md:flex cursor-pointer select-none"
            onClick={() => setOpenModalSearch(true)}
          >
            <LuSearch className="text-base relative z-10 text-segundo hover:text-cuarto" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="hover-circle"></span>
            </span>
          </div>

          {/* <Themme /> */}

          <div
            className="relative group cursor-pointer select-none"
            onClick={() => setOpenModalCarritoCompras(true)}
          >
            <AiOutlineShopping
              className={`text-2xl md:text-base relative z-10 text-segundo ${
                items.length === 0 ? "hover:text-cuarto" : ""
              }`}
            />
            {items.length > 0 && (
              <div className="absolute top-1 right-0.5">
                <div className="relative flex items-center justify-center w-5 h-5">
                  {/* Onda pulsante */}
                  <span className="absolute inline-flex w-full h-full rounded-full bg-cuarto opacity-50 animate-ping"></span>
                  {/* Punto central */}
                  <span className="relative inline-flex w-3.5 h-3.5 bg-cuarto/50"></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
