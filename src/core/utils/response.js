// src/core/utils/response.js

/**
 * Genera una respuesta exitosa estandarizada
 * @param {*} data - Datos a retornar
 * @param {string} message - Mensaje descriptivo
 * @param {number} statusCode - Código de estado HTTP (por defecto 200)
 * @returns {Object} Objeto con body y statusCode
 */
export const successResponse = (
  data,
  message = "Success",
  statusCode = 200
) => {
  return {
    body: JSON.stringify({
      success: true,
      message,
      data,
    }),
    statusCode,
  };
};

/**
 * Genera una respuesta de error estandarizada
 * @param {*} error - Información del error
 * @param {string} message - Mensaje descriptivo del error
 * @param {number} statusCode - Código de estado HTTP (por defecto 500)
 * @returns {Object} Objeto con body y statusCode
 */
export const errorResponse = (error, message = "Error", statusCode = 500) => {
  return {
    body: JSON.stringify({
      success: false,
      message,
      error,
    }),
    statusCode,
  };
};
