<?php
require_once __DIR__ . '/../conexion.php';

class MDL_Usuario {
    
public static function registrar($email, $passwordHash) 
/*static: Le dice a PHP que el método pertenece a la clase en general y no a un objeto 
en particular. Gracias a esto, no hace falta usar new MDL_Usuario() para ejecutarlo 
alcanza con poner MDL_Usuario::registrar(...) */

{
 $db = obtenerConexion();
 $sql = "INSERT INTO usuarios (email, password) VALUES (:email, :password)";
 $stmt = $db->prepare($sql); /* $stmt = $db->prepare($sql);:
                               Toma la plantilla de la consulta SQL y se la entrega a la 
                               conexión ($db) para que PDO la prepare y la blinde contra 
                               inyecciones SQL. 
                               El objeto resultante se guarda en la variable $stmt */
 
 return $stmt->execute /*Envía la orden final a la base de datos para que procese 
                       la consulta ya preparada y devuelve un resultado de tipo booleano 
                       true si salió bien, false si falló hacia donde fue llamada 
                       la función, permitiendo que el controlador sepa si el registro 
                       se completó con éxito */
 
 ([
 'email' => $email,
 'password' => $passwordHash
  ]);
  }

 public static function obtenerPorEmail($email) {
 $db = obtenerConexion(); /*$db = obtenerConexion();: Obtiene y guarda la conexión activa 
                            a la base de datos a través de PDO. */
 $sql = "SELECT * FROM usuarios WHERE email = :email";
 $stmt = $db->prepare($sql); /* Entrega la consulta a la conexión para que PDO la prepare y compile de forma 
                                 segura */
 $stmt->execute(['email' => $email]); /*Ejecuta la sentencia reemplazando el marcador :email 
                              con el valor real que contiene la variable $email */
 return $stmt->fetch(PDO::FETCH_ASSOC); /*Extrae la fila encontrada y la devuelve convertida 
                                          en un array asociativo*/
 }
}
?>