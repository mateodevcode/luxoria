import { apiServerBackend } from "@/app/actions/apiServerBackend";
import { botonWhatsapp } from "@/data/boton-wp";

export const crearOrdenYEnviarWhatsapp = async (
  cliente,
  productos,
  resumen,
  numeroVendedor,
  metodoPago = "whatsapp"
) => {
  try {
    // 1. Crear la orden en la BD
    const res = await apiServerBackend("/api/ordenes", "POST", {
      cliente,
      productos,
      resumen,
      metodoPago,
    });

    if (!res.success) {
      throw new Error(res.error || "Error al crear la orden");
    }

    const { orden, orderId, link } = res.data;

    // 2. Enviar a WhatsApp
    enviarAWhatsapp(link, numeroVendedor, orderId);

    return {
      success: true,
      orderId,
      link,
      mensaje: `✅ Orden creada correctamente\n\n🆔 ID: ${orderId}`,
    };
  } catch (error) {
    console.error("Error creando orden:", error);
    return {
      success: false,
      error: error.message || "Error al crear la orden",
    };
  }
};

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

export const obtenerOrden = async (idOrden) => {
  try {
    const res = await apiServerBackend(`/api/ordenes/${idOrden}`);

    if (res.success) {
      return res.data;
    } else {
      throw new Error(res.error);
    }
  } catch (error) {
    console.error("Error obteniendo orden:", error);
    return null;
  }
};

export const obtenerMisOrdenes = async (email) => {
  try {
    const res = await apiServerBackend(`/api/ordenes?email=${email}`);

    if (res.success) {
      return res.data;
    } else {
      throw new Error(res.error);
    }
  } catch (error) {
    console.error("Error obteniendo órdenes:", error);
    return [];
  }
};

export const actualizarEstadoOrden = async (
  idOrden,
  nuevoEstado,
  notas = ""
) => {
  try {
    const res = await apiServerBackend(`/api/ordenes/${idOrden}`, "PUT", {
      estado: nuevoEstado,
      notasVendedor: notas,
    });

    if (res.success) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      throw new Error(res.error);
    }
  } catch (error) {
    console.error("Error actualizando orden:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const cancelarOrden = async (idOrden) => {
  try {
    const res = await apiServerBackend(`/api/ordenes/${idOrden}`, "DELETE");

    if (res.success) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      throw new Error(res.error);
    }
  } catch (error) {
    console.error("Error cancelando orden:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
