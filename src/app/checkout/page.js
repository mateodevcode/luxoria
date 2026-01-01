"use client";

import { useState } from "react";
import { crearOrdenYEnviarWhatsapp } from "@/lib/ordenUtils";
import { MessageCircle, CreditCard, Loader } from "lucide-react";
import { botonWhatsapp } from "@/data/boton-wp";
import { useCart } from "@/core/hooks/useCart";
import { useAuthStore } from "@/core/store/authStore";

export default function CheckoutOrdenes({ onPagarTarjeta }) {
  const NUMERO_VENDEDOR = botonWhatsapp.numeros[0];
  const { items } = useCart();
  const { user } = useAuthStore();
  const tranformarArrayItems = (productos) => {
    const transformedCart = productos.map((item) => {
      const { productId, quantity, size } = item;
      const { nombre, precio, imageUrl } = productId;

      return {
        nombre,
        precio,
        cantidad: quantity,
        talla: size,
        // color: "", // ← ajusta si tienes el dato en otro lado
        // detalles: "", // ← mismo caso
        url: imageUrl?.trim() || "", // quitamos espacios al final si los hay
        descuento: 0,
      };
    });
    return transformedCart;
  };
  const itemsTransformados = tranformarArrayItems(items);
  const clienteInfo = {
    nombre: user?.name,
    email: user?.email,
    telefono: user?.telefono || "+573002888529",
  };

  const [loading, setLoading] = useState(false);
  const [idOrdenGenerada, setIdOrdenGenerada] = useState(null);

  const calcularResumen = () => {
    const subtotal = itemsTransformados.reduce(
      (sum, p) => sum + p.precio * p.cantidad,
      0
    );
    const descuento = itemsTransformados.reduce(
      (sum, p) => sum + (p.descuento ? p.descuento * p.cantidad : 0),
      0
    );
    const envio = 0;
    const total = subtotal - descuento + envio;

    return { subtotal, descuento, envio, total };
  };

  const handlePagarWhatsapp = async () => {
    if (!itemsTransformados || itemsTransformados.length === 0) {
      alert("❌ No hay productos en el carrito");
      return;
    }

    if (!clienteInfo.nombre || !clienteInfo.email || !clienteInfo.telefono) {
      alert("❌ Por favor completa: Nombre, Email y Teléfono");
      return;
    }

    setLoading(true);

    try {
      const resumen = calcularResumen();

      const resultado = await crearOrdenYEnviarWhatsapp(
        clienteInfo,
        itemsTransformados,
        resumen,
        NUMERO_VENDEDOR
      );

      if (resultado.success) {
        setIdOrdenGenerada(resultado.orderId);
        alert(
          `✅ ${resultado.mensaje}\n\nSe abrirá WhatsApp con el link de tu orden`
        );
        // Limpiar carrito si es necesario
        // resetCarrito();
      } else {
        alert("❌ Error: " + resultado.error);
      }
    } catch (error) {
      alert("❌ Error al procesar el pedido: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resumen = calcularResumen();

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* RESUMEN DE CARRITO */}
      <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-segundo mb-6">
          Resumen de tu Compra
        </h2>

        {itemsTransformados.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {itemsTransformados.map((prod, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b border-segundo/10 pb-4"
                >
                  <div>
                    <p className="font-semibold text-segundo">{prod.nombre}</p>
                    <p className="text-sm text-segundo/70">
                      Cantidad: {prod.cantidad}
                    </p>
                    {prod.talla && (
                      <p className="text-sm text-segundo/70">
                        Talla: {prod.talla}
                      </p>
                    )}
                  </div>
                  <p className="font-bold text-segundo">
                    ${(prod.precio * prod.cantidad).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-segundo/20 pt-6">
              <div className="flex justify-between text-segundo">
                <span>Subtotal:</span>
                <span>${resumen.subtotal.toFixed(2)}</span>
              </div>

              {resumen.descuento > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento:</span>
                  <span>-${resumen.descuento.toFixed(2)}</span>
                </div>
              )}

              {resumen.envio > 0 && (
                <div className="flex justify-between text-segundo">
                  <span>Envío:</span>
                  <span>${resumen.envio.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-2xl font-bold text-segundo bg-cuarto/10 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                <span>Total:</span>
                <span className="text-cuarto">${resumen.total.toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-segundo/70 py-8">
            Tu carrito está vacío
          </p>
        )}
      </div>

      {/* BOTONES DE PAGO */}
      <div className="space-y-4">
        <button
          onClick={handlePagarWhatsapp}
          disabled={loading || itemsTransformados.length === 0}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-6 h-6" />
              <div className="text-left">
                <p className="text-sm">Comprar por</p>
                <p className="text-lg">WhatsApp</p>
              </div>
            </>
          )}
        </button>

        <button
          onClick={onPagarTarjeta}
          disabled={itemsTransformados.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-3"
        >
          <CreditCard className="w-6 h-6" />
          <div className="text-left">
            <p className="text-sm">Comprar con</p>
            <p className="text-lg">Tarjeta</p>
          </div>
        </button>
      </div>

      {/* MOSTRAR ID GENERADO */}
      {idOrdenGenerada && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-segundo">Tu ID de orden:</p>
          <p className="text-2xl font-bold text-blue-600 font-mono">
            {idOrdenGenerada}
          </p>
          <p className="text-xs text-segundo/70 mt-2">
            Guarda este ID para hacer seguimiento de tu pedido en{" "}
            <a
              href={`/ordenes/${idOrdenGenerada}`}
              className="text-cuarto hover:underline"
            >
              tu orden
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
