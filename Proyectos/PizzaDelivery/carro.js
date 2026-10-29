import { leerDeStorage, guardarEnStorage } from './modulos/funciones.js';

function renderizarCarrito() {
    const carrito = leerDeStorage("carrito", []);
    
    const listaCarrito = document.getElementById("listaCarrito");
    const carritoVacio = document.getElementById("carritoVacio");
    
    if (!listaCarrito) return;

    // Si el carrito está vacío
    if (carrito.length === 0) {
        if (carritoVacio) carritoVacio.style.display = "block";
        
        const itemsAnteriores = listaCarrito.querySelectorAll(".item-carrito");
        itemsAnteriores.forEach(i => i.remove());
        
        actualizarTotalGeneral(0);
        return;
    }

    // Si hay productos
    if (carritoVacio) carritoVacio.style.display = "none";

    const itemsAnteriores = listaCarrito.querySelectorAll(".item-carrito");
    itemsAnteriores.forEach(i => i.remove());

    // Dibujamos cada producto con su Subtotal individual
    carrito.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add("item-carrito");
        divItem.style.cssText = "margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;";
        
        divItem.innerHTML = `
            <h3>🍕 ${item.nombre}</h3>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: $${item.precio * item.cantidad}</p>
        `;
        listaCarrito.appendChild(divItem);
    });

    // Calculamos el total general sumando los subtotales
    let totalGeneral = 0;
    carrito.forEach(item => {
        totalGeneral += item.precio * item.cantidad;
    });

    actualizarTotalGeneral(totalGeneral);
}

// Función para mostrar el total final en el resumen
function actualizarTotalGeneral(total) {
    const spanTotal = document.getElementById("total");
    if (spanTotal) spanTotal.textContent = `$${total}`;
}

// Botón para vaciar el carrito
const btnVaciar = document.getElementById("btnVaciar");
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        guardarEnStorage("carrito", []);
        renderizarCarrito();
    });
}

// Ejecutamos al cargar la página
renderizarCarrito();

