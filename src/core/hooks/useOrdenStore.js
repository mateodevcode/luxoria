// src/core/hooks/useOrdenStore.js
"use client";

import { useOrdenStore } from "../store/ordenStore";
import { ordenAPI } from "../api/ordenAPI";
import { botonWhatsapp } from "@/data/boton-wp";
import { toast } from "sonner";

/**
 * Helper para enviar mensaje por WhatsApp
 */
const enviarAWhatsapp = (link, numeroVendedor, orderId) => {
  const mensaje = encodeURIComponent(
    `🔔 *NUEVA SOLICITUD DE PAGO*\n\n` +
      `He completado mi pedido. Por favor, revisa los detalles:\n\n` +
      `${link}\n\n` +
      `🆔 Referencia: ${orderId}`
  );

  const urlWhatsapp = `https://wa.me/${botonWhatsapp.prefix}${numeroVendedor}?text=${mensaje}`;
  window.open(urlWhatsapp, "_blank");
};

/**
 * Hook orquestador para manejar órdenes
 * Contiene toda la lógica de negocio y orquesta las llamadas a la API
 */
export const useOrden = () => {
  const store = useOrdenStore();

  return {
    // ==================== ESTADO ====================
    ordenes: store.ordenes,
    ordenActual: store.ordenActual,
    isLoading: store.isLoading,
    error: store.error,
    userId: store.userId,

    // Getters
    getOrdenById: store.getOrdenById,
    getOrdenesCount: store.getOrdenesCount,

    // ==================== ACCIONES CON LÓGICA DE NEGOCIO ====================

    /**
     * Crear orden y enviar por WhatsApp
     * @param {Object} cliente - { nombre, email, telefono, direccion }
     * @param {Array} productos - Array de productos
     * @param {Object} resumen - { subtotal, descuento, envio, total }
     * @param {string} numeroVendedor - Número de WhatsApp del vendedor
     * @param {string} metodoPago - Método de pago (default: "whatsapp")
     * @returns {Promise<Object>} - { success, orderId, link, mensaje, error }
     */
    crearOrdenYEnviarWhatsapp: async (
      cliente,
      productos,
      resumen,
      numeroVendedor,
      metodoPago = "whatsapp"
    ) => {
      // Validaciones
      if (!productos || productos.length === 0) {
        store.setError("No hay productos en el carrito");
        return {
          success: false,
          error: "No hay productos en el carrito",
        };
      }

      if (!cliente.nombre || !cliente.email) {
        store.setError("Faltan datos del cliente");
        return {
          success: false,
          error: "Por favor completa: Nombre, Email y Teléfono",
        };
      }

      store.setLoading(true);
      store.clearError();

      try {
        // Llamada a la API
        const res = await ordenAPI.crearOrden({
          cliente,
          productos,
          resumen,
          metodoPago,
        });

        if (!res.success) {
          throw new Error(res.error || "Error al crear la orden");
        }

        const { orden, orderId, link } = res.data;

        // Actualizar store
        store.addOrden(orden);

        // Enviar a WhatsApp
        enviarAWhatsapp(link, numeroVendedor, orderId);

        store.setLoading(false);

        return {
          success: true,
          orderId,
          link,
          mensaje: `✅ Orden creada correctamente\n\n🆔 ID: ${orderId}`,
        };
      } catch (error) {
        console.error("Error creando orden:", error);
        store.setError(error.message);
        store.setLoading(false);

        return {
          success: false,
          error: error.message || "Error al crear la orden",
        };
      }
    },

    /**
     * Cargar todas las órdenes del usuario por email
     * @param {string} email - Email del usuario
     * @returns {Promise<boolean>} - true si fue exitoso
     */
    cargarMisOrdenes: async (email) => {
      if (!email) {
        store.setError("Email requerido");
        return false;
      }

      store.setLoading(true);
      store.clearError();

      try {
        const res = await ordenAPI.obtenerOrdenesPorEmail(email);

        if (res.success) {
          store.setOrdenes(res.data || []);
          store.setLoading(false);
          return true;
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        console.error("Error obteniendo órdenes:", error);
        store.setError(error.message);
        store.setOrdenes([]);
        store.setLoading(false);
        return false;
      }
    },

    /**
     * Cargar una orden específica por ID
     * @param {string} idOrden - ID de la orden
     * @returns {Promise<Object|null>} - Orden o null si falla
     */
    cargarOrden: async (idOrden) => {
      if (!idOrden) {
        store.setError("ID de orden requerido");
        return null;
      }

      store.setLoading(true);
      store.clearError();

      try {
        const res = await ordenAPI.obtenerOrden(idOrden);

        if (res.success) {
          store.setOrdenActual(res.data);
          store.setLoading(false);
          return res.data;
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        console.error("Error obteniendo orden:", error);
        store.setError(error.message);
        store.setOrdenActual(null);
        store.setLoading(false);
        return null;
      }
    },

    /**
     * Actualizar estado de una orden
     * @param {string} idOrden - ID de la orden
     * @param {string} nuevoEstado - Nuevo estado
     * @param {string} notas - Notas del vendedor (opcional)
     * @returns {Promise<Object>} - { success, data, error }
     */
    actualizarEstadoOrden: async (idOrden, nuevoEstado, notas = "") => {
      if (!idOrden || !nuevoEstado) {
        store.setError("ID de orden y estado requeridos");
        return {
          success: false,
          error: "ID de orden y estado requeridos",
        };
      }

      store.setLoading(true);
      store.clearError();

      try {
        const res = await ordenAPI.actualizarOrden(idOrden, {
          estado: nuevoEstado,
          notasVendedor: notas,
        });

        if (res.success) {
          // Actualizar en el store
          store.updateOrden(idOrden, res.data);
          store.setLoading(false);

          return {
            success: true,
            data: res.data,
          };
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        console.error("Error actualizando orden:", error);
        store.setError(error.message);
        store.setLoading(false);

        return {
          success: false,
          error: error.message,
        };
      }
    },

    /**
     * Cancelar una orden
     * @param {string} idOrden - ID de la orden
     * @returns {Promise<Object>} - { success, data, error }
     */
    cancelarOrden: async (idOrden) => {
      if (!idOrden) {
        store.setError("ID de orden requerido");
        return {
          success: false,
          error: "ID de orden requerido",
        };
      }

      store.setLoading(true);
      store.clearError();

      try {
        const res = await ordenAPI.cancelarOrden(idOrden);

        if (res.success) {
          // Eliminar del store
          store.removeOrden(idOrden);
          store.setLoading(false);

          return {
            success: true,
            data: res.data,
          };
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        console.error("Error cancelando orden:", error);
        store.setError(error.message);
        store.setLoading(false);

        return {
          success: false,
          error: error.message,
        };
      }
    },

    /**
     * Limpiar error manualmente
     */
    clearError: store.clearError,

    /**
     * Limpiar todas las órdenes (útil para logout)
     */
    clearOrdenes: store.clearOrdenes,

    /**
     * Establecer userId
     */
    setUserId: store.setUserId,
  };
};

// handle actualizarEstadoOrden
export const handleActualizarEstado = async (
  actualizarEstadoOrden,
  id,
  nuevoEstado,
  notasVendedor
) => {
  const res = await actualizarEstadoOrden(id, nuevoEstado, notasVendedor);

  if (res.success) {
    toast.success("Orden actualizada correctamente", {
      position: "top-center",
    });
  } else {
    toast.error("Error al actualizar la orden: " + res.error, {
      position: "bottom-right",
    });
  }
};
