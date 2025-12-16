"use client";
import { useEffect, useRef } from "react";
import { MdOutlineDiscount } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { TbAdjustmentsStar } from "react-icons/tb";

const CarruselInfinito = () => {
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const accumulatedRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Velocidad en píxeles por milisegundo (ajustable)
  const speed = 0.05; // 0.05 = lento, 0.15 = rápido

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const inner = marquee.querySelector(".marquee-inner");
    const clone = inner.cloneNode(true);
    marquee.appendChild(clone);

    const totalWidth = inner.offsetWidth; // Ancho de una copia
    const maxScroll = totalWidth; // Reiniciamos después de una copia

    const animate = (currentTime) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Si está en hover, solo guardamos el tiempo y seguimos
      if (!isHoveredRef.current) {
        accumulatedRef.current += deltaTime * speed;
        const currentScroll = accumulatedRef.current % maxScroll;
        marquee.scrollLeft = currentScroll;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Eventos de hover
    const handleEnter = () => (isHoveredRef.current = true);
    const handleLeave = () => (isHoveredRef.current = false);

    marquee.addEventListener("mouseenter", handleEnter);
    marquee.addEventListener("mouseleave", handleLeave);

    // Iniciar animación
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      marquee.removeEventListener("mouseenter", handleEnter);
      marquee.removeEventListener("mouseleave", handleLeave);
    };
  }, [speed]);

  const items = [
    { text: "Envio gratis", icon: <TbTruckDelivery /> },
    { text: "Tarjeta de regalo", icon: <MdOutlineDiscount /> },
    { text: "Soporte 24/7", icon: <MdOutlineDiscount /> },
    { text: "Alta calidad", icon: <TbAdjustmentsStar /> },
    { text: "Descuentos de 25%", icon: <MdOutlineDiscount /> },
    { text: "Envio gratis", icon: <TbTruckDelivery /> },
    { text: "Tarjeta de regalo", icon: <MdOutlineDiscount /> },
    { text: "Soporte 24/7", icon: <MdOutlineDiscount /> },
    { text: "Alta calidad", icon: <TbAdjustmentsStar /> },
    { text: "Descuentos de 25%", icon: <MdOutlineDiscount /> },
  ];

  return (
    <div
      ref={marqueeRef}
      className="w-full overflow-x-hidden whitespace-nowrap bg-cuarto/50 text-segundo h-12 flex items-center font-poppins"
    >
      <div className="marquee-inner inline-flex gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-2 text-xs md:text-sm font-extralight"
          >
            <span className="text-base md:text-lg">{item.icon}</span>
            <span className="">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarruselInfinito;
