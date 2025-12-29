import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      // Actualizar usuario desde sesión de NextAuth
      setUser: (userData) => {
        set({
          user: userData,
          isLoggedIn: !!userData,
        });
      },

      // Limpiar usuario al cerrar sesión
      clearUser: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
