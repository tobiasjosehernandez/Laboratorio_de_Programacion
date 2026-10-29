<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login y Registro</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">

                <div class="card shadow p-4 mb-4">
                    <h2 class="text-center mb-4">Acceso al Sistema</h2>

                    <?php if(isset($_GET['error'])): ?>
                        <div class="alert alert-danger" role="alert"><?php echo $_GET['error']; ?></div>
                    <?php endif; ?>

                    <?php if(isset($_GET['exito'])): ?>
                        <div class="alert alert-success" role="alert"><?php echo $_GET['exito']; ?></div>
                    <?php endif; ?>

                    <!-- Formulario de Login -->
                    <h4 class="mb-3">Iniciar Sesión</h4>
                    <form action="Controladores/CTR_Login.php" method="POST" class="mb-4">
                        <input type="hidden" name="accion" value="login">
                        <div class="mb-3">
                            <input type="email" name="email" class="form-control" placeholder="Correo electrónico" required>
                        </div>
                        <div class="mb-3">
                            <input type="password" name="password" class="form-control" placeholder="Contraseña" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Ingresar</button>
                    </form>

                    <hr class="my-4">

                    <!-- Formulario de Registro -->
                    <h4 class="mb-3">Registrarse</h4>
                    <form action="Controladores/CTR_Login.php" method="POST">
                        <input type="hidden" name="accion" value="registrar">
                        <div class="mb-3">
                            <input type="email" name="email" class="form-control" placeholder="Correo electrónico" required>
                        </div>
                        <div class="mb-3">
                            <input type="password" name="password" class="form-control" placeholder="Contraseña" required>
                        </div>
                        <button type="submit" class="btn btn-success w-100">Registrarse</button>
                    </form>
                </div>

            </div>
        </div>
    </div>

</body>
</html>