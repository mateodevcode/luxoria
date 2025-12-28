// src/core/store/cartStore.js (ACTUALIZADO)

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isLoading: false,
      error: null,
      userId: null,

      initCart: async (userId) => {
        set({ userId, isLoading: true, error: null });
        try {
          const response = await fetch(`/api/carts/${userId}`);
          if (!response.ok) throw new Error("Error fetching cart");

          const data = await response.json();

          if (data.success) {
            set({
              items: data.data.items || [],
              total: data.data.total || 0,
              isLoading: false,
            });
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      addItem: async (product) => {
        const userId = get().userId;

        if (!userId) {
          set({ error: "Usuario no autenticado" });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`/api/carts/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: product._id,
              quantity: 1,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error agregando producto");
          }

          const data = await response.json();

          if (data.success) {
            set({
              items: data.data.items || [],
              total: data.data.total || 0,
              isLoading: false,
            });
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          console.error("Error adding item:", error);
        }
      },

      removeItem: async (productId) => {
        const userId = get().userId;
        const currentItems = get().items;

        const newItems = currentItems.filter((i) => i.productId !== productId);
        const newTotal = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        // Actualizar optimísticamente
        set({ items: newItems, total: newTotal, isLoading: true, error: null });

        try {
          const response = await fetch(`/api/carts/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: newItems, total: newTotal }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error eliminando producto");
          }

          set({ isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
          // Revertir cambios en caso de error
          get().initCart(userId);
        }
      },

      updateQuantity: async (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }

        const userId = get().userId;
        const currentItems = get().items;

        const newItems = currentItems.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        );

        const newTotal = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        // Actualizar optimísticamente
        set({ items: newItems, total: newTotal, isLoading: true, error: null });

        try {
          const response = await fetch(`/api/carts/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: newItems, total: newTotal }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error actualizando cantidad");
          }

          set({ isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
          // Revertir cambios en caso de error
          get().initCart(userId);
        }
      },

      clearCart: async () => {
        const userId = get().userId;

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`/api/carts/${userId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error vaciando carrito");
          }

          set({ items: [], total: 0, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        total: state.total,
      }),
    }
  )
);
