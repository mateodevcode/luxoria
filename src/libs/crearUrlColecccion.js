export const crearUrlColeccion = (url) => {
  if (!url || typeof url !== "string") return "";
  const urlLowerCase = url.toLowerCase();
  const urlReplace = urlLowerCase.replace(/ /g, "-");
  return `/colecciones/${urlReplace}`;
};
