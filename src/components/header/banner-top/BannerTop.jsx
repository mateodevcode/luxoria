"use client";

import Link from "next/link";

const BannerTop = () => {
  return (
    <>
      <Link
        href="/"
        className="banner-top w-full bg-linear-to-r from-cuarto from-10% to-segundo opacity-85 text-primero text-center h-7 flex items-center justify-center font-poppins overflow-hidden"
      >
        <span className="banner-text text-[10px] font-light uppercase whitespace-nowrap">
          Envíos a todo el país - rápidos, seguros y sin complicaciones.
        </span>
      </Link>

      <style jsx>{`
        @keyframes slideInSlideOut {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          10% {
            transform: translateX(0);
            opacity: 1;
          }
          90% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        .banner-text {
          animation: slideInSlideOut 10s infinite;
          display: inline-block;
        }
      `}</style>
    </>
  );
};

export default BannerTop;
