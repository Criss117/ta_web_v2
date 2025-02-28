export const PRODUCT_FORM_MESSAGES = {
  BARCODE: {
    REQUIRED: "El código de barras es requerido",
    MIN: "El código de barras debe tener al menos 1 caracter",
    MAX: "El código de barras debe tener como maximo 225 caracteres",
  },
  DESCRIPTION: {
    REQUIRED: "La descripción es requerida",
    MIN: "La descripción debe tener al menos 5 caracteres",
    MAX: "La descripción debe tener como maximo 225 caracteres",
  },
  COSTPRICE: {
    REQUIRED: "El precio de costo es requerido",
    MIN: "El precio de costo debe ser mayor a 0",
  },
  SALEPRICE: {
    REQUIRED: "El precio de venta es requerido",
    MIN: "El precio de venta debe ser mayor a 0",
    MIN_COSTPRICE:
      "El precio de venta debe ser mayor o igual al precio de costo",
  },
  WHOLESALEPRICE: {
    REQUIRED: "El precio de mayorista es requerido",
    MIN: "El precio de mayorista debe ser mayor a 0",
    MAX_COSTPRICE:
      "El precio de mayorista debe ser menor o igual al precio de venta",
  },
  STOCK: {
    REQUIRED: "La existencia es requerida",
    MIN: "La existencia debe ser mayor a 0",
  },
  MINSTOCK: {
    REQUIRED: "El stock minimo es requerido",
    MIN: "El stock minimo debe ser mayor a 0",
    MAX_STOCK: "El stock minimo debe ser menor o igual al stock",
  },
  QUANTITY: {
    REQUIRED: "La cantidad es requerida",
    MIN: "La cantidad debe ser mayor a 0",
    MAX_STOCK: "La cantidad debe ser menor o igual al stock",
  },
  DELETED_SUCCESS: "Producto eliminado exitosamente",
  DELETED_ERROR: "Error al eliminar el producto",
  SUCCESS: "Producto guardado exitosamente",
  ERROR_TITLE: "Upps, ocurrio un error",
  ERROR: "Error al guardar el producto",
  EXIST: "Ya existe un producto con ese código de barras",
  UNKNOWN_ERROR: "Hubo un error inesperado",
} as const;

export const PAY_MESSAGES = {
  ERROR_TITLE: "Upps, ocurrio un error",
  UNKNOWN_ERROR: "Hubo un error inesperado",
  SUCCESS: "Cobro realizado exitosamente",
};
