"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "@/data/data.slide.hero";
import { MdKeyboardArrowRight, MdOutlineArrowForwardIos } from "react-icons/md";

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

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

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetAutoPlay();
  };

  const goToSlide = (index) => {
    const newDirection = index > currentSlide ? 1 : -1;
    setDirection(newDirection);
    setCurrentSlide(index);
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
    <div className="relative w-full h-svh md:h-[80vh] lg:h-svh 2xl:h-svh overflow-hidden flex md:hidden">
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

          <div className="absolute inset-0 bg-segundo/5" />

          {/* Texto principal */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-primero text-center px-4">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-xl md:text-2xl lg:text-3xl max-w-2xl"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-primero/20 hover:bg-primero/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-primero"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-primero/20 hover:bg-primero/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-primero"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primero scale-125"
                : "bg-primero/50 hover:bg-primero/70"
            }`}
          />
        ))}
      </div>

      <div className="absolute top-8 right-8 z-20 bg-segundo/30 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-primero text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-8 left-8 z-20 bg-segundo/30 backdrop-blur-sm rounded-full p-3 hover:bg-segundo/50 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 text-primero"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isAutoPlaying ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
          )}
        </svg>
      </button>

      <div className="absolute top-0 left-0 right-0 z-20 h-px bg-primero/20">
        <motion.div
          className="h-full bg-cuarto"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 6, // 6 segundos
            ease: "linear",
            repeat: isAutoPlaying ? Infinity : 0,
          }}
          key={currentSlide}
        />
      </div>

      <div className="bg-linear-to-t from-segundo/30 to-transparent w-full h-full absolute bottom-0" />
    </div>
  );
};

export default ImageCarousel;
