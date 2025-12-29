// src/core/hooks/useCart.js

"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "../store/cartStore";

/**
 * Custom hook para manejar el carrito de compras
 * Integra la autenticación con el cart store
 * Mantiene la lógica de negocio aislada en el core
 */
export function useCart() {
  const { data: session, status } = useSession();
  const cartStore = useCartStore();

  // Inicializar el carrito cuando el usuario está autenticado
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // Solo inicializar si aún no se ha hecho
      if (cartStore.userId !== session.user.id) {
        cartStore.initCart(session.user.id);
      }
    }
  }, [status, session, cartStore]);

  /**
   * Wrapper para addItem que maneja usuarios no autenticados
   */
  const addItem = async (product) => {
    if (status === "unauthenticated") {
      console.warn("Usuario no autenticado. Por favor inicia sesión.");
      return {
        success: false,
        error: "Debes iniciar sesión para agregar productos al carrito",
      };
    }

    if (status === "loading") {
      console.warn("Esperando autenticación...");
      return {
        success: false,
        error: "Cargando sesión...",
      };
    }

    // Llamar al método original del store
    await cartStore.addItem(product);

    return {
      success: !cartStore.error,
      error: cartStore.error,
    };
  };

  return {
    // Estado del carrito
    items: cartStore.items,
    total: cartStore.total,
    isLoading: cartStore.isLoading,
    error: cartStore.error,

    // Métodos del carrito
    addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,

    // Estado de autenticación
    isReady: status !== "loading",
    isAuthenticated: status === "authenticated",
    userId: cartStore.userId,
  };
}
