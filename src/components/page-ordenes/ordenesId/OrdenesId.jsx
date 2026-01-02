"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  ChevronDown,
  CircleDollarSign,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Loader,
  Package,
  Settings,
  UserRound,
} from "lucide-react";
import { handleActualizarEstado, useOrden } from "@/core/hooks/useOrdenStore";
import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { estadoColores, estadoEmoji, estadosOrden } from "@/data/estados.orden";
import { useAuthStore } from "@/core/store/authStore";

export default function OrdenesId() {
  const params = useParams();
  const id = params.id;
  const { user } = useAuthStore();

  const {
    ordenActual: orden,
    isLoading: loading,
    error,
    cargarOrden,
    actualizarEstadoOrden,
  } = useOrden();

  const [esVendedor, setEsVendedor] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [notasVendedor, setNotasVendedor] = useState("");

  useEffect(() => {
    obtenerOrden();
  }, [id]);

  const obtenerOrden = async () => {
    const ordenData = await cargarOrden(id);
    if (ordenData) {
      setNuevoEstado(ordenData.estado);
      setNotasVendedor(ordenData.notasVendedor || "");
      checkIfVendedor();
    }
  };

  const checkIfVendedor = () => {
    if (user?.role === "admin") {
      setEsVendedor(true);
    } else {
      setEsVendedor(false);
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
              <div className="flex flex-col gap-2 w-full">
                <label className="block text-sm font-semibold text-segundo mb-2">
                  Estado de la Orden
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="relative rounded-md flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Listbox
                      value={nuevoEstado}
                      onChange={(e) => setNuevoEstado(e)}
                    >
                      {({ open }) => (
                        <div>
                          <Listbox.Button className="bg-transparent focus text-segundo/80 border border-segundo/10 text-xs rounded-xs focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition h-12 px-4 w-full">
                            <div className="flex items-center gap-2">
                              <span className="capitalize">
                                {
                                  estadosOrden.find(
                                    (estado) => estado.nombre === nuevoEstado
                                  )?.label
                                }
                              </span>
                            </div>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <ChevronDown className="h-4 w-4 text-segundo/70" />
                            </span>
                          </Listbox.Button>

                          {open && (
                            <Listbox.Options
                              className="absolute z-10 mt-2 w-full bg-primero border border-segundo/10 text-segundo/70 rounded-xs shadow-lg max-h-60 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60
                                                  [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent"
                            >
                              {estadosOrden.map((estado, index) => (
                                <Listbox.Option
                                  key={index}
                                  value={estado.nombre}
                                  className={({ active, selected }) =>
                                    `cursor-pointer px-4 py-2 ${
                                      active ? "bg-segundo/5" : ""
                                    } ${
                                      selected
                                        ? "text-segundo bg-segundo/10"
                                        : ""
                                    }`
                                  }
                                >
                                  {estado.label}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          )}
                        </div>
                      )}
                    </Listbox>
                  </div>
                </div>
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
                onClick={() =>
                  handleActualizarEstado(
                    actualizarEstadoOrden,
                    id,
                    nuevoEstado,
                    notasVendedor
                  )
                }
                disabled={loading}
                className="w-full bg-cuarto hover:bg-cuarto/80 disabled:opacity-50 text-primero font-bold py-3 rounded transition"
              >
                {loading ? "Guardando..." : "Guardar Cambios"}
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
