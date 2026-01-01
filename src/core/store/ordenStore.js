import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrdenStore = create(
  persist(
    (set) => ({
      orden: null,
      isLoggedIn: false,

      // Actualizar orden desde sesión de NextAuth
      setOrden: (ordenData) => {
        set({
          orden: ordenData,
          isLoggedIn: !!ordenData,
        });
      },

      // Limpiar orden al cerrar sesión
      clearOrden: () => {
        set({ orden: null, isLoggedIn: false });
      },
    }),
    {
      name: "orden-storage",
    }
  )
);
