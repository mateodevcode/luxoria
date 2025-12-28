import { FormRegistrarse } from "./FormRegistrarse";
import Image from "next/image";

export default function Registrarse() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-center py-5 h-32">
            <Image src="/logo/logo.png" alt="Logo" width={200} height={200} />
          </div>
          <FormRegistrarse />
        </div>
      </div>
    </div>
  );
}
