import Link from "next/link";
import React from "react";

const BannerTop = () => {
  return (
    <Link
      href="/"
      className="banner-top w-full bg-linear-to-r from-cuarto from-10% to-segundo opacity-85 text-primero text-center h-7 flex items-center justify-center font-sans"
    >
      <span className="text-[10px] font-light uppercase font-poppins">
        Envíos a todo el país - rápidos, seguros y sin complicaciones.
      </span>
    </Link>
  );
};

export default BannerTop;
