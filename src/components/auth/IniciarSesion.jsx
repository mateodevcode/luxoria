import Image from "next/image";
import { FormIniciarSesion } from "./FormIniciarSesion";

export default function IniciarSesion() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-center py-5 h-32">
            <Image src="/logo/logo.png" alt="Logo" width={200} height={200} />
          </div>
          <FormIniciarSesion />
        </div>
      </div>
    </div>
  );
}
