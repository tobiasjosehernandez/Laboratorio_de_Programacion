<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'pedidos_db');

function obtenerConexion() {
    try {
        $conexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
/*PDO::ATTR_ERRMODE: Es el atributo específico que controla cómo debe reaccionar PDO 
cuando encuentra un error en las consultas o comandos SQL */

/* PDO::ERRMODE_EXCEPTION: Es el valor que le indica a PHP que dispare una excepción 
un error formal cada vez que falle una operación de base de dato*/

return $conexion;
 } catch (PDOException $e) {
 die("Error de conexión: " . $e->getMessage());
  }
}
?>