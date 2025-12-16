export const obtenerPrimeraFrase = (descripcion) => {
  if (!descripcion || !descripcion.trim()) return "";
  const primeraFrase = descripcion.split(",")[0];
  return primeraFrase;
};
