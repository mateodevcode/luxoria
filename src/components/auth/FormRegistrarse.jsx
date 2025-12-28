"use client";

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Lock, Mail, User } from "lucide-react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import useUsuario from "@/hooks/useUsuario";
import { toast } from "sonner";

export function FormRegistrarse() {
  const { formDataUsuario, fetchUsuario } = useContext(AppContext);
  const { crearUsuario, handleChange, loading } = useUsuario();

  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [verContraseña, setVerContraseña] = useState(false);
  const [verConfirmarContraseña, setVerConfirmarContraseña] = useState(false);

  useEffect(() => {
    fetchUsuario();
  }, []);

  return (
    <form className="flex flex-col gap-6 text-segundo font-poppins">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crear una cuenta</h1>
      </div>

      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="nombre">Nombre completo</Label>
          <div className="relative flex items-center gap-4">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-segundo z-10" />
            <input
              type="text"
              placeholder="Juan Pérez"
              name="name"
              value={formDataUsuario.name}
              onChange={handleChange}
              className="pl-10 pr-10 bg-transparent focus text-segundo border border-segundo/30 w-full text-sm p-2 focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative flex items-center gap-4">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-segundo z-10" />
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              name="email"
              value={formDataUsuario.email}
              onChange={handleChange}
              className="pl-10 pr-10 bg-transparent focus text-segundo border border-segundo/30 w-full text-sm p-2 focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative flex items-center gap-4">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-segundo z-10" />
            <input
              type={verContraseña ? "text" : "password"}
              name="password"
              value={formDataUsuario.password}
              onChange={handleChange}
              placeholder="********"
              className="pl-10 bg-transparent focus text-segundo border-segundo/30 w-full text-sm p-2 border focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition backdrop-blur-sm"
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

        <div className="grid gap-2">
          <Label htmlFor="password">Confirmar contraseña</Label>
          <div className="relative flex items-center gap-4">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-segundo z-10" />
            <input
              type={verConfirmarContraseña ? "text" : "password"}
              name="confirmarPassword"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              placeholder="********"
              className="pl-10 bg-transparent focus text-segundo border-segundo/30 w-full text-sm p-2 border focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition backdrop-blur-sm"
            />
            <div className="absolute right-3 top-2.5 h-4 w-4">
              {verConfirmarContraseña ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setVerConfirmarContraseña(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer"
                  onClick={() => setVerConfirmarContraseña(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            if (formDataUsuario.password !== confirmarPassword) {
              toast.error("Las contraseñas no coinciden");
              return;
            }
            crearUsuario(formDataUsuario);
          }}
          className="w-full bg-cuarto text-segundo hover:bg-cuarto/80 cursor-pointer select-none font-medium px-3 py-2 text-sm active:scale-95 transition-all duration-300"
        >
          Registrarse
        </button>
      </div>

      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/auth/iniciar-sesion"
          className="font-semibold hover:text-cuarto"
        >
          Inicia sesión
        </Link>
      </div>
    </form>
  );
}
