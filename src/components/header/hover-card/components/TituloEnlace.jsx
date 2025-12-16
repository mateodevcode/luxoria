import React from "react";

const TituloEnlace = ({ categoria }) => {
  return (
    <h2 className="uppercase text-lg text-segundo dark:text-primero pb-2 border-b border-gray-200 dark:border-primero">
      {categoria}
    </h2>
  );
};

export default TituloEnlace;
