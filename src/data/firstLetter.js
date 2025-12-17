export const firstLetter = (text) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > 0 ? words[0].charAt(0).toUpperCase() : "";
};
