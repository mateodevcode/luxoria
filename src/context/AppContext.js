"use client";

import { apiServerBackend } from "@/app/actions/apiServerBackend";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [openModalCarritoCompras, setOpenModalCarritoCompras] = useState(false);
  const [openModalMenuHamburguesa, setOpenModalMenuHamburguesa] =
    useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [openModalImagen, setOpenModalImagen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [openModalSearchResult, setOpenModalSearchResult] = useState(false);
  const [search, setSearch] = useState("");
  const [openModalReview, setOpenModalReview] = useState(false);
  const [imageSelectedReview, setImageSelectedReview] = useState(null);
  const [openModalMySize, setOpenModalMySize] = useState(false);
  const [colecciones, setColecciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [anchoPantalla, setAnchoPantalla] = useState(0);

  useEffect(() => {
    // Solo se ejecuta en el cliente
    const handleResize = () => {
      setAnchoPantalla(window.innerWidth);
    };

    // Establecer valor inicial
    handleResize();

    // Escuchar cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Limpiar event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cargarColecciones = async () => {
      try {
        const res = await apiServerBackend(`api/colecciones`, "GET");
        const { data: coleccionesRes, message, success, error } = res;
        if (success === true) {
          setColecciones(coleccionesRes);
        } else {
          console.warn("⚠️ No se pudo cargar colecciones:", error);
          toast.error("No se pudo cargar las colecciones", {
            description: error,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("🚨 Error al cargar las colecciones:", error);
      }
    };

    cargarColecciones();
  }, []);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await apiServerBackend(`api/productos`, "GET");
        const { data: productosRes, message, success, error } = res;
        if (success === true) {
          setProductos(productosRes);
        } else {
          console.warn("⚠️ No se pudo cargar productos:", error);
          toast.error("No se pudo cargar los productos", {
            description: error,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("🚨 Error al cargar los productos:", error);
      }
    };

    cargarProductos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        openModalCarritoCompras,
        setOpenModalCarritoCompras,
        openModalMenuHamburguesa,
        setOpenModalMenuHamburguesa,
        openModalSearch,
        setOpenModalSearch,
        openModalImagen,
        setOpenModalImagen,
        productoSeleccionado,
        setProductoSeleccionado,
        openModalSearchResult,
        setOpenModalSearchResult,
        search,
        setSearch,
        openModalReview,
        setOpenModalReview,
        imageSelectedReview,
        setImageSelectedReview,
        openModalMySize,
        setOpenModalMySize,
        colecciones,
        setColecciones,
        productos,
        setProductos,
        anchoPantalla,
        setAnchoPantalla,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
