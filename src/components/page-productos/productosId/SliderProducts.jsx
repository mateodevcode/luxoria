"use client";

import { CollectionCard } from "@/components/productos/CollectionCard";
import { useState, useRef, useEffect, useCallback } from "react";

export const SliderProducts = ({ productos = [], titulo = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(4);
  const sliderRef = useRef(null);

  // Configuración responsive con useCallback para evitar recreaciones
  const getItemsPerView = useCallback(() => {
    if (typeof window === "undefined") return 4;
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 4;
  }, []);

  // Inicialización y manejo de resize
  useEffect(() => {
    setItemsPerView(getItemsPerView());
  }, [getItemsPerView]);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);

      // Recalcular currentIndex para evitar índices inválidos
      const newMaxIndex = Math.max(0, productos.length - newItemsPerView);
      setCurrentIndex((prev) => Math.min(prev, newMaxIndex));
    };

    // Debounce para mejorar rendimiento
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [getItemsPerView, productos.length]);

  // Calcular maxIndex de forma segura
  const maxIndex = Math.max(0, productos.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Touch events para mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 80;
    const isRightSwipe = distance < -80;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Validación de productos
  const productsToUse = Array.isArray(productos) ? productos : [];

  // Evitar renderizado si no hay productos
  if (productsToUse.length === 0) {
    return (
      <div className="w-full relative">
        <div className="relative flex flex-col items-center py-8">
          <h2 className="text-xl font-semibold uppercase font-montserrat text-blackbase-500 dark:text-whitebase-500">
            {titulo}
          </h2>
          <div className="w-10 h-[3px] bg-gray-300 mt-2"></div>
        </div>
        <p className="text-center py-8 text-gray-500">
          No hay productos disponibles
        </p>
      </div>
    );
  }

  const slideWidth = 100 / itemsPerView;

  return (
    <div className="w-full relative">
      {/* Título de la sección */}
      <div className="relative flex flex-col items-center py-8">
        <h2 className="text-xl font-semibold uppercase font-montserrat text-blackbase-500 dark:text-whitebase-500">
          {titulo}
        </h2>
        <div className="w-10 h-[3px] bg-cuarto mt-2"></div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Botones de navegación - solo mostrar si hay más productos de los que caben en la vista */}
        {productsToUse.length > itemsPerView && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black border border-gray-300 dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous products"
              >
                <svg
                  className="w-6 h-6"
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
            )}

            {currentIndex < maxIndex && (
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black border border-gray-300 dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next products"
              >
                <svg
                  className="w-6 h-6"
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
            )}
          </>
        )}

        {/* Slider */}
        <div
          ref={sliderRef}
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * slideWidth}%)`,
            }}
          >
            {productsToUse.map((product, index) => (
              <div
                key={product.id || `product-${index}`}
                className="shrink-0"
                style={{ width: `${slideWidth}%` }}
              >
                <CollectionCard item={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de página (dots) - solo mostrar si hay múltiples páginas */}
        {maxIndex > 0 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-black dark:bg-white scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
