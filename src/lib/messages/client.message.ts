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
