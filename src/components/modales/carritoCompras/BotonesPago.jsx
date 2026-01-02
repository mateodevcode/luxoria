"use client";

import { useCart } from "@/core/hooks/useCart";
import { useAuthStore } from "@/core/store/authStore";
import { useOrden } from "@/core/hooks/useOrdenStore";
import { botonWhatsapp } from "@/data/boton-wp";
import { formatoDinero } from "@/libs/formatoDinero";
import { Dot, Loader } from "lucide-react";
import React, { useContext } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { AppContext } from "@/context/AppContext";

const BotonesPago = () => {
  const {
    setOpenModalConfirmacionOrden,
    setIdOrdenGenerada,
    setOpenModalCarritoCompras,
  } = useContext(AppContext);

  const NUMERO_VENDEDOR = botonWhatsapp.numeros[0];
  const { items, total, clearCart } = useCart();
  const { user } = useAuthStore();
  const { crearOrdenYEnviarWhatsapp, isLoading } = useOrden();

  const tranformarArrayItems = (productos) => {
    const transformedCart = productos.map((item) => {
      const { productId, quantity, size } = item;
      const { nombre, precio, imageUrl } = productId;

      return {
        nombre,
        precio,
        cantidad: quantity,
        talla: size,
        url: imageUrl?.trim() || "",
        descuento: 0,
      };
    });
    return transformedCart;
  };

  const calcularResumen = (itemsTransformados) => {
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
    const itemsTransformados = tranformarArrayItems(items);

    if (!itemsTransformados || itemsTransformados.length === 0) {
      alert("❌ No hay productos en el carrito");
      return;
    }

    const clienteInfo = {
      nombre: user?.name || "",
      email: user?.email || "",
      telefono: user?.telefono || "+573002888529",
      direccion: user?.direccion || "",
    };

    if (!clienteInfo.nombre || !clienteInfo.email || !clienteInfo.telefono) {
      alert("❌ Por favor completa: Nombre, Email y Teléfono");
      return;
    }

    try {
      const resumen = calcularResumen(itemsTransformados);

      const resultado = await crearOrdenYEnviarWhatsapp(
        clienteInfo,
        itemsTransformados,
        resumen,
        NUMERO_VENDEDOR
      );

      if (resultado.success) {
        setIdOrdenGenerada(resultado.orderId);
        setOpenModalCarritoCompras(false);
        setOpenModalConfirmacionOrden(true);
        clearCart();
      } else {
        alert("❌ Error: " + resultado.error);
      }
    } catch (error) {
      alert("❌ Error al procesar el pedido: " + error.message);
    }
  };

  return (
    <div>
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-primero flex items-center justify-center flex-col gap-2 p-2">
          <button
            className="shiny-button bg-segundo text-primero p-3 w-full flex items-center justify-center relative overflow-hidden rounded-xs"
            onClick={() => {
              alert("Estamos trabajando en ello, pronto estará disponible");
            }}
          >
            <span>Pagar con tarjeta</span> <Dot className="text-primero" />{" "}
            <span className="font-semibold">{formatoDinero(total)}</span>
          </button>
          <button
            className="shiny-button bg-green-600 text-primero p-3 w-full flex items-center justify-center relative overflow-hidden rounded-xs gap-2"
            disabled={isLoading || items.length === 0}
            onClick={handlePagarWhatsapp}
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <>
                <span>Pagar por</span> <BsWhatsapp className="text-primero" />{" "}
                <span className="font-semibold">{formatoDinero(total)}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default BotonesPago;
