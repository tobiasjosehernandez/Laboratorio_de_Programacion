// GUARDAR OBJETOS: JSON.stringify y JSON.parse
export function leerDeStorage(clave, valorPorDefecto = null) {
  try {
    const item = localStorage.getItem(clave);
    // getItem() Busca en el localStorage el dato asociado a la clave recibida
    return item ? JSON.parse(item) : valorPorDefecto;
    // Si encontró un dato (item), lo convierte de texto JSON a un objeto JavaScript con JSON.parse().
    // Si no encontró nada, devuelve el valor por defecto.
  } catch (error) {
    console.error(`Error al leer '${clave}' de localStorage:`, error);
    return valorPorDefecto;
  }
}

export function guardarEnStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    // setItem() guarda un valor en localStorage bajo la clave especificada.
    // JSON.stringify() convierte el valor (que puede ser un objeto o un arreglo) en una cadena JSON
    //  para que pueda almacenarse correctamente.
    return true;
    // Si la operación es exitosa, devuelve true.
  } catch (error) {
    console.error(`Error al guardar '${clave}' en localStorage:`, error);
    return false;
    // Si ocurre un error (por ejemplo, si el almacenamiento está lleno), devuelve false.
  }
}