import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      // Simular login
      login: (userId) => {
        set({
          user: { _id: userId, email: `user${userId}@example.com` },
          isLoggedIn: true,
        });
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
