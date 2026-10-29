<?php
require_once __DIR__ . '/../Modelos/MDL_Pedido.php';

class CTR_Pedido {

 public function procesarAccion() {
 /* Guardar / Editar (POST)*/
 if ($_SERVER['REQUEST_METHOD'] === 'POST') {  /* Si el método de la petición HTTP recibida por el servidor es POST.... */
  $id= $_POST['id'] ?? ''; /* Toma el valor que viene oculto con la clave id desde el formulario por método POST; 
                             y si no existe o viene vacío, asígnale un texto vacío ('')". */
  $nombre= trim($_POST['nombre'] ?? ''); /* Captura el valor del campo nombre que viene del formulario y elimina todos 
                                          los espacios en blanco que tenga al principio y al final
                                          trim(...): Es una función nativa de PHP que sirve para limpiar espacios sobrantes 
                                            */
  $descripcion = trim($_POST['descripcion'] ?? '');
  
  $estado= $_POST['estado'] ?? 'pendiente';
  
  if (!empty($nombre)) {
  if (!empty($id)) {
  MDL_Pedido::actualizar($id, $nombre, $descripcion, $estado);
  $msg = "Pedido modificado con éxito.";
  } else {
    MDL_Pedido::insertar($nombre, $descripcion, $estado);
    $msg = "Pedido registrado con éxito.";
  }
   header("Location: /Gestion_de_Pedidos_php/pedidos.php?msg=" . urlencode($msg));
   /* urlencode(): codifica una cadena de texto para que sea segura de transmitir en una URL*/
exit();
   }
 }

/* Eliminación (GET)*/
if (isset($_GET['eliminar'])) {
 MDL_Pedido::eliminar($_GET['eliminar']);
  header("Location: /Gestion_de_Pedidos_php/pedidos.php?msg=" . urlencode($msg));
exit();
}
 }
}