"use client";

import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [openModalCarritoCompras, setOpenModalCarritoCompras] = useState(false);
  const [openModalMenuHamburguesa, setOpenModalMenuHamburguesa] =
    useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [openModalImagen, setOpenModalImagen] = useState(false);
  const [imageSelected, setImageSelected] = useState(
    "/section-4/example-1.png"
  );
  const [openModalSearchResult, setOpenModalSearchResult] = useState(false);
  const [search, setSearch] = useState("");
  const [openModalReview, setOpenModalReview] = useState(false);
  const [imageSelectedReview, setImageSelectedReview] = useState(null);
  const [openModalMySize, setOpenModalMySize] = useState(false);

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
        imageSelected,
        setImageSelected,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
