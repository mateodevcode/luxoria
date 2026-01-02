/**
 * @deprecated Este archivo está deprecado.
 * Usa el hook centralizado `useOrden` de `@/core/hooks/useOrdenStore` en su lugar.
 *
 * Este archivo se mantiene temporalmente solo para compatibilidad con código legacy.
 * Todas las funciones de órdenes ahora están en:
 * - API Layer: @/core/api/ordenAPI.js
 * - Store: @/core/store/ordenStore.js
 * - Hook: @/core/hooks/useOrdenStore.js
 */

import { botonWhatsapp } from "@/data/boton-wp";

/**
 * Helper para enviar mensaje por WhatsApp
 * Esta función se mantiene aquí solo para compatibilidad
 * @deprecated Usa `useOrden().crearOrdenYEnviarWhatsapp()` en su lugar
 */
export const enviarAWhatsapp = (link, numeroVendedor, orderId) => {
  const mensaje = encodeURIComponent(
    `🔔 *NUEVA SOLICITUD DE PAGO*\n\n` +
      `He completado mi pedido. Por favor, revisa los detalles:\n\n` +
      `${link}\n\n` +
      `🆔 Referencia: ${orderId}`
  );

  const urlWhatsapp = `https://wa.me/${botonWhatsapp.prefix}${numeroVendedor}?text=${mensaje}`;
  window.open(urlWhatsapp, "_blank");
};

// ==================== FUNCIONES DEPRECADAS ====================
// Las siguientes funciones están deprecadas.
// Usa el hook `useOrden` de @/core/hooks/useOrdenStore en su lugar.

/**
 * @deprecated Usa `useOrden().crearOrdenYEnviarWhatsapp()` en su lugar
 */
export const crearOrdenYEnviarWhatsapp = async () => {
  console.warn(
    "⚠️ crearOrdenYEnviarWhatsapp está deprecado. Usa useOrden().crearOrdenYEnviarWhatsapp() en su lugar."
  );
  throw new Error(
    "Esta función está deprecada. Usa useOrden().crearOrdenYEnviarWhatsapp() del core."
  );
};

/**
 * @deprecated Usa `useOrden().cargarOrden()` en su lugar
 */
export const obtenerOrden = async () => {
  console.warn(
    "⚠️ obtenerOrden está deprecado. Usa useOrden().cargarOrden() en su lugar."
  );
  throw new Error(
    "Esta función está deprecada. Usa useOrden().cargarOrden() del core."
  );
};

/**
 * @deprecated Usa `useOrden().cargarMisOrdenes()` en su lugar
 */
export const obtenerMisOrdenes = async () => {
  console.warn(
    "⚠️ obtenerMisOrdenes está deprecado. Usa useOrden().cargarMisOrdenes() en su lugar."
  );
  throw new Error(
    "Esta función está deprecada. Usa useOrden().cargarMisOrdenes() del core."
  );
};

/**
 * @deprecated Usa `useOrden().actualizarEstadoOrden()` en su lugar
 */
export const actualizarEstadoOrden = async () => {
  console.warn(
    "⚠️ actualizarEstadoOrden está deprecado. Usa useOrden().actualizarEstadoOrden() en su lugar."
  );
  throw new Error(
    "Esta función está deprecada. Usa useOrden().actualizarEstadoOrden() del core."
  );
};

/**
 * @deprecated Usa `useOrden().cancelarOrden()` en su lugar
 */
export const cancelarOrden = async () => {
  console.warn(
    "⚠️ cancelarOrden está deprecado. Usa useOrden().cancelarOrden() en su lugar."
  );
  throw new Error(
    "Esta función está deprecada. Usa useOrden().cancelarOrden() del core."
  );
};
