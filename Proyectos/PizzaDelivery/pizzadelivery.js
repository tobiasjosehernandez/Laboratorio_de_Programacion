// ============================================================
// 1. LISTA DE PIZZAS
// ============================================================
const pizzas = [
    {
        id: 1,
        imagen: "imagenes/cartas/muzza.jpeg",
        nombre: "SARDINA",
        ingredientes: "Muzza, salsa, sardinas aceitunas",
        precio: 10000
    },
    {
        id: 2,
        imagen: "imagenes/cartas/especial.jpeg",
        nombre: "ESPECIAL",
        ingredientes: "Muzza, jamon,huevo rallado,morron , sardinas aceitunas",
        precio: 10000
    },
    {
        id: 3,
        imagen: "imagenes/cartas/salchipapa.jpeg",
        nombre: "SALCHIPAPA",
        ingredientes: "muzza, papas fritas, salchichas, aceitunas",
        precio: 12000
    }
];

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
            <div class="pizza_precio">Precio: $${pizza.precio} c/u</div>
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
}
    
// ============================================================
// 4. STORAGE Y CARRITO
// ============================================================
import { leerDeStorage, guardarEnStorage } from "./modulos/funciones.js";

let carrito = leerDeStorage("carrito", []);

function actualizarContador() {
    const spanContador = document.getElementById("contadorCarrito");
    if (!spanContador) return;

    let totalItems = 0;
    carrito.forEach(item => {
        totalItems += item.cantidad;
    });
    spanContador.textContent = totalItems;
}

function agregarAlCarrito(id) {
    const pizzaSeleccionada = pizzas.find(p => p.id === id);
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        // CORREGIDO: Usamos spread (...) para guardar las propiedades limpias al mismo nivel
        carrito.push({ ...pizzaSeleccionada, cantidad: 1 });
    }

    guardarEnStorage("carrito", carrito);
    actualizarContador();
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        console.log(`✗ "${item.nombre}" eliminado del carrito`);
        carrito = carrito.filter(i => i.id !== id);
    }

    guardarEnStorage("carrito", carrito);
    actualizarContador();
}

// Actualizamos el contador apenas carga la página
actualizarContador();

// ============================================================
// 5. EVENTOS DE NAVEGACIÓN Y CLIC EN CARTAS
// ============================================================
const btnCarrito = document.getElementById("btnCarrito");
if (btnCarrito) {
    btnCarrito.addEventListener("click", () => {
        window.location.href = "carro.html";
    });
}
    
if (cartas_pizzas) {
    cartas_pizzas.addEventListener("click", (e) => {
        const tarjeta = e.target.closest(".pizzas");
        if (!tarjeta) return;

        const pizzaId = parseInt(tarjeta.dataset.id);
        const spanCantidad = tarjeta.querySelector(".cantidad");
        let cantidadActual = parseInt(spanCantidad.textContent);

        // 1. Botón sumar (+)
        if (e.target.classList.contains("btn-agregar")) {
            spanCantidad.textContent = cantidadActual + 1;
            agregarAlCarrito(pizzaId);
        }

        // 2. Botón restar (-)
        if (e.target.classList.contains("btn-restar")) {
            if (cantidadActual > 0) {
                spanCantidad.textContent = cantidadActual - 1;
                cambiarCantidad(pizzaId, -1);
            }
        }
    });
}