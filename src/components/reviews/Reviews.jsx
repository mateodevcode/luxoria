"use client";

import { firstLetter } from "@/data/firstLetter";
import { useState, useRef, useContext } from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { reviews } from "@/data/reviews";
import { alcanceGlobal } from "@/data/alcanceglobal";
import { colorsRandom } from "@/data/coloramdom";
import { AppContext } from "@/context/AppContext";

const Reviews = () => {
  const { setImageSelectedReview, setOpenModalReview } = useContext(AppContext);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const getColorByUserId = (userId) => {
    return colorsRandom[userId % colorsRandom.length];
  };

  const cardWidth = 320;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-primero dark:bg-segundo py-10 font-poppins">
      <div
        className="w-full h-auto p-8 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-center text-xl md:text-2xl font-semibold mb-6 text-segundo/80 uppercase">
          Reseñas de nuestros clientes
        </h2>

        {/* Contenedor del slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth p-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {reviews.map((review, index) => (
            <div
              onClick={() => {
                setImageSelectedReview(review);
                setOpenModalReview(true);
              }}
              key={index}
              className="shrink-0 w-60 h-72 border border-segundo rounded-xl bg-primero shadow-sm cursor-pointer"
            >
              {/* Rating + Fecha */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(review.rating) ? (
                        <IoIosStar />
                      ) : i === Math.floor(review.rating) &&
                        review.rating % 1 !== 0 ? (
                        <IoIosStarHalf />
                      ) : (
                        <IoIosStar className="text-gray-400" />
                      )}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>

              {/* Comentario */}
              <div className="px-4 py-2 flex flex-col gap-2 h-40">
                <span className="text-lg font-semibold text-gray-800">
                  {review.title}
                </span>
                <div className="text-gray-700 line-clamp-3">
                  ❝{review.comment}❞
                </div>
              </div>

              {/* Usuario con color aleatorio */}
              <div className="flex items-center p-4 gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center relative ${getColorByUserId(
                    review.id
                  )}`}
                >
                  <span className="text-lg font-semibold text-gray-700">
                    {firstLetter(review.name)}
                  </span>
                  <div className="absolute bottom-0 right-0 bg-primero rounded-full p-[2px]">
                    <VscVerifiedFilled className="text-blue-500" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm text-segundo">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-600">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación (aparecen al hacer hover) */}
        <button
          type="button"
          onClick={scrollLeft}
          className={`absolute top-1/2 left-8 z-10 bg-primero text-segundo w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-px border-segundo/10 cursor-pointer select-none ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          } hover:scale-110`}
        >
          <MdKeyboardArrowLeft className="text-2xl" />
        </button>

        <button
          type="button"
          onClick={scrollRight}
          className={`absolute top-1/2 right-8 z-10 bg-primero text-segundo w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-px border-segundo/10 cursor-pointer select-none ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          } hover:scale-110`}
        >
          <MdKeyboardArrowRight className="text-2xl" />
        </button>
      </div>

      <div className="w-full flex md:flex-row flex-col items-center justify-center gap-6 mt-10">
        <div className="dark:text-primero text-segundo text-lg">
          Valoración de nuestros clientes
        </div>

        <div className="w-60 rounded-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center h-full dark:text-primero text-segundo text-5xl font-bold">
            4.5
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-amber-400 text-3xl">
                {i < 4 ? <IoIosStar /> : <IoIosStarHalf />}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 dark:text-primero text-segundo text-sm">
          <span>Opiniones verificadas de clientes</span>
          <VscVerifiedFilled className="dark:text-primero text-segundo text-2xl" />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-11/12 md:w-9/12 gap-4">
          {alcanceGlobal.map((item, index) => (
            <div key={index} className="flex items-center flex-col p-4">
              <div className="text-2xl dark:text-primero/80 text-segundo/80">
                {item.icon}
              </div>
              <h3 className="font-semibold text-base md:text-xl mt-2 text-segundo dark:text-primero">
                {item.title}
              </h3>
              <p className="text-segundo/50 dark:text-primero/50 md:text-base text-sm text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
