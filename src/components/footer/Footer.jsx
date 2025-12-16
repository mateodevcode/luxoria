"use client";

import Image from "next/image";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { footer } from "@/data/footer";
import useMensaje from "@/hooks/useMensaje";
import { useRouter } from "next/navigation";

const Footer = () => {
  const { handleMensaje } = useMensaje();
  const router = useRouter();

  const handleEnlacesPrincipales = (enlace) => {
    if (enlace === "/contacto") {
      handleMensaje("Hola, me gustaria mas información.");
    } else if (enlace === "/soporte") {
      handleMensaje("Necesito ayuda.");
    } else {
      router.push(enlace);
    }
  };

  return (
    <div className="h-full w-full bg-gray-100 p-6 font-poppins font-light">
      <div>
        <div className="pb-10">
          <div className="flex items-center justify-start">
            <Image
              src={footer.logo.src}
              alt={footer.logo.alt}
              width={400}
              height={100}
              className="w-32 h-auto"
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-start justify-between md:gap-0 gap-10 pb-10">
          <div>
            <h2 className="text-xl mb-2 uppercase  text-segundo">
              {footer.nombre}
            </h2>
            <Image
              src={footer.imagen.src}
              alt={footer.imagen.alt}
              width={500}
              height={500}
              className="inline-block md:w-96 w-full"
            />
          </div>
          <div className="md:w-96 w-full">
            <h3 className="uppercase text-xl text-segundo">
              {footer.tituloEnlacesPrincipales}
            </h3>
            <div className="flex flex-col gap-2 mt-4">
              {footer.enlacesPrincipales.map((enlace, index) => (
                <div className="relative group inline-block" key={index}>
                  <button
                    onClick={() => handleEnlacesPrincipales(enlace.href)}
                    className="text-segundo/80 hover:text-segundo transition-colors duration-300 text-base md:text-lg  relative"
                  >
                    {enlace.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-[400px] w-full">
            <h3 className="uppercase text-xl text-segundo">
              {footer.tituloParrafo}
            </h3>
            <p className="text-segundo/50 mt-4  md:text-base text-sm">
              {footer.parrafo}
            </p>
          </div>
        </div>
      </div>
      <div className="h-px bg-segundo/20" />
      <div className="flex flex-col justify-between pt-5">
        <div className="flex md:flex-row flex-col items-start md:items-center justify-between pb-6 md:gap-0 gap-4">
          <p className="md:text-4xl text-2xl text-segundo/80 font-bold">
            {footer.frase}
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-lg md:text-xl">
              {footer.redesSociales.map((red, index) => (
                <Link
                  key={index}
                  href={red.url}
                  target="_blank"
                  className="text-segundo/80 hover:text-cuarto transition-colors duration-300"
                >
                  {red.icon}
                </Link>
              ))}
            </div>
            <button className="flex items-center gap-2 bg-cuarto hover:bg-cuarto/80 text-white px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 select-none active:scale-95">
              <FaRegHeart />
              <span className="text-sm ">{footer.botonRedesSociales}</span>
            </button>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:items-center justify-between md:gap-0 gap-4">
          <div className="flex flex-col gap-2">
            <p className=" text-segundo">{footer.pieFooter}</p>
          </div>
          <div className="flex items-center gap-1 px-4 py-2">
            {footer.mediosPago.map((medio, index) => (
              <div key={index} className="flex items-center w-12 h-6">
                <Image
                  src={medio.imageUrl}
                  alt={medio.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
