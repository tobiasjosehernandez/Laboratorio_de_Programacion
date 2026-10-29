<?php
require_once 'Controladores/CTR_Pedido.php';
/* Ejecutar acciones del controlador (Guardar/Eliminar)*/
$controlador = new CTR_Pedido();
$controlador->procesarAccion();

/*Obtener datos para la vista*/
$pedidos = MDL_Pedido::obtenerTodas();

/*Cargar datos si se presiona editar*/
$editData = ['id' => '', 'nombre' => '', 'descripcion' => '', 'estado' => 'Pendiente'];
if (isset($_GET['editar'])) {
    $resultado = MDL_Pedido::obtenerPorId($_GET['editar']);
    if ($resultado) {
        $editData = $resultado;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Gestión de Pedidos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Pedidos</h2>
        <a href="admin.php" class="btn btn-outline-secondary btn-sm">Volver al Panel</a>
    </div>
    <hr>

    <?php if (!empty($_GET['msg'])): ?> <!---- Si la URL trae un mensaje (msg) y no está vacío, muestra la alerta en la 
                                          pantalla $_GET['msg']: Lee el mensaje que viaja visible en la barra de direcciones.   
                                         !empty: Verifica que traiga contenido real.-->
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <?= htmlspecialchars($_GET['msg']) ?>  <!---- "Imprime en la pantalla y de forma segura el mensaje que viene en
                                                       la URL"
            
               htmlspecialchars(...): Neutraliza los caracteres especiales para evitar ataques de inyección de código (XSS).--->
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    <?php endif; ?>

    <div class="row">
        <!-- Formulario -->
        <div class="col-md-4">
            <div class="card p-3 shadow-sm">
                <h4><?= !empty($editData['id']) ? 'Modificar Pedido' : 'Crear Pedido' ?></h4>
                <form action="pedidos.php" method="post">
                    <input type="hidden" name="id" value="<?= $editData['id'] ?>">
                    
                    <div class="mb-3">
                        <label class="form-label">Pedido</label>
                        <input type="text" class="form-control" name="nombre" value="<?= htmlspecialchars($editData['nombre']) ?>" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción/Agregados</label>
                        <textarea class="form-control" name="descripcion"><?= htmlspecialchars($editData['descripcion']) ?></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Estado</label>
                        <select class="form-control" name="estado">
                            <option value="Pendiente" <?= $editData['estado'] === 'Pendiente' ? 'selected' : '' ?>>Pendiente</option>
                            <option value="Entregado" <?= $editData['estado'] === 'Entregado' ? 'selected' : '' ?>>Entregado</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-100"><?= !empty($editData['id']) ? 'Actualizar' : 'Guardar' ?></button>
                    
                    <?php if (!empty($editData['id'])): ?>
                        <a href="pedidos.php" class="btn btn-secondary w-100 mt-2">Cancelar</a>
                    <?php endif; ?>
                </form>
            </div>
        </div>

        <!-- Tabla -->
        <div class="col-md-8">
            <table class="table table-bordered table-striped align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Pedido</th>
                        <th>Descripción/Agregados</th>
                        <th>Estado</th>
                        <th>Acciones</th>       
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($pedidos)): ?>
                        <?php foreach ($pedidos as $m): ?>
                            <tr>
                                <td><?= $m['id'] ?></td>
                                <td><?= htmlspecialchars($m['nombre']) ?></td>
                                <td><?= htmlspecialchars($m['descripcion']) ?></td>
                                <td>
                                    <span class="badge <?= $m['estado'] === 'Pendiente' ? 'bg-success' : 'bg-secondary' ?>">
                                        <?= htmlspecialchars($m['estado']) ?>
                                    </span>
                                </td>
                                <td>
                                    <a href="pedidos.php?editar=<?= $m['id'] ?>" class="btn btn-warning btn-sm">Editar</a>
                                    <a href="pedidos.php?eliminar=<?= $m['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('¿Estás seguro?')">Eliminar</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr><td colspan="5" class="text-center text-muted">No hay pedidos registrados.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>