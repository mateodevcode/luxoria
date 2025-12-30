import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

const ProductoDetalleIzq = ({
  producto,
  coleccion,
  setProductoSeleccionado,
  setOpenModalImagen,
}) => {
  return (
    <div className="text-primero p-6">
      <div className="mx-auto flex items-center text-sm font-light text-segundo">
        <Link href={`/colecciones`} className="hover:text-cuarto">
          colecciones
        </Link>{" "}
        <MdKeyboardArrowRight />{" "}
        <Link
          href={`/colecciones/${coleccion.url}`}
          className="hover:text-cuarto"
        >
          {coleccion.nombre.toLowerCase()}
        </Link>{" "}
        <MdKeyboardArrowRight />{" "}
        <Link href={`/productos/${producto.url}`} className="hover:text-cuarto">
          {producto.nombre.toLowerCase()}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-1">
        <div
          className="group relative mt-4"
          onClick={() => {
            setProductoSeleccionado(producto);
            setOpenModalImagen(true);
          }}
        >
          <Image
            src={producto.imageUrl}
            alt={producto.nombre}
            width={800}
            height={800}
            className="h-[50svh] w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-1">
          {producto?.imagenes.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setProductoSeleccionado(image);
                setOpenModalImagen(true);
              }}
              className={`bg-gray-200 group relative`}
            >
              <Image
                src={image.url}
                alt={`${producto.nombre} ${index}`}
                width={800}
                height={800}
                className="h-60 md:h-96 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalleIzq;
