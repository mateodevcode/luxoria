"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "@/data/data.slide.colecciones";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ColeccionesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const router = useRouter();

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 6000); // 6 segundos
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 6000); // 6 segundos
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  return (
    <div className="relative w-full h-[35svh] overflow-hidden flex md:hidden ">
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.8, ease: "easeInOut" },
            opacity: { duration: 0.8 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-primero"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />

          <div
            onClick={() => router.push(slides[currentSlide].url)}
            className="absolute bottom-4 left-8 flex items-center justify-center text-center text-segundo/70 group-hover:text-cuarto p-4 z-10 gap-2 transition-all duration-300 cursor-pointer select-none hover:text-cuarto"
          >
            <h3 className="text-base font-light">Comprar ahora</h3>
            <MoveRight className="w-4 h-4" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ColeccionesCarousel;
