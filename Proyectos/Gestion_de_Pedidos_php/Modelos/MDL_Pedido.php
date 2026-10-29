<?php
require_once __DIR__ . '/../conexion.php';

class MDL_Pedido {
    
public static function obtenerTodas() { /* Se utiliza para definir un método (función dentro de una clase) que pertenece 
                                         a la clase en sí misma y no a un objeto individual 
                                         static: Significa que no necesitas instanciar la clase es decir, no se necesitaa usar
                                         la palabra new para crear un objeto para poder usar esta función.
                                         Sin static: Se tiene que escribir $obj = new MiClase(); $obj->miFuncion();
                                         Con static: Se llama directamente usando el nombre de la clase y el operador 
                                         de doble dos puntos (::), así: MiClase::miFuncion();                                                                              
                                         */

$conexion = obtenerConexion(); 
 $stmt = $conexion->query("SELECT * FROM pedidos ORDER BY id DESC");

 
 return $stmt->fetchAll(PDO::FETCH_ASSOC); /*fetchALL (traer todo): A diferencia de fetch() solo trae el siguiente registro 
                                              de uno en uno, fetchAll() recopila todas las filas de golpe que devolvió 
                                              la base de datos y las incorpora en una lista grande. 
                                              PDO::FETCH_ASSOC: Se le indica a PHP como se guarden los datos de cada fila dentro de 
                                              ese arreglo.
                                              -) Si se usa otro modo, los datos se pordrán guardar usando números como índices 
                                              (por ejemplo,$fila[0], $fila[1]).
                                              -) usar FETCH_ASSOC, se le dice a PHP que use los nombres de las columnas de la
                                               tabla como las llaves del arreglo.
                                              */
}

 public static function obtenerPorId($id) {
 $conexion = obtenerConexion(); 
 $stmt = $conexion->prepare("SELECT * FROM pedidos WHERE id = ?");
 $stmt->execute([$id]);
 return $stmt->fetch(PDO::FETCH_ASSOC);
 }

public static function insertar($nombre, $descripcion, $estado) {
$conexion = obtenerConexion(); 
$stmt = $conexion->prepare("INSERT INTO pedidos (nombre, descripcion, estado) VALUES (?, ?, ?)");
return $stmt->execute([$nombre, $descripcion, $estado]);
}

public static function actualizar($id, $nombre, $descripcion, $estado) {
 $conexion = obtenerConexion(); 
 $stmt = $conexion->prepare("UPDATE pedidos SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?");
 return $stmt->execute([$nombre, $descripcion, $estado, $id]);
 }

public static function eliminar($id) {
$conexion = obtenerConexion(); 
 $stmt = $conexion->prepare("DELETE FROM pedidos WHERE id = ?");
return $stmt->execute([$id]);
  }
}