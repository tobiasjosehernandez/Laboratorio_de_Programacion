// ============================================================
// 1. LISTA DE PIZZAS
// ============================================================
import { pizzas } from "./modulos/datos.js";

// ============================================================
// 2. RENDERIZAR CARTAS EN EL DOM
// ============================================================
const cartas_pizzas = document.getElementById("cartas_pz");
if (cartas_pizzas) {
    cartas_pizzas.innerHTML = pizzas.map(pizza => `
        <article class="pizzas" data-id="${pizza.id}">
            <img src="${pizza.imagen}" alt="${pizza.nombre}">
            <h2 class="nombre">${pizza.nombre}</h2>
            <p>Ingredientes:</p>
            <p class="pizza_ingredientes">${pizza.ingredientes}</p>
            <div class="pizza_precio"><h2>Precio: $${pizza.precio} c/u</h2></div>
            <!-- BTN_Cartas -->
            <div class="controles-cantidad">
                <button class="btn-restar">-</button>
                <span class="cantidad">0</span>
                <button class="btn-agregar">+</button>
            </div>
        </article>
    `).join("");
}

// ============================================================
// 3. MENÚ HAMBURGUESA
// ============================================================
const boton = document.querySelector(".hamburguesa");
const menu = document.querySelector(".menu");
    
if (boton && menu) {
    boton.addEventListener("click", function() {
        menu.classList.toggle("mostrar");
        
        if (menu.classList.contains("mostrar")) {
            boton.textContent = "✕";
        } else {
            boton.textContent = "☰";
        }
    });

    menu.addEventListener("click", function(event) {
        if (event.target.closest('a[href^="#"]')) {
            menu.classList.remove("mostrar");
            boton.textContent = "☰";
        }
    });
}
    
// ============================================================
// 4. GESTIÓN DEL CARRITO
// ============================================================
import { leerDeStorage, guardarEnStorage } from "./modulos/funciones.js";

// Recupera el carrito guardado para conservarlo al recargar la página.
let carrito = leerDeStorage("carrito", []);

// Muestra cuántos productos hay en el carrito y las cantidades elegidas.
function actualizarContador() {
    const spanContador = document.getElementById("contadorCarrito");
    if (!spanContador) return;

    let totalItems = 0;
    carrito.forEach(item => {
        totalItems += item.cantidad;
    });
    spanContador.textContent = totalItems;
}

function actualizarCantidadesEnCartas() {
    if (!cartas_pizzas) return;

    cartas_pizzas.querySelectorAll(".pizzas").forEach(tarjeta => {
        const id = parseInt(tarjeta.dataset.id);
        const item = carrito.find(producto => producto.id === id);
        tarjeta.querySelector(".cantidad").textContent = item ? item.cantidad : 0;
    });
}

// Dibuja los productos del carrito y calcula el total de la compra.
function renderizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const carritoVacio = document.getElementById("carritoVacio");
    const spanTotal = document.getElementById("total");
    if (!listaCarrito) return;

    listaCarrito.querySelectorAll(".item-carrito").forEach(item => item.remove());

    let totalGeneral = 0;
    carrito.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add("item-carrito");

        const nombre = document.createElement("h3");
        nombre.classList.add("item-carrito__nombre");
        nombre.textContent = `🍕 ${item.nombre}`;
        const cantidad = document.createElement("p");
        cantidad.classList.add("item-carrito__cantidad");
        cantidad.textContent = `Cantidad: ${item.cantidad}`;
        const subtotal = document.createElement("p");
        subtotal.classList.add("item-carrito__subtotal");
        subtotal.textContent = `Subtotal: $${item.precio * item.cantidad}`;

        divItem.append(nombre, cantidad, subtotal);
        listaCarrito.appendChild(divItem);
        totalGeneral += item.precio * item.cantidad;
    });

    if (carritoVacio) carritoVacio.style.display = carrito.length === 0 ? "block" : "none";
    if (spanTotal) spanTotal.textContent = `$${totalGeneral}`;
}

// Sincroniza todas las partes visibles del carrito después de cada cambio.
function actualizarVistaCarrito() {
    actualizarContador();
    actualizarCantidadesEnCartas();
    renderizarCarrito();
}

// Agrega una pizza nueva o suma una unidad si ya estaba en el carrito.
function agregarAlCarrito(id) {
    const pizzaSeleccionada = pizzas.find(p => p.id === id);
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        
        carrito.push({ ...pizzaSeleccionada, cantidad: 1 });
    }

    guardarEnStorage("carrito", carrito);
    actualizarVistaCarrito();
}

// Cambia la cantidad de una pizza y la quita si llega a cero.
function cambiarCantidad(id, delta) {
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        console.log(`✗ "${item.nombre}" eliminado del carrito`);
        carrito = carrito.filter(i => i.id !== id);
    }

    guardarEnStorage("carrito", carrito);
    actualizarVistaCarrito();
}

actualizarVistaCarrito();

// ============================================================
// 5. NAVEGACIÓN Y EVENTOS DEL CARRITO
// ============================================================
const btnCarrito = document.getElementById("btnCarrito");
if (btnCarrito) {
    btnCarrito.addEventListener("click", () => {
        window.location.hash = "carrito";
    });
}

const btnVaciar = document.getElementById("btnVaciar");
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        // Vacía el carrito guardado y actualiza la vista.
        carrito = [];
        guardarEnStorage("carrito", carrito);
        actualizarVistaCarrito();
    });
}

const formCheckout = document.getElementById("formCheckout");
if (formCheckout) {
    formCheckout.addEventListener("submit", (event) => {
        event.preventDefault();

        if (carrito.length === 0) {
            alert("El carrito está vacío. Agregá una pizza antes de realizar la compra.");
            return;
        }

        if (!guardarEnStorage("carrito", [])) {
            alert("No se pudo guardar la compra. Intentá nuevamente.");
            return;
        }

        carrito = [];
        actualizarVistaCarrito();
        formCheckout.reset();
        alert("¡Pedido realizado con éxito! Gracias por elegir PizzaDelivery.");
    });
}
    
if (cartas_pizzas) {
    cartas_pizzas.addEventListener("click", (e) => {
        const tarjeta = e.target.closest(".pizzas");
        if (!tarjeta) return;

        const botonAgregar = e.target.closest(".btn-agregar");
        const botonRestar = e.target.closest(".btn-restar");
        if (!botonAgregar && !botonRestar) return;

        const pizzaId = parseInt(tarjeta.dataset.id);
        const spanCantidad = tarjeta.querySelector(".cantidad");
        let cantidadActual = parseInt(spanCantidad.textContent);

        if (botonAgregar) {
            agregarAlCarrito(pizzaId);
        } else if (botonRestar && cantidadActual > 0) {
            cambiarCantidad(pizzaId, -1);
        }
    });
}