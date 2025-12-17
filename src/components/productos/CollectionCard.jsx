"use client";

import { formatoDinero } from "@/libs/formatoDinero";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const CollectionCard = ({ item, filtroProductos }) => {
  const [images, setImages] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const [seenImages, setSeenImages] = useState(new Set());
  const router = useRouter();

  const duration = 3000; // 5 segundos

  useEffect(() => {
    if (!isHovered) {
      setProgress(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const startCycle = () => {
      const startTime = Date.now();

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);

        if (newProgress >= 100) {
          setProgress(0);
          setSeenImages((prev) => {
            const next = new Set(prev);
            next.add(images);
            return next;
          });

          setImages((prev) => {
            if (prev === item.imagenes.length) {
              setSeenImages(new Set());
              return 1;
            }
            return prev + 1;
          });
        } else {
          setProgress(newProgress);
        }
      }, 10);
    };

    startCycle();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, images, item.imagenes.length]);

  return (
    <div className="dark:bg-segundo flex flex-col gap-2 bg-primero h-[600px] font-poppins">
      <div
        className="w-full h-full relative flex items-center justify-center group max-h-[500px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen */}
        <Image
          src={
            item.imagenes[images - 1].url ||
            "/seccion/slider/seccion-1-slider.png"
          }
          alt={item.nombre || "Imagenes de productos"}
          width={400}
          height={500}
          className="w-auto md:w-auto h-full md:h-[500px] object-cover"
          onClick={() => router.push(`/productos/${item.url}`)}
        />

        {/* BARRAS DE CARGA */}
        <div className="absolute top-2 left-0 right-0 px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-1">
            {item.imagenes.map((_, index) => {
              const imageIndex = index + 1;
              const isCurrent = imageIndex === images;
              const wasSeen = seenImages.has(imageIndex);

              return (
                <div
                  key={index}
                  className="h-1 flex-1 bg-gray-500 rounded-full overflow-hidden"
                >
                  {isCurrent ? (
                    <div
                      className="h-full bg-segundo origin-left"
                      style={{
                        width: `${isHovered ? Math.min(progress, 100) : 0}%`,
                        transition: "none",
                      }}
                    />
                  ) : wasSeen ? (
                    <div className="h-full bg-segundo" />
                  ) : (
                    <div className="h-full bg-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Etiqueta Popular */}
        {item.isPopular && (
          <div className="absolute bottom-4 left-4 text-xs text-primero opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none bg-segundo  px-2 py-1">
            Popular Style 🔥
          </div>
        )}

        {/* Discount */}
        {item.descuento > 0 && (
          <div className="absolute top-4 right-4 text-xs text-primero opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none bg-segundo  px-2 py-1">
            promo {item.descuento}%
          </div>
        )}

        {/* Quick Add */}
        <div className="absolute bottom-0 p-2 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full bg-primero">
          <div className="w-full h-10 bg-segundo flex items-center justify-center cursor-pointer select-none active:scale-95 duration-75 relative group/btn">
            <span className=" text-primero transition-opacity duration-200 group-hover/btn:opacity-0">
              Añadir al carrito
            </span>
            <div className=" text-primero opacity-0 group-hover/btn:opacity-100 absolute transition-opacity duration-200 pointer-events-none flex items-center justify-center gap-2">
              {item.size.map((size) => (
                <button
                  key={size}
                  className="text-primero text-sm transition-transform duration-150 pointer-events-auto hover:bg-cuarto px-3 py-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Talla seleccionada:", size);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info bajo la imagen */}
      <div className="text-segundo h-20 px-4">
        <div className="border border-segundo p-2 rounded-md text-sm text-center hover:bg-cuarto/30 cursor-pointer transition-all duration-200 w-10/12 mx-auto">
          Compra ahora y ahorra {item.descuento}%
        </div>

        <h3 className=" text-sm md:text-base mt-2">{item.nombre}</h3>
        <p className=" text-sm font-semibold">
          {formatoDinero(item.precio) + " COP"}
        </p>
      </div>
    </div>
  );
};
