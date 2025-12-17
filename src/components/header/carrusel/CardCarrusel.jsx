import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardCarrusel = ({ imageUrl, titulo, url }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-w-[100px] max-w-[120px]">
      {/* Contenedor de imagen */}
      <div className="w-16 h-16 rounded-full border-2 border-segundo flex items-center justify-center hover:border-cuarto/80">
        <Link
          href={url}
          rel="noopener noreferrer"
          className="border-2 border-primero w-full h-full rounded-full bg-gray-200 overflow-hidden"
        >
          <Image
            src={imageUrl}
            alt={titulo}
            width={80}
            height={80}
            className="rounded-full object-cover w-full h-full"
          />
        </Link>
      </div>

      {/* Texto */}
      <span className="text-[10px] text-center font-sans font-semibold uppercase leading-tight text-segundo">
        {titulo}
      </span>
    </div>
  );
};

export default CardCarrusel;
