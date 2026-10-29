<?php
session_start(); /* Arranca o retoma la sesión activa del usuario para poder acceder a 
                 los datos que el servidor tiene guardados */
session_destroy(); /*Destruye por completo todos los datos registrados en la sesión actual
                   en el servidor, cerrando efectivamente la sesión del usuario */
header("Location: index.php"); /* Envía una orden HTTP al navegador para que redirija 
                        al usuario de inmediato hacia la página de inicio o login */
exit;