import { FormRegistrarse } from "./FormRegistrarse";
import { LogoAuth } from "./LogoAuth";

export default function Registrarse() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LogoAuth />
          <FormRegistrarse />
        </div>
      </div>
    </div>
  );
}
