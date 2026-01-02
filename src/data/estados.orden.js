import { CircleCheck, CreditCard, Loader, Box, Gift, X } from "lucide-react";

export const estadosOrden = [
  {
    nombre: "pendiente",
    label: (
      <div className="flex items-center gap-2">
        <Loader className="w-4 h-4 animate-spin" />
        <p>Pendiente</p>
      </div>
    ),
  },
  {
    nombre: "confirmado",
    label: (
      <div className="flex items-center gap-2">
        <CircleCheck className="w-4 h-4" />
        <p>Confirmado</p>
      </div>
    ),
  },
  {
    nombre: "pagado",
    label: (
      <div className="flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        <p>Pagado</p>
      </div>
    ),
  },
  {
    nombre: "enviado",
    label: (
      <div className="flex items-center gap-2">
        <Box className="w-4 h-4" />
        <p>Enviado</p>
      </div>
    ),
  },
  {
    nombre: "entregado",
    label: (
      <div className="flex items-center gap-2">
        <Gift className="w-4 h-4" />
        <p>Entregado</p>
      </div>
    ),
  },
  {
    nombre: "cancelado",
    label: (
      <div className="flex items-center gap-2">
        <X className="w-4 h-4" />
        <p>Cancelado</p>
      </div>
    ),
  },
];

export const estadoEmoji = {
  pendiente: <Loader className="w-4 h-4 animate-spin" />,
  confirmado: <CircleCheck className="w-4 h-4" />,
  pagado: <CreditCard className="w-4 h-4" />,
  enviado: <Box className="w-4 h-4" />,
  entregado: <Gift className="w-4 h-4" />,
  cancelado: <X className="w-4 h-4" />,
};

export const estadoColores = {
  pendiente: "bg-red-100 text-red-800 border-red-300",
  confirmado: "bg-yellow-100 text-yellow-800 border-yellow-300",
  pagado: "bg-green-100 text-green-800 border-green-300",
  enviado: "bg-blue-100 text-blue-800 border-blue-300",
  entregado: "bg-emerald-100 text-emerald-800 border-emerald-300",
  cancelado: "bg-gray-100 text-gray-800 border-gray-300",
};
