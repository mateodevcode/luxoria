"use client";

import { items } from "@/data/data.carrusel.banner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CarruselBanner = () => {
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);
  const isHoveredRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const itemWidth = 384; // w-96
  const stepInCards = 2; // Avanzar 2 tarjetas
  const scrollStep = itemWidth * stepInCards;

  const speed = 0.1; // px por ms

  // Clonar contenido
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const inner = marquee.querySelector(".marquee-inner");
    if (!inner) return;

    const clone = inner.cloneNode(true);
    clone.classList.add("clone");
    marquee.appendChild(clone);

    setIsReady(true);
  }, []);

  // Animación infinita
  useEffect(() => {
    if (!isReady) return;

    const marquee = marqueeRef.current;
    if (!marquee) return;

    const inner = marquee.querySelector(".marquee-inner");
    const totalWidth = inner.offsetWidth;
    const maxScroll = totalWidth;

    let lastTime = 0;
    let accumulated = 0;

    const animate = (time) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isHoveredRef.current) {
        accumulated += deltaTime * speed;
        const currentScroll = accumulated % maxScroll;
        marquee.scrollLeft = currentScroll;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isReady]);

  // Hover
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  // Controles manuales
  const scrollLeft = () => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    marquee.scrollLeft -= scrollStep;
  };

  const scrollRight = () => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    marquee.scrollLeft += scrollStep;
  };

  return (
    <div className="py-8 relative bg-primero">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6 text-segundo/80 font-poppins">
        NUESTRAS COLECCIONES MÁS COMPRADAS
      </h2>

      {/* Contenedor principal */}
      <div
        className="relative w-full h-96  overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Botón izquierdo */}
        <button
          type="button"
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-primero bg-opacity-20 hover:bg-opacity-30 text-segundo p-3 rounded-full backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Botón derecho */}
        <button
          type="button"
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-primero bg-opacity-20 hover:bg-opacity-30 text-segundo p-3 rounded-full backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Degradados */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-linear-to-r from-segundo/70 to-transparent"></div>
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-linear-to-l from-segundo/70 to-transparent"></div>

        {/* Contenedor scrollable */}
        <div
          ref={marqueeRef}
          className="flex w-full h-full overflow-x-auto overflow-y-hidden"
          style={{
            scrollBehavior: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Contenido */}
          <div className="marquee-inner flex h-full gap-6 pl-6 shrink-0">
            {items.map((item, index) => (
              <div
                key={index}
                className="shrink-0 w-96 h-96 relative rounded-xl"
              >
                {/* Imagen */}
                <Image
                  src={item.imageUrl}
                  alt={item.text}
                  width={itemWidth}
                  height={itemWidth}
                  className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-1000"
                />

                {/* Botón superpuesto */}
                <Link
                  href={item.url}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-[80%] flex items-center justify-center"
                >
                  <span className="border border-segundo bg-primero text-segundo font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm text-xs transition-all hover:bg-primero/80  active:scale-95 duration-75">
                    {item.text}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarruselBanner;
