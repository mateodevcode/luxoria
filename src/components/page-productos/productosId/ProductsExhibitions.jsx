import React from "react";

const ProductsExhibitions = () => {
  return (
    <div className="font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-96">
        <div className="flex flex-col justify-end items-end">
          <p className="font-semibold text-xl">Barely There. Big Impact.</p>
          <p className="text-right max-w-md text-sm mt-2">
            Fusing GLIDE’s hyper-sexiness with FLIRT’s ease, FLAUNT delivers
            maximum impact with minimal coverage. Ultra-thin 6 mm
            straps/waistband and a second-skin 95% Rayon / 5% Spandex feel make
            it “nothing to wear” that looks like everything—across Bikini Brief,
            Thong, and Jock in three dual-tone combos.
          </p>
        </div>
        <img
          src="/productos/exhibicions/image-1.png"
          alt="imagen de prueba"
          className="rounded h-96 w-auto object-cover"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-96">
        <img
          src="/productos/exhibicions/image-2.png"
          alt="imagen de prueba"
          className="rounded h-96 w-auto object-cover"
        />
        <div className="flex flex-col justify-start items-start">
          <p className="font-semibold text-xl">
            Feel Nothing. Steal the Spotlight.
          </p>
          <p className="text-left max-w-md text-sm mt-2">
            Cut to hug in all the right places and finished with sleek micro
            details, FLAUNT is made to be seen—and to stay comfy all day. The
            fabric is irresistibly soft with everyday practicality and
            undeniable sex appeal, topped with the DTF “Down To Flaunt” energy
            that makes confidence a no-brainer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsExhibitions;
