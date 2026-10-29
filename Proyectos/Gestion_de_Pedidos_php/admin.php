<?php
session_start(); /* Arranca o retoma la sesión activa para poder leer los datos que el 
                    servidor tiene guardados sobre el usuario */

if (!isset($_SESSION['user'])) {
    /* 
      Si la sesión NO existe El sistema detecta que la persona no está autenticada, 
      por lo que entra al if y ejecuta esto:
    */
 header("Location: index.php");
 exit;
}

/* 
  Si la sesión SÍ existe El sistema saltea el if 
  y permite ver la página con total normalidad.
*/
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel Administrativo</title>
</head>
<body>
    <h2>Bienvenido a la gestion de Pedidos, <?php echo htmlspecialchars($_SESSION['user']); ?></h2>
    <!--- htmlspecialchars(): actúa como un traductor o un filtro de seguridad,
    Es la función que usas antes de mostrar en pantalla cualquier dato que haya ingresado 
    un usuario, para asegurarte de que solo se vea como texto y nunca pueda dañar 
    el sistema o interpretar código extraño ---->
    <br>

    
  <div style="margin: 15px 0;">
        <a href="pedidos.php" class="btn btn-primary" style="padding: 8px 15px; background: #0d6efd; color: white; text-decoration: none; border-radius: 4px;">
   Gestionar Pedidos
        </a>
    </div>

    <br>
  <a href="logout.php">Cerrar Sesión</a>
</body>
</html>