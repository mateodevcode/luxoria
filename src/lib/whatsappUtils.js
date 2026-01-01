// lib/whatsappUtils.js

import { botonWhatsapp } from "@/data/boton-wp";

export const generarIdPedido = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();

  return `LUX-${año}-${mes}-${dia}-${random}`;
};

export const generarMensajeWhatsapp = (
  productos,
  cliente = {},
  idPedido = null
) => {
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const horaActual = new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const pedidoId = idPedido || generarIdPedido();

  let mensaje = `🔔 *NUEVA SOLICITUD DE PAGO* 🔔\n`;
  mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  mensaje += `📅 ${fechaActual} • ⏰ ${horaActual}\n`;
  mensaje += `🆔 *Referencia:* ${pedidoId}\n`;
  mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  mensaje += `👥 *INFORMACIÓN DEL COMPRADOR*\n`;
  mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  if (cliente.nombre) {
    mensaje += `👤 Nombre: ${cliente.nombre}\n`;
  }
  if (cliente.email) {
    mensaje += `📧 Email: ${cliente.email}\n`;
  }
  if (cliente.telefono) {
    mensaje += `📱 Teléfono: ${cliente.telefono}\n`;
  }
  if (cliente.direccion) {
    mensaje += `🏠 Dirección: ${cliente.direccion}\n`;
  }

  mensaje += `\n`;

  mensaje += `📦 *PRODUCTOS A PAGAR*\n`;
  mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  let subtotal = 0;

  productos.forEach((producto, index) => {
    const total = producto.precio * producto.cantidad;
    subtotal += total;

    mensaje += `${index + 1}. *${producto.nombre}*\n`;
    mensaje += `   Cantidad: ${producto.cantidad} × $${producto.precio.toFixed(
      2
    )} = *$${total.toFixed(2)}*\n`;

    if (producto.talla) {
      mensaje += `   📏 Talla: ${producto.talla}\n`;
    }
    if (producto.color) {
      mensaje += `   🎨 Color: ${producto.color}\n`;
    }
    if (producto.detalles) {
      mensaje += `   ℹ️ ${producto.detalles}\n`;
    }

    if (producto.url) {
      mensaje += `   🔗 Ver producto: ${producto.url}\n`;
    }

    mensaje += `\n`;
  });

  mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  mensaje += `💰 *RESUMEN DE PAGO*\n`;
  mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  const descuento = productos.reduce(
    (sum, p) => sum + (p.descuento ? p.descuento * p.cantidad : 0),
    0
  );
  const envio = 0;

  mensaje += `Subtotal: $${subtotal.toFixed(2)}\n`;

  if (descuento > 0) {
    mensaje += `Descuento: -$${descuento.toFixed(2)}\n`;
  }

  if (envio > 0) {
    mensaje += `Envío: $${envio.toFixed(2)}\n`;
  }

  const totalAPagar = subtotal - descuento + envio;
  mensaje += `\n`;
  mensaje += `🔴 *TOTAL A PAGAR: $${totalAPagar.toFixed(2)}* 🔴\n`;
  mensaje += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  mensaje += `\n✅ El cliente está listo para completar el pago.\n`;
  mensaje += `\nPor favor, confirma los detalles y coordina la forma de pago con el cliente.\n`;
  mensaje += `\n🆔 *Referencia del pedido: ${pedidoId}*`;

  return { mensaje, pedidoId };
};

export const abrirWhatsappPedido = (
  productos,
  cliente,
  numeroVendedor,
  idPedido = null
) => {
  const { mensaje, pedidoId } = generarMensajeWhatsapp(
    productos,
    cliente,
    idPedido
  );
  const mensajeEncoded = encodeURIComponent(mensaje);

  const urlWhatsapp = `https://wa.me/${botonWhatsapp.prefix}${numeroVendedor}?text=${mensajeEncoded}`;

  window.open(urlWhatsapp, "_blank");

  return pedidoId;
};

export const copiarMensajeAlPortapapeles = (
  productos,
  cliente,
  idPedido = null
) => {
  const { mensaje } = generarMensajeWhatsapp(productos, cliente, idPedido);
  navigator.clipboard.writeText(mensaje).then(() => {
    console.log("Mensaje copiado al portapapeles");
  });
};
