"use client";

import React, { useContext } from "react";
import { CiRuler } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { formatoDinero } from "@/libs/formatoDinero";
import Link from "next/link";
import { Loader } from "@/components/loading/Loader";
import { productosGancho } from "@/data/data.productos.gancho";

const ProductoDetalle = () => {
  const {
    setOpenModalMySize,
    setProductoSeleccionado,
    productoSeleccionado,
    setOpenModalImagen,
    productos,
    colecciones,
  } = useContext(AppContext);
  const router = useRouter();
  const params = useParams();

  const producto = productos.find((producto) => producto.url === params.id);

  const coleccion = colecciones.find(
    (coleccion) => coleccion._id === producto?.coleccionId
  );

  console.log(producto);

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
            <Link
              href={`/productos/${producto.url}`}
              className="hover:text-cuarto"
            >
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

        {/* Sección derecha */}
        <div className="text-segundo p-6">
          {/* seccion 1 */}
          <div className="max-w-md mx-auto p-4 font-sans mt-10 md:mt-20">
            {/* Header */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2 border-b pb-2 border-segundo/10">
                <h1 className="text-lg font-semibold">{producto.nombre}</h1>
                <p className="text-sm font-bold">
                  {formatoDinero(producto.precio)}
                </p>
              </div>
              <div className="text-xs bg-segundo/5 font-semibold p-2 flex flex-col justify-center items-center">
                <p className="">
                  Todos nuestros productos estan garantizados y cumplen con las
                  normas de calidad.
                </p>
              </div>
            </div>

            {/* Promo Section */}
            {producto?.descuento === 0 && (
              <div className="mb-6 bg-segundo/5 p-2 rounded border border-segundo flex items-center justify-center">
                <div className="text-xs font-bold flex items-center gap-4">
                  <span>AHORRA {producto.descuento}% CON BUNDLES</span>{" "}
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Ver más</span>
                    <RiArrowDropDownFill className="text-xl" />
                  </div>
                </div>
              </div>
            )}

            {/* Color Section */}
            <div className="mb-6">
              {/* <div className=" mb-2 flex items-center gap-1">
                <h3 className="font-semibold">COLOUR | </h3>
                <span>Blush</span>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-pink-200 border border-gray-300"></div>
                <div className="w-6 h-6 rounded-full bg-segundo border border-segundo/20"></div>
                <div className="w-6 h-6 rounded-full bg-sky-300 border border-segundo/20"></div>
                <div className="w-6 h-6 rounded-full bg-amber-200 border border-segundo/20"></div>
              </div> */}
              <div
                className="text-sm font-semibold bg-segundo/5 w-36 flex items-center justify-center gap-1 p-1 rounded cursor-pointer mt-4"
                onClick={() => {
                  setOpenModalMySize(true);
                }}
              >
                <CiRuler />
                <span>Cual es mi talla?</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">TALLAS</h3>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {producto?.size.map((size) => (
                  <button
                    key={size}
                    className="border border-segundo py-2 text-sm rounded font-bold hover:border-cuarto hover:bg-cuarto/50 transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Size Guide */}
              <div className="grid grid-cols-3 text-center text-xs text-gray-600 mb-4 border border-segundo rounded mt-5">
                <span className="py-1">SM</span>
                <span className="bg-segundo text-primero py-1 font-semibold">
                  TALLA CORRECTA
                </span>
                <span className="py-1">XL</span>
              </div>

              {/* Model Info */}
              <div className="text-xs p-1 rounded flex items-center gap-1 bg-segundo/5">
                <img
                  src={producto?.imageUrl}
                  alt="person"
                  className="w-10 h-10"
                />
                <p className="text-segundo/70">
                  <span className="font-semibold">Marcos usa talla M.</span> el
                  tiene 189 cm de altura, 90.2 cm de cintura y 101.6 cm de
                  cadera
                </p>
              </div>
            </div>

            {/* Add to Bag */}
            <div className="">
              <button className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors">
                Agregar al carrito - {formatoDinero(producto.precio)}
              </button>
              <p className="text-xs mt-4 text-segundo/80 font-semibold">
                Este producto esta totalmente garantizado y cumple con las
                normas de calidad.
              </p>
            </div>
          </div>

          {/* Seccion 2 */}
          {/* <div className="max-w-2xl mx-auto p-6 font-sans">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 border-b border-segundo/10 pb-2">
              <img
                src="/collections/details/4.webp"
                alt="Soft Icon"
                className=""
              />
              <img
                src="/collections/details/2.webp"
                alt="Soft Icon"
                className=""
              />
              <img
                src="/collections/details/3.webp"
                alt="Soft Icon"
                className=""
              />
              <img
                src="/collections/details/1.webp"
                alt="Soft Icon"
                className=""
              />
            </div>
            <ProductsAccordeonDetails />
          </div> */}

          {/* seccion 3 */}
          <div className="max-w-2xl mx-auto p-6">
            <div className="max-w-2xl mx-auto p-6 font-sans border border-segundo/10 relative h-72 mt-4">
              <h2 className="text-xl text-center absolute -top-4 bg-primero px-4 mx-auto left-0 right-0 w-max">
                Anillos de compromiso
              </h2>

              <div className="flex flex-col h-full gap-2">
                {productosGancho.map((product, index) => {
                  const productoFind = productos.find((p) => p._id === product);

                  return (
                    <div key={index} className="h-1/2 w-full flex items-center">
                      <Image
                        src={productoFind.imageUrl}
                        alt={productoFind.nombre}
                        className="h-full object-cover"
                        width={200}
                        height={200}
                      />
                      <div>
                        <h3 className="text-sm">{productoFind.nombre}</h3>
                        <p className="font-bold text-sm mt-2">
                          {formatoDinero(productoFind.precio)}
                        </p>
                        <button
                          onClick={() =>
                            router.push(`/productos/${productoFind.url}`)
                          }
                          className="uppercase font-semibold bg-segundo/5 w-36 flex items-center justify-center gap-1 cursor-pointer mt-2 p-3 text-sm hover:bg-segundo hover:text-white transition-colors"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="h-1/2 w-full flex items-center gap-4">
                  <img
                    src="/collections/complete-fit/img-1.png"
                    alt="imagen fit 1"
                    className="h-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">Flaunt Micro Brief - Onyx</h3>
                    <p className="font-bold text-sm mt-2">€32.00</p>
                    <div className="uppercase font-semibold bg-segundo/5 w-36 flex items-center justify-center gap-1 cursor-pointer mt-2 p-3 text-sm">
                      quick view
                    </div>
                  </div>
                </div>
                <div className="h-1/2 w-full flex items-center gap-4">
                  <img
                    src="/collections/complete-fit/img-2.png"
                    alt="imagen fit 1"
                    className="h-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">Flaunt Micro Brief - Onyx</h3>
                    <p className="font-bold text-sm mt-2">€32.00</p>
                    <div className="uppercase font-semibold bg-segundo/5 w-36 flex items-center justify-center gap-1 cursor-pointer mt-2 p-3 text-sm">
                      quick view
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
