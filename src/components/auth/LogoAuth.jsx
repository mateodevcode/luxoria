"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export const LogoAuth = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center justify-center py-5 h-32"
    >
      <Image src="/logo/logo.png" alt="Logo" width={200} height={200} />
    </div>
  );
};
