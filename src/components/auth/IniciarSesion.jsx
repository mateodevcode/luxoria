import { FormIniciarSesion } from "./FormIniciarSesion";
import { LogoAuth } from "./LogoAuth";

export default function IniciarSesion() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LogoAuth />
          <FormIniciarSesion />
        </div>
      </div>
    </div>
  );
}
