"use client";

import { useCart } from "@/core/hooks/useCart";
import { useAuthStore } from "@/core/store/authStore";
import { botonWhatsapp } from "@/data/boton-wp";
import { formatoDinero } from "@/libs/formatoDinero";
import { Dot, Loader } from "lucide-react";
import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { crearOrdenYEnviarWhatsapp } from "@/lib/ordenUtils";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const BotonesPago = () => {
  const {
    setOpenModalConfirmacionOrden,
    idOrdenGenerada,
    setIdOrdenGenerada,
    setOpenModalCarritoCompras,
  } = useContext(AppContext);
  const NUMERO_VENDEDOR = botonWhatsapp.numeros[0];
  const { items, total, clearCart } = useCart();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
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
  // const handlePagarWhatsapp = (productos, cliente, NUMERO_VENDEDOR) => {
  //   // Validar que haya productos
  //   if (!productos || productos.length === 0) {
  //     alert("❌ No hay productos en el carrito");
  //     return;
  //   }

  //   // Validar datos obligatorios del cliente
  //   if (!cliente.nombre || !cliente.email) {
  //     alert("❌ Por favor completa: Nombre, Email y Teléfono");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // ESTO ES LO QUE LLAMA LA FUNCIÓN
  //     const pedidoId = abrirWhatsappPedido(productos, cliente, NUMERO_VENDEDOR);

  //     // Guardar el ID del pedido
  //     setIdPedido(pedidoId);

  //     // Mostrar confirmación al cliente
  //     alert(
  //       `✅ Pedido enviado al vendedor\n\n🆔 ID: ${pedidoId}\n\nGuarda este número para seguimiento`
  //     );

  //     // Aquí puedes guardar el pedido en tu BD si quieres
  //     // guardarPedidoEnBaseDatos(pedidoId, cliente, productos);
  //   } catch (error) {
  //     alert("❌ Error al enviar el pedido: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        setOpenModalCarritoCompras(false);
        setOpenModalConfirmacionOrden(true);
        // alert(
        //   `✅ ${resultado.mensaje}\n\nSe abrirá WhatsApp con el link de tu orden`
        // );

        // Limpiar carrito si es necesario

        clearCart();
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
    <div>
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-primero flex items-center justify-center flex-col gap-2 p-2">
          <button
            className="shiny-button bg-segundo text-primero p-3 w-full flex items-center justify-center relative overflow-hidden rounded-xs"
            onClick={() => {
              alert("Pagar con tarjeta");
            }}
          >
            <span>Pagar con tarjeta</span> <Dot className="text-primero" />{" "}
            <span className="font-semibold">{formatoDinero(total)}</span>
          </button>
          <button
            className="shiny-button bg-green-600 text-primero p-3 w-full flex items-center justify-center relative overflow-hidden rounded-xs gap-2"
            disabled={loading || itemsTransformados.length === 0}
            onClick={() => {
              const itemsTransformados = tranformarArrayItems(items);
              handlePagarWhatsapp(
                itemsTransformados,
                {
                  nombre: user?.name || "",
                  email: user?.email || "",
                  telefono: user?.telefono || "",
                  direccion: user?.direccion || "",
                },
                NUMERO_VENDEDOR
              );
            }}
          >
            {loading ? (
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
