// GUARDAR OBJETOS: JSON.stringify y JSON.parse
export function leerDeStorage(clave, valorPorDefecto = null) {
  try {
    const item = localStorage.getItem(clave);
    return item ? JSON.parse(item) : valorPorDefecto;
  } catch (error) {
    console.error(`Error al leer '${clave}' de localStorage:`, error);
    return valorPorDefecto;
  }
}

export function guardarEnStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error(`Error al guardar '${clave}' en localStorage:`, error);
    return false;
  }
}