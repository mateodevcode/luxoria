"use client";

import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import useIniciarSesion from "@/hooks/useIniciarSesion";
import Link from "next/link";

export function FormIniciarSesion() {
  const router = useRouter();
  const { formDataUsuario, setFormDataUsuario } = useContext(AppContext);
  const [verContraseña, setVerContraseña] = useState(false);
  const { handleChange, handleLoginCredenciales } = useIniciarSesion();
  const searchParams = useSearchParams();
  const emailUrl = searchParams.get("email");

  useEffect(() => {
    if (emailUrl) {
      formDataUsuario.email = emailUrl;
    }
  }, [emailUrl, formDataUsuario]);

  return (
    <form className="flex flex-col gap-6 text-segundo/90 font-poppins">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Inicia sesión</h1>
        <p className="text-balance text-sm text-segundo/70">
          Ingresa tu email para acceder a tu cuenta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative flex items-center gap-4">
            <Mail className="absolute left-3 h-4 w-4 text-segundo/70 z-10" />
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={formDataUsuario.email}
              onChange={handleChange}
              name="email"
              className="pl-10 pr-10 bg-transparent focus text-segundo border border-segundo/10 w-full text-sm p-2 focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition backdrop-blur-sm"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              href={`/olvidaste-tu-contrasena?email=${formDataUsuario.email}`}
              className="ml-auto text-sm hover:text-cuarto cursor-pointer select-none"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative flex items-center gap-4">
            <Lock className="absolute left-3 h-4 w-4 text-segundo/70 z-10" />
            <input
              type={verContraseña ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formDataUsuario.password}
              onChange={handleChange}
              className="pl-10 bg-transparent focus text-segundo border-segundo/10 w-full text-sm p-2 border focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition backdrop-blur-sm"
            />
            <div className="absolute right-3 top-2.5 h-4 w-4">
              {verContraseña ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => handleLoginCredenciales(e)}
          className="w-full font-medium py-2 px-3 bg-cuarto text-segundo hover:bg-cuarto/80 cursor-pointer select-none"
        >
          Iniciar sesión
        </button>
      </div>
      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <button
          type="button"
          onClick={() => {
            router.push("/auth/registrarse");
            setFormDataUsuario({
              ...formDataUsuario,
              email: "",
            });
          }}
          className="font-semibold hover:text-cuarto"
        >
          Regístrate
        </button>
      </div>
    </form>
  );
}
