import React, { Suspense } from "react";
import IniciarSesion from "@/components/auth/IniciarSesion";
import Loading from "@/components/loading/Loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <IniciarSesion />
    </Suspense>
  );
};

export default page;
