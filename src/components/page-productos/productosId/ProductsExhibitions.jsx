import { exhibitions } from "@/data/data.producto.exhibitions";
import Image from "next/image";
import React from "react";

const ProductsExhibitions = () => {
  return (
    <div className="font-poppins flex flex-col md:gap-0 gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col justify-center items-center md:justify-end md:items-end">
          <p className="font-semibold text-xl">{exhibitions[0].title}</p>
          <p className="text-center md:text-right max-w-md text-sm mt-2">
            {exhibitions[0].description}
          </p>
        </div>
        <div className="w-full flex items-center justify-center">
          <Image
            src={exhibitions[0].image}
            alt={exhibitions[0].title}
            className="rounded h-96 w-auto object-cover"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="w-full flex items-center justify-center">
          <Image
            src={exhibitions[1].image}
            alt={exhibitions[1].title}
            className="rounded h-96 w-auto object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col justify-center items-center md:justify-start md:items-start">
          <p className="font-semibold text-xl">{exhibitions[1].title}</p>
          <p className="text-center md:text-left max-w-md text-sm mt-2">
            {exhibitions[1].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsExhibitions;
