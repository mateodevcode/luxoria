// src/core/store/cartStore.js
"use client";
import { apiServer } from "@/app/actions/apiServer";
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

      // Cargar carrito del usuario
      initCart: async (userId) => {
        set({ userId, isLoading: true, error: null });
        try {
          const response = await apiServer(`/api/carts/${userId}`, "GET");

          if (!response.success) {
            throw new Error(response.message || "Error fetching cart");
          }

          set({
            items: response.data?.items || [],
            total: response.data?.total || 0,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      // Agregar producto al carrito
      addItem: async (product) => {
        const userId = get().userId;
        const currentItems = get().items;

        // Buscar si el producto ya existe
        const exists = currentItems.find(
          (i) => i.productId._id === product._id || i.productId === product._id
        );
        let newItems;

        if (exists) {
          // Si existe, aumentar cantidad
          newItems = currentItems.map((i) =>
            i.productId._id === product._id || i.productId === product._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          // Si no existe, agregarlo con estructura normalizada
          newItems = [
            ...currentItems,
            {
              productId: {
                _id: product._id,
                nombre: product.nombre,
                precio: product.precio,
                imageUrl: product.imageUrl,
              },
              quantity: 1,
            },
          ];
        }

        // Calcular total (compatible con ambas estructuras)
        const newTotal = newItems.reduce((sum, item) => {
          const precio = item.productId?.precio || item.precio || 0;
          return sum + precio * item.quantity;
        }, 0);

        // Actualizar estado local (instantáneo)
        set({ items: newItems, total: newTotal });
        console.log("se actualizo en local", {
          items: newItems,
          total: newTotal,
        });

        // Sincronizar con backend
        try {
          await apiServer(`/api/carts`, "POST", {
            userId,
            items: newItems,
            total: newTotal,
          });
          console.log("se actualizo en backend");
        } catch (error) {
          set({ error: error.message });
        }
      },

      // Eliminar producto del carrito
      removeItem: async (productId) => {
        const userId = get().userId;
        const currentItems = get().items;

        // Filtrar el producto (compatible con ambas estructuras)
        const newItems = currentItems.filter(
          (i) => i.productId._id !== productId && i.productId !== productId
        );

        // Recalcular total
        const newTotal = newItems.reduce((sum, item) => {
          const precio = item.productId?.precio || item.precio || 0;
          return sum + precio * item.quantity;
        }, 0);

        // Actualizar estado
        set({ items: newItems, total: newTotal });

        // Sincronizar con backend
        try {
          await apiServer(`/api/carts/${userId}`, "PUT", {
            items: newItems,
            total: newTotal,
          });
        } catch (error) {
          set({ error: error.message });
        }
      },

      // Actualizar cantidad de un producto
      updateQuantity: async (productId, quantity) => {
        // Si cantidad es 0 o menos, eliminar el producto
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }

        const userId = get().userId;
        const currentItems = get().items;

        // Mapear items con la nueva cantidad (compatible con ambas estructuras)
        const newItems = currentItems.map((i) =>
          i.productId._id === productId || i.productId === productId
            ? { ...i, quantity }
            : i
        );

        // Recalcular total
        const newTotal = newItems.reduce((sum, item) => {
          const precio = item.productId?.precio || item.precio || 0;
          return sum + precio * item.quantity;
        }, 0);

        // Actualizar estado
        set({ items: newItems, total: newTotal });

        // Sincronizar con backend
        try {
          await apiServer(`/api/carts/${userId}`, "PUT", {
            items: newItems,
            total: newTotal,
          });
        } catch (error) {
          set({ error: error.message });
        }
      },

      // Vaciar carrito
      clearCart: async () => {
        const userId = get().userId;

        // Limpiar estado
        set({ items: [], total: 0 });

        // Sincronizar con backend
        try {
          await apiServer(`/api/carts/${userId}`, "DELETE");
        } catch (error) {
          set({ error: error.message });
        }
      },

      // Getter para obtener cantidad de items
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      // Getter para obtener un item específico
      getItem: (productId) => {
        return get().items.find((i) => i.productId === productId);
      },

      // Setter del error
      setError: (error) => set({ error }),

      // Setter de carga
      setIsLoading: (isLoading) => set({ isLoading }),
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
