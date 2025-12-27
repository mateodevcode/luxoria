"use client";

import { AppContext } from "@/context/AppContext";
import { formatoDinero } from "@/libs/formatoDinero";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function SearchResult() {
  const {
    openModalSearchResult,
    setOpenModalSearchResult,
    search,
    productos,
    colecciones,
  } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (search.length > 0) {
      setOpenModalSearchResult(true);
    } else {
      setOpenModalSearchResult(false);
    }
  }, [search]);

  // Filtrar productos
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Filtrar colecciones
  const coleccionesFiltradas = colecciones.filter((coleccion) =>
    coleccion.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Obtener sugerencias (primeras 4 coincidencias con nombre y url)
  const sugerencias = [
    ...productosFiltrados.map((p) => ({
      nombre: p.nombre,
      url: p.url,
      tipo: "producto",
    })),
    ...coleccionesFiltradas.map((c) => ({
      nombre: c.nombre,
      url: c.url,
      tipo: "coleccion",
    })),
  ]
    .filter(
      (item, index, self) =>
        self.findIndex((s) => s.nombre === item.nombre) === index
    ) // Evitar duplicados
    .slice(0, 4);

  const totalSugerencias =
    productosFiltrados.length + coleccionesFiltradas.length;

  return (
    <>
      {/* Overlay oscuro */}
      {openModalSearchResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModalSearchResult(false)}
          className="fixed inset-0 bg-segundo/30 bg-opacity-50 z-30"
        />
      )}

      {/* Drawer */}
      <AnimatePresence>
        {openModalSearchResult && (
          <motion.div
            key="drawer"
            initial={{ y: "-75%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full bg-primero z-30 h-screen overflow-y-auto"
          >
            <div className="flex flex-col items-start w-10/12 md:w-8/12 mx-auto pt-32">
              {/* Sugerencias */}
              <div className="w-full flex flex-col mb-4">
                <div className="w-full flex justify-between items-center border-b border-segundo/20 pb-2">
                  <span className="text-segundo dark:text-primero text-lg">
                    Sugerencias
                  </span>
                  <div className="flex justify-between items-center bg-cuarto/50 px-2 py-1 rounded-sm">
                    <span className="text-sm">{totalSugerencias}</span>
                  </div>
                </div>
                <div>
                  <ul className="flex flex-col gap-4 mt-4 text-segundo/80">
                    {sugerencias.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={`/productos/${item.url}`}
                          className="hover:text-cuarto"
                        >
                          {item.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Productos */}
              <div className="w-full flex flex-col mb-4">
                <div className="w-full flex justify-between items-center border-b border-segundo/20 pb-2">
                  <span className="text-segundo">Productos</span>
                  <div className="flex justify-between items-center bg-cuarto/50 px-2 py-1 rounded-sm">
                    <span className="text-sm">{productosFiltrados.length}</span>
                  </div>
                </div>
                <div className="w-full pt-4">
                  {productosFiltrados.map((producto, index) => (
                    <div
                      onClick={() => router.push(`/productos/${producto.url}`)}
                      key={index}
                      className="w-full py-4 hover:bg-cuarto/5 cursor-pointer select-none"
                    >
                      <div className="flex gap-4">
                        <Image
                          src={producto.imageUrl || "/section-4/example-1.webp"}
                          alt={producto.nombre}
                          width={70}
                          height={70}
                          className="object-contain"
                        />
                        <div className="flex flex-col gap-1 text-segundo dark:text-primero">
                          <span>{producto.nombre}</span>
                          <span className="font-semibold">
                            {formatoDinero(producto.precio) || "0.00"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colecciones */}
              <div className="w-full flex flex-col mb-4">
                <div className="w-full flex justify-between items-center border-b border-segundo/20 pb-2">
                  <span className="text-segundo text-lg">Colecciones</span>
                  <div className="flex justify-between items-center bg-segundo/5 px-2 py-1 rounded-sm">
                    <span className="text-sm">
                      {coleccionesFiltradas.length}
                    </span>
                  </div>
                </div>
                <div>
                  <ul className="flex flex-col gap-4 mt-4 text-segundo/80">
                    {coleccionesFiltradas.map((coleccion, index) => (
                      <li key={index}>
                        <Link
                          href={`/colecciones/${coleccion.url}`}
                          className="hover:text-cuarto"
                        >
                          {coleccion.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
