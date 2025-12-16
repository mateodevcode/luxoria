import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="hidden md:flex items-center">
      <div className="w-1/2 md:w-1/3 h-[80svh] hidden lg:flex">
        <Image
          src={"/hero/hero-2.png"}
          alt={"hero 1"}
          width={1200}
          height={1200}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/3 h-[80svh]">
        <Image
          src={"/hero/hero-3.png"}
          alt={"hero 1"}
          width={1200}
          height={1200}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/3 h-[80svh]">
        <Image
          src={"/hero/hero-4.png"}
          alt={"hero 1"}
          width={1200}
          height={1200}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
