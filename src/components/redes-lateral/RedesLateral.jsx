"use client";

import { AppContext } from "@/context/AppContext";
import { footer } from "@/data/footer";
import Link from "next/link";
import React, { useContext } from "react";

const RedesLateral = () => {
  const { openModalSearchResult } = useContext(AppContext);

  return (
    <div
      className={`fixed md:top-1/2 top-60 left-0  w-max h-auto flex flex-col gap-4 bg-segundo p-4 bg-linear-60 from-segundo to-emerald-900 rounded-r-md ${
        openModalSearchResult ? "z-0" : "z-30"
      }`}
    >
      {footer.redesSociales.map((red, index) => (
        <Link
          key={index}
          href={red.url}
          target="_blank"
          className="text-primero/70 hover:text-primero transition-colors duration-300"
        >
          {red.icon}
        </Link>
      ))}
    </div>
  );
};

export default RedesLateral;
