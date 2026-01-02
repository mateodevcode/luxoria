// src/core/api/ordenAPI.js
import { apiServerBackend } from "@/app/actions/apiServerBackend";

/**
 * Capa de comunicación HTTP para órdenes
 * Solo maneja llamadas al backend, sin lógica de negocio
 */
export const ordenAPI = {
  /**
   * Crear nueva orden
   * @param {Object} data - { cliente, productos, resumen, metodoPago }
   * @returns {Promise<Object>} - { success, data: { orden, orderId, link }, error }
   */
  crearOrden: async (data) => {
    try {
      const res = await apiServerBackend("/api/ordenes", "POST", data);
      return res;
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error al crear la orden",
      };
    }
  },

  /**
   * Obtener orden por ID
   * @param {string} idOrden - ID de la orden
   * @returns {Promise<Object>} - { success, data: orden, error }
   */
  obtenerOrden: async (idOrden) => {
    try {
      const res = await apiServerBackend(`/api/ordenes/${idOrden}`);
      return res;
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error al obtener la orden",
      };
    }
  },

  /**
   * Obtener todas las órdenes de un usuario por email
   * @param {string} email - Email del usuario
   * @returns {Promise<Object>} - { success, data: ordenes[], error }
   */
  obtenerOrdenesPorEmail: async (email) => {
    try {
      const res = await apiServerBackend(`/api/ordenes?email=${email}`);
      return res;
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error al obtener las órdenes",
      };
    }
  },

  /**
   * Actualizar estado de una orden
   * @param {string} idOrden - ID de la orden
   * @param {Object} data - { estado, notasVendedor }
   * @returns {Promise<Object>} - { success, data: orden, error }
   */
  actualizarOrden: async (idOrden, data) => {
    try {
      const res = await apiServerBackend(
        `/api/ordenes/${idOrden}`,
        "PUT",
        data
      );
      return res;
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error al actualizar la orden",
      };
    }
  },

  /**
   * Cancelar/eliminar una orden
   * @param {string} idOrden - ID de la orden
   * @returns {Promise<Object>} - { success, data, error }
   */
  cancelarOrden: async (idOrden) => {
    try {
      const res = await apiServerBackend(`/api/ordenes/${idOrden}`, "DELETE");
      return res;
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error al cancelar la orden",
      };
    }
  },
};
