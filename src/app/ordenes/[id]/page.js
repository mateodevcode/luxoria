"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Calendar,
  CircleCheck,
  CircleDollarSign,
  CreditCard,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Gift,
  Loader,
  Package,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { apiServerBackend } from "@/app/actions/apiServerBackend";
import Image from "next/image";

const estadoColores = {
  pendiente: "bg-red-100 text-red-800 border-red-300",
  confirmado: "bg-yellow-100 text-yellow-800 border-yellow-300",
  pagado: "bg-green-100 text-green-800 border-green-300",
  enviado: "bg-blue-100 text-blue-800 border-blue-300",
  entregado: "bg-emerald-100 text-emerald-800 border-emerald-300",
  cancelado: "bg-gray-100 text-gray-800 border-gray-300",
};

const estadoEmoji = {
  pendiente: <Loader className="w-4 h-4 animate-spin" />,
  confirmado: <CircleCheck className="w-4 h-4" />,
  pagado: <CreditCard className="w-4 h-4" />,
  enviado: <Box className="w-4 h-4" />,
  entregado: <Gift className="w-4 h-4" />,
  cancelado: <X className="w-4 h-4" />,
};

export default function DetalleOrden() {
  const params = useParams();
  const id = params.id;

  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [esVendedor, setEsVendedor] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [notasVendedor, setNotasVendedor] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    obtenerOrden();
  }, [id]);

  const obtenerOrden = async () => {
    try {
      const res = await apiServerBackend(`/api/ordenes/${id}`);

      if (res.success) {
        setOrden(res.data);
        setNuevoEstado(res.data.estado);
        setNotasVendedor(res.data.notasVendedor || "");
        // TODO: Verificar si el usuario es vendedor
        checkIfVendedor();
      } else {
        setError(res.error || "Orden no encontrada");
      }
    } catch (err) {
      setError("Error al cargar la orden");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkIfVendedor = () => {
    // TODO: Implementar verificación de vendedor con autenticación
    // Por ahora es falso, ajusta según tu sistema de auth
    setEsVendedor(true);
  };

  const handleActualizarEstado = async () => {
    if (!nuevoEstado) return;

    setGuardando(true);

    try {
      const res = await apiServerBackend(`/api/ordenes/${id}`, "PUT", {
        estado: nuevoEstado,
        notasVendedor,
      });

      if (res.success) {
        setOrden(res.data);
        alert("✅ Orden actualizada correctamente");
      } else {
        alert("❌ Error: " + res.error);
      }
    } catch (error) {
      alert("❌ Error al actualizar la orden");
      console.error(error);
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primero">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-cuarto" />
          <p className="text-segundo">Cargando orden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primero">
        <div className="bg-red-50 border border-red-200 p-8 rounded-lg">
          <p className="text-red-600 font-semibold">❌ {error}</p>
          <Link
            href="/"
            className="text-cuarto mt-4 inline-block hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!orden) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primero">
        <p className="text-segundo">Orden no encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primero p-4 md:p-8 font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* ENCABEZADO */}
        <div className="rounded-lg p-6 mb-6 shadow-sm bg-linear-to-br from-segundo/5 via-primero to-segundo/5 border-2 border-segundo/30">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-3xl font-bold text-segundo mb-2 flex items-center gap-2">
                <FileSpreadsheet className="w-6 h-6" />
                <h1>Mi orden</h1>
              </div>
              <p className="text-segundo/70">ID: {orden.idOrden}</p>
            </div>
            <div
              className={`px-4 py-2 rounded-full border-2 ${
                estadoColores[orden.estado]
              }`}
            >
              <div className="text-xs font-bold flex items-center gap-2">
                {estadoEmoji[orden.estado]}{" "}
                <span>{orden.estado.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-segundo/60 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(orden.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* INFORMACIÓN DEL CLIENTE */}
        <div className="rounded-lg p-6 mb-6 shadow-sm bg-linear-to-br from-segundo/5 via-primero to-segundo/5 border-2 border-segundo/30">
          <div className="text-xl font-bold text-segundo mb-4 flex items-center gap-2">
            <UserRound className="w-6 h-6" /> <h2>Información del Cliente</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-segundo/60">Nombre</p>
              <p className="font-semibold text-segundo">
                {orden.cliente.nombre}
              </p>
            </div>
            <div>
              <p className="text-sm text-segundo/60">Email</p>
              <p className="font-semibold text-segundo">
                {orden.cliente.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-segundo/60">Teléfono</p>
              <p className="font-semibold text-segundo">
                {orden.cliente.telefono}
              </p>
            </div>
            <div>
              <p className="text-sm text-segundo/60">Dirección</p>
              <p className="font-semibold text-segundo">
                {orden.cliente.direccion || "No especificada"}
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="rounded-lg p-6 mb-6 shadow-sm bg-linear-to-br from-segundo/5 via-primero to-segundo/5 border-2 border-segundo/30">
          <div className="text-xl font-bold text-segundo mb-4 flex items-center gap-2">
            <Package /> <h2>Productos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-segundo/20">
                  <th className="text-left py-3 px-2 text-segundo/70">
                    Producto
                  </th>
                  <th className="text-center py-3 px-2 text-segundo/70">
                    Cantidad
                  </th>
                  <th className="text-right py-3 px-2 text-segundo/70">
                    Precio
                  </th>
                  <th className="text-right py-3 px-2 text-segundo/70">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orden.productos.map((prod, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-segundo/10 hover:bg-primero/50"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-4">
                        <div>
                          <Image
                            src={prod.url}
                            alt={prod.nombre}
                            width={200}
                            height={200}
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-segundo">
                            {prod.nombre}
                          </p>
                          {prod.talla && (
                            <p className="text-xs text-segundo/60 mt-1">
                              Talla: {prod.talla}
                            </p>
                          )}
                          {prod.color && (
                            <p className="text-xs text-segundo/60">
                              Color: {prod.color}
                            </p>
                          )}
                          {prod.url && (
                            <a
                              href={prod.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-cuarto hover:underline flex items-center gap-1 mt-1"
                            >
                              Ver producto <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">{prod.cantidad}</td>
                    <td className="text-right py-4 px-2">${prod.precio}</td>
                    <td className="text-right py-4 px-2 font-bold">
                      ${prod.precio * prod.cantidad}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RESUMEN DE PAGO */}
        <div className="rounded-lg p-6 mb-6 shadow-sm bg-linear-to-br from-segundo/5 via-primero to-segundo/5 border-2 border-segundo/30">
          <div className="text-xl font-bold text-segundo mb-4 flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6" /> <h2>Resumen de Pago</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-segundo">
              <span>Subtotal:</span>
              <span>${orden.resumen.subtotal}</span>
            </div>
            {orden.resumen.descuento > 0 && (
              <div className="flex justify-between text-segundo">
                <span>Descuento:</span>
                <span className="text-green-600">
                  -${orden.resumen.descuento}
                </span>
              </div>
            )}
            {orden.resumen.envio > 0 && (
              <div className="flex justify-between text-segundo">
                <span>Envío:</span>
                <span>${orden.resumen.envio}</span>
              </div>
            )}
            <div className="border-t border-segundo/20 pt-3 flex justify-between text-lg font-bold text-segundo">
              <span>Total:</span>
              <span>${orden.resumen.total}</span>
            </div>
          </div>
        </div>

        {/* SECCIÓN DEL VENDEDOR */}
        {esVendedor && (
          <div className="bg-cuarto/10 border-2 border-cuarto rounded-lg p-6 mb-6">
            <div className="text-xl font-bold text-cuarto mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6 animate-spin animation-duration-3000" />{" "}
              <h2>Gestión de Vendedor</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-segundo mb-2">
                  Estado de la Orden
                </label>
                <select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  className="w-full p-3 border border-segundo/20 rounded bg-primero text-segundo"
                >
                  <option value="pendiente" className="flex items-center gap-2">
                    <Loader className="w-4 h-4" /> Pendiente
                  </option>
                  <option
                    value="confirmado"
                    className="flex items-center gap-2"
                  >
                    <CircleCheck className="w-4 h-4" /> Confirmado
                  </option>
                  <option value="pagado" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Pagado
                  </option>
                  <option value="enviado" className="flex items-center gap-2">
                    <Box className="w-4 h-4" /> Enviado
                  </option>
                  <option value="entregado" className="flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Entregado
                  </option>
                  <option value="cancelado" className="flex items-center gap-2">
                    <X className="w-4 h-4" /> Cancelado
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-segundo mb-2">
                  Notas
                </label>
                <textarea
                  value={notasVendedor}
                  onChange={(e) => setNotasVendedor(e.target.value)}
                  placeholder="Agregar notas sobre la orden..."
                  rows="4"
                  className="w-full p-3 border border-segundo/20 rounded bg-primero text-segundo"
                />
              </div>

              <button
                onClick={handleActualizarEstado}
                disabled={guardando}
                className="w-full bg-cuarto hover:bg-cuarto/80 disabled:opacity-50 text-primero font-bold py-3 rounded transition"
              >
                {guardando ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        )}

        {/* HISTORIAL DE CAMBIOS */}
        {orden.historialEstados && orden.historialEstados.length > 0 && (
          <div className="rounded-lg p-6 shadow-sm bg-linear-to-br from-segundo/5 via-primero to-segundo/5 border-2 border-segundo/30">
            <div className="text-xl font-bold text-segundo mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6" /> <h2>Historial</h2>
            </div>
            <div className="space-y-3">
              {orden.historialEstados.map((cambio, idx) => (
                <div key={idx} className="border-l-4 border-cuarto pl-4 py-2">
                  <p className="font-semibold text-segundo">
                    {cambio.estado.toUpperCase()}
                  </p>
                  <p className="text-sm text-segundo/60">
                    {new Date(cambio.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {cambio.nota && (
                    <p className="text-sm text-segundo/70 mt-1">
                      {cambio.nota}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
