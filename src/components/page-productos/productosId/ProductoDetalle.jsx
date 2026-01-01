"use client";

import React, { useContext, useState } from "react";
import { CiRuler } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatoDinero } from "@/libs/formatoDinero";
import Link from "next/link";
import { Loader } from "@/components/loading/Loader";
import { useCart } from "@/core/hooks/useCart";
import { toast } from "sonner";
import SugerenciaId from "./SugerenciaId";
import ProductoDetalleIzq from "./ProductoDetalleIzq";
import ProductoDetalleDer from "./ProductoDetalleDer";

const ProductoDetalle = () => {
  const {
    setProductoSeleccionado,
    setOpenModalImagen,
    productos,
    colecciones,
  } = useContext(AppContext);

  const params = useParams();
  const producto = productos.find((producto) => producto.url === params.id);

  const coleccion = colecciones.find(
    (coleccion) => coleccion._id === producto?.coleccionId
  );

  if (!producto) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full font-poppins">
      <div className="grid w-full md:w-9/12 mx-auto grid-cols-1 md:grid-cols-[60%_40%] h-full">
        {/* Sección izquierda */}
        <ProductoDetalleIzq
          producto={producto}
          coleccion={coleccion}
          setProductoSeleccionado={setProductoSeleccionado}
          setOpenModalImagen={setOpenModalImagen}
        />

        {/* Sección derecha */}
        <div className="text-segundo p-6">
          {/* seccion 1 */}
          <ProductoDetalleDer producto={producto} />

          {/* seccion 3 */}
          <SugerenciaId productos={productos} />
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
