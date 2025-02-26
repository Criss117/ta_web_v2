export const FORM_MESSAGES = {
  UNKNOWN_ERROR: "Hubo un error inesperado",
} as const;

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

export const CLIENT_FORM_MESSAGES = {
  CCNUMBER: {
    REQUIRED: "El número de cédula es requerido",
    MIN: "El número de cédula debe tener al menos 5 caracter",
    MAX: "El número de cédula debe tener como maximo 10 caracteres",
  },
  FULLNAME: {
    REQUIRED: "El nombre es requerido",
    MIN: "El nombre debe tener al menos 5 caracteres",
    MAX: "El nombre debe tener como maximo 225 caracteres",
  },
  CREDITLIMIT: {
    REQUIRED: "El límite de crédito es requerido",
    MIN: "El límite de crédito debe ser mayor a 0",
  },
  ADDRESS: {
    MIN: "La dirección debe tener al menos 5 caracteres",
    MAX: "La dirección debe tener como maximo 225 caracteres",
  },
  PHONE: {
    MIN: "El celular debe tener al menos 10 caracteres",
  },
  ERROR_TITLE: "Upps, ocurrio un error",
  UNKNOWN_ERROR: "Hubo un error inesperado",
  SUCCESS: "Cliente guardado exitosamente",
  DELETE_SUCCESS: "Cliente eliminado exitosamente",
  DELETE_ERROR: "Error al eliminar el cliente",
} as const;

export const PAY_MESSAGES = {
  ERROR_TITLE: "Upps, ocurrio un error",
  UNKNOWN_ERROR: "Hubo un error inesperado",
  SUCCESS: "Cobro realizado exitosamente",
};
