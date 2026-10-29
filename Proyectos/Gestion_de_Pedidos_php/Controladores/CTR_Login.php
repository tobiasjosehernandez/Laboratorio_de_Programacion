<?php
require_once "../Modelos/MDL_Usuario.php";
session_start(); /*session: es una función de PHP que inicia una nueva sesión o reanuda una ya existente para un usuario */

if (isset($_POST['accion'])) /* isset(): Es una función de PHP que comprueba si una variable o un índice de un arreglo 
                                   está definido y tiene un valor distinto de NULL. Si no existe, devuelve false 
                                   en lugar de generar un error o advertencia en pantalla 
                                 $_POST: Es un arreglo asociativo nativo de PHP que captura y almacena todos los datos 
                                 enviados por un formulario HTML que utiliza el método POST  
                                 ['accion']: Es la clave específica que definimos en los formularios con un campo oculto*/
      {
 $accion = $_POST['accion'];
    
$email = trim($_POST['email']); /*trim(): es una función de PHP que elimina los espacios en blanco u otros caracteres 
                                 invisibles tanto al principio como al final de una cadena de texto */
$password = $_POST['password'];

if ($accion === 'registrar') {
 $passwordHash = password_hash($password, PASSWORD_DEFAULT);/* Toma la contraseña en texto plano que escribió el usuario, 
                                                               la pasa por la función de cifrado de PHP y guarda el resultado 
                                                               el hash seguro dentro de la variable $passwordHash 
                                                               para poder enviarla a la base de datos de forma protegida */
 try {
 MDL_Usuario::registrar($email, $passwordHash);/* Ordena al Modelo de Usuarios que guarde 
                                                  los datos del nuevo usuario en la base de datos, 
                                                   enviándole el correo limpio y la contraseña ya cifrada.*/
 header("Location: ../index.php?exito=Registrado correctamente");
 } catch (Exception $e) {
  header("Location: ../index.php?error=El correo ya está registrado");
  }
 exit;
    }

 if ($accion === 'login') {
    $usuario = MDL_Usuario::obtenerPorEmail($email);
        
if ($usuario && password_verify($password, $usuario['password'])) {
    $_SESSION['user'] = $usuario['email'];
    header("Location: ../admin.php");
  } else {
  header("Location: ../index.php?error=DATOS INCORRECTOS");
    }
     exit;
    }
    }
?>
/*session: es una función de PHP que inicia una nueva sesión o reanuda una ya existente para un usuario */
/* isset(): Es una función de PHP que comprueba si una variable o un índice de un arreglo 
en lugar de generar un error o advertencia en pantalla está definido y tiene un valor distinto de NULL. Si no existe, devuelve false 
enviados por un formulario HTML que utiliza el método POST  
$_POST: Es un arreglo asociativo nativo de PHP que captura y almacena todos los datos 
['accion']: Es la clave específica que definimos en los formularios con un campo oculto*/
/* urlencode(): codifica una cadena de texto para que sea segura de transmitir en una URL*/
static: Significa que no necesitas instanciar la clase es decir, no se necesitaa usar
la palabra new para crear un objeto para poder usar esta función.
Sin static: Se tiene que escribir $obj = new MiClase(); $obj->miFuncion();
Con static: Se llama directamente usando el nombre de la clase y el operador de doble dos puntos (::), así: MiClase::miFuncion();                                                                              
                                         */
/*fetchALL (traer todo): A diferencia de fetch() solo trae el siguiente registro 
                                              de uno en uno, fetchAll() recopila todas las filas de golpe que devolvió 
                                              la base de datos y las incorpora en una lista grande. 
                                              PDO::FETCH_ASSOC: Se le indica a PHP como se guarden los datos de cada fila dentro de 
                                              ese arreglo.
                                              -) Si se usa otro modo, los datos se pordrán guardar usando números como índices 
                                              (por ejemplo,$fila[0], $fila[1]).
                                              -) usar FETCH_ASSOC, se le dice a PHP que use los nombres de las columnas de la
                                               tabla como las llaves del arreglo.
                                            */