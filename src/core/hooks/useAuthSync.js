// hooks/useAuthSync.js
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/core/store/authStore";

/**
 * Hook que sincroniza la sesión de NextAuth con el store de Zustand
 * Debe ser llamado en un componente de alto nivel (ej: Providers)
 */
export const useAuthSync = () => {
  const { data: session, status } = useSession();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (status === "loading") {
      // Esperando a que NextAuth cargue la sesión
      return;
    }

    if (status === "authenticated" && session?.user) {
      // Usuario autenticado: sincronizar datos con Zustand
      setUser({
        _id: session.user.id, // ID del usuario
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role,
      });
    } else if (status === "unauthenticated") {
      // Usuario no autenticado: limpiar store
      clearUser();
    }
  }, [session, status, setUser, clearUser]);

  return { session, status };
};

export default useAuthSync;
