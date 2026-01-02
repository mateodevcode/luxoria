// src/core/store/ordenStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrdenStore = create(
  persist(
    (set, get) => ({
      // Estado
      ordenes: [], // Lista de todas las órdenes del usuario
      ordenActual: null, // Orden seleccionada actualmente
      isLoading: false, // Estado de carga global
      error: null, // Error global
      userId: null, // ID del usuario actual

      // ==================== SETTERS PUROS ====================

      /**
       * Establecer el userId
       */
      setUserId: (userId) => set({ userId }),

      /**
       * Establecer lista completa de órdenes
       */
      setOrdenes: (ordenes) => set({ ordenes, error: null }),

      /**
       * Establecer orden actual
       */
      setOrdenActual: (orden) => set({ ordenActual: orden, error: null }),

      /**
       * Agregar nueva orden a la lista
       */
      addOrden: (orden) => {
        const currentOrdenes = get().ordenes;
        set({ ordenes: [orden, ...currentOrdenes], error: null });
      },

      /**
       * Actualizar una orden existente en la lista
       */
      updateOrden: (idOrden, updatedData) => {
        const currentOrdenes = get().ordenes;
        const newOrdenes = currentOrdenes.map((orden) =>
          orden.idOrden === idOrden ? { ...orden, ...updatedData } : orden
        );
        set({ ordenes: newOrdenes, error: null });

        // Si es la orden actual, actualizarla también
        const currentOrden = get().ordenActual;
        if (currentOrden?.idOrden === idOrden) {
          set({ ordenActual: { ...currentOrden, ...updatedData } });
        }
      },

      /**
       * Eliminar orden de la lista
       */
      removeOrden: (idOrden) => {
        const currentOrdenes = get().ordenes;
        const newOrdenes = currentOrdenes.filter(
          (orden) => orden.idOrden !== idOrden
        );
        set({ ordenes: newOrdenes, error: null });

        // Si es la orden actual, limpiarla
        const currentOrden = get().ordenActual;
        if (currentOrden?.idOrden === idOrden) {
          set({ ordenActual: null });
        }
      },

      /**
       * Establecer estado de carga
       */
      setLoading: (isLoading) => set({ isLoading }),

      /**
       * Establecer error
       */
      setError: (error) => set({ error, isLoading: false }),

      /**
       * Limpiar error
       */
      clearError: () => set({ error: null }),

      /**
       * Limpiar todas las órdenes (logout)
       */
      clearOrdenes: () =>
        set({
          ordenes: [],
          ordenActual: null,
          error: null,
          isLoading: false,
          userId: null,
        }),

      // ==================== GETTERS ====================

      /**
       * Obtener orden por ID de la lista local
       */
      getOrdenById: (idOrden) => {
        return get().ordenes.find((orden) => orden.idOrden === idOrden);
      },

      /**
       * Obtener cantidad total de órdenes
       */
      getOrdenesCount: () => {
        return get().ordenes.length;
      },
    }),
    {
      name: "orden-storage",
      partialize: (state) => ({
        ordenes: state.ordenes,
        ordenActual: state.ordenActual,
        userId: state.userId,
      }),
    }
  )
);
