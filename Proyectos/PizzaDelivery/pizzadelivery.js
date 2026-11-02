// DOM: Document Object Model, o “Modelo de Objetos del Documento”.
// Importarciones

import { pizzas } from "./modulos/datos.js";
import { leerDeStorage, guardarEnStorage } from "./modulos/funciones.js";

// titulo del logo con dom
const tituloLogo = document.getElementById("titulo_logo");
if (tituloLogo) {
  tituloLogo.textContent = "PizzaDelivery";
  console.log(`Titulo de la pagina: ${tituloLogo.textContent}`);
}

//agregar las cartas de pizzas al html con dom

const cartasPizzas = document.getElementById("cartas_pz");
// if (cartasPizzas) Verifica que el elemento exista antes de trabajar con él.
if (cartasPizzas) {
  // cartasPizzas.innerHTML modifica el contenido HTML interno del contenedor.
  // pizzas.map() Recorre el arreglo pizzas.
  // Cada elemento del arreglo se guarda temporalmente en la variable pizza(pizza =>).
  cartasPizzas.innerHTML = pizzas.map(pizza => `
    <article class="pizzas" data-id="${pizza.id}">
      <img src="${pizza.imagen}" alt="${pizza.nombre}">
      <h2 class="nombre">${pizza.nombre}</h2>
      <p>Ingredientes:</p>
      <p class="pizza_ingredientes">${pizza.ingredientes}</p>
      <div class="pizza_precio"><h2>Precio: $${pizza.precio} c/u</h2></div>
      <div class="controles-cantidad">
        <button class="btn-restar">-</button>
        <span class="cantidad">0</span>
        <button class="btn-agregar">+</button>
      </div>
    </article>
  `).join("");
  // El método join("")
  // concatena todas las tarjetas generadas para construir un único bloque HTML que se insertará en la página.
}

//CARRITO CON localStorage

// Estado del carrito: se recupera al cargar la página.
let carrito = leerDeStorage("carrito", []);


//Operaciones del carrito

function agregarAlCarrito(id) {
  const pizzaSeleccionada = pizzas.find(pizza => pizza.id === id);
  // pizzas.find() busca la pizza con el id correspondiente en el arreglo pizzas y la almacena en pizzaSeleccionada.
  if (!pizzaSeleccionada) return;
  // Si no se encuentra la pizza, la función termina sin hacer nada.
  const itemExistente = carrito.find(item => item.id === id);
  // itemExistente busca si la pizza ya está en el carrito.
  if (itemExistente) {
    // si la pizza ya está en el carrito, se incrementa su cantidad.
    itemExistente.cantidad++;
    console.log(`Cantidad de "${itemExistente.nombre}" aumentada a ${itemExistente.cantidad}`);
  } else {
    // si la pizza no está en el carrito, se agrega(push()) con cantidad 1.
    carrito.push({ ...pizzaSeleccionada, cantidad: 1 });
    console.log(`"${pizzaSeleccionada.nombre}" agregado al carrito`);
    // El operador ... copia todas las propiedades del objeto pizzaSeleccionada en un nuevo objeto.
    // Luego se agrega la propiedad cantidad con valor 1 antes de guardar el objeto en el carrito.
  }
  guardarEnStorage("carrito", carrito);
  // guardarEnStorage() guarda el estado actualizado del carrito en localStorage.
  actualizarVistaCarrito();
  // actualizarVistaCarrito() actualiza la interfaz de usuario para reflejar los cambios en el carrito.
}

function eliminarDelCarrito(id) {
  const item = carrito.find(producto => producto.id === id);
  // carrito.find() busca el item con el id correspondiente en el carrito y lo almacena en item.
  if (!item) return;
  // Si no se encuentra el item, la función termina sin hacer nada.

  console.log(`"${item.nombre}" eliminado del carrito`);
  // item.nombre devuelve el nombre de la pizza encontrada en el carrito
  carrito = carrito.filter(producto => producto.id !== id);
  // carrito.filter() crea un nuevo array que excluye el item con el id especificado.

  guardarEnStorage("carrito", carrito);
  // guardarEnStorage() guarda el estado actualizado del carrito en localStorage.
  actualizarVistaCarrito();
  // actualizarVistaCarrito() actualiza la interfaz de usuario para reflejar los cambios en el carrito.
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(producto => producto.id === id);
  if (!item) return;

  item.cantidad += delta;
  // delta puede ser positivo (para aumentar) o negativo (para disminuir)
  // la cantidad del item en el carrito.

  if (item.cantidad <= 0) {
    // si es menor o igual a cero, se elimina del carrito
    eliminarDelCarrito(id);
    return;
  }

  guardarEnStorage("carrito", carrito);
  actualizarVistaCarrito();
}

function vaciarCarrito() {
  carrito = [];
  // se declara carrito como un array vacio
  guardarEnStorage("carrito", carrito);
  actualizarVistaCarrito();
  console.log("Carrito vaciado correctamente");
}


//Cálculos carrito
function calcularSubtotal() {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  // reduce() recorre todos los elementos del carrito y va acumulando un resultado
}

function contarItems() {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}


//Renderizar carrito

function crearItemCarrito(item) {
  const elemento = document.createElement("div");
  // document.createElement("div") crea un nuevo elemento <div> en el DOM
  elemento.classList.add("item-carrito");
  // agrega la clase CSS "item-carrito" al <div> creado, para aplicar estilos

  const nombre = document.createElement("h3");
  nombre.classList.add("item-carrito__nombre");
  nombre.textContent = `🍕 ${item.nombre}`;

  const cantidad = document.createElement("p");
  cantidad.classList.add("item-carrito__cantidad");
  cantidad.textContent = `Cantidad: ${item.cantidad}`;

  const subtotal = document.createElement("p");
  subtotal.classList.add("item-carrito__subtotal");
  subtotal.textContent = `Subtotal: $${item.precio * item.cantidad}`;

  elemento.append(nombre, cantidad, subtotal);
  // Inserta el nombre, la cantidad y el subtotal dentro del <div> principal.
  // append → inserta al final del contenedor
  return elemento;
  // Devuelve el elemento HTML completo para poder agregarlo al documento.
}

function renderizarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  // Obtiene el contenedor donde se mostrarán los productos
  const carritoVacio = document.getElementById("carritoVacio");
  // Obtiene el mensaje que indica que el carrito está vacío
  const spanTotal = document.getElementById("total");
  // Obtiene el elemento donde se mostrará el total del carrito
  if (!listaCarrito) return;
  // Si no se encuentra el contenedor del carrito, la función termina sin hacer nada.

  listaCarrito.querySelectorAll(".item-carrito").forEach(item => item.remove());
  // Busca todos los productos mostrados actualmente y los elimina.
  // Esto asegura que la lista se actualice correctamente cada vez que se renderiza el carrito.

  carrito.forEach(item => {
    listaCarrito.append(crearItemCarrito(item));
    // Crea el HTML de cada producto usando crearItemCarrito() y lo agrega al contenedor.
  });

  if (carritoVacio) {
    carritoVacio.style.display = carrito.length === 0 ? "block" : "none";
    // Si el carrito está vacío, muestra el mensaje; si no, lo oculta.
    // El operador ternario (condición ? valorSiVerdadero : valorSiFalso)
    // se utiliza para decidir el estilo de visualización.
  }
  if (spanTotal) {
    spanTotal.textContent = `$${calcularSubtotal()}`;
    // Actualiza el total del carrito mostrando el resultado de calcularSubtotal().
  }
}

function actualizarContador() {
  const spanContador = document.getElementById("contadorCarrito");
  if (spanContador) {
    // Si el elemento existe, actualiza su contenido con la cantidad total de items en el carrito.
    spanContador.textContent = contarItems();
  }
}

function actualizarCantidadesEnCartas() {
  if (!cartasPizzas) return;

  cartasPizzas.querySelectorAll(".pizzas").forEach(tarjeta => {
    // dataset sirve para acceder a los atributos data-* de un elemento HTML
    const id = Number.parseInt(tarjeta.dataset.id, 10);
    // dataset — acceso directo a los atributos data-*
    // data-id → element.dataset.id
    const item = carrito.find(producto => producto.id === id);
    tarjeta.querySelector(".cantidad").textContent = item ? item.cantidad : 0;
    // Si el item está en el carrito, muestra su cantidad; si no, muestra 0.
  });
  // console.log("Cantidades en cartas actualizadas correctamente");
}

function actualizarVistaCarrito() {
  // mantiene sincronizada toda la interfaz del carrito después de cualquier cambio
  actualizarContador();
  actualizarCantidadesEnCartas();
  renderizarCarrito();
}

actualizarVistaCarrito();

// 4. EVENTOS DEL CARRITO

const botonVaciar = document.getElementById("btnVaciar");
if (botonVaciar) {
  // if evita que el programa genere un error
  botonVaciar.addEventListener("click", vaciarCarrito);
}



const formularioCheckout = document.getElementById("formCheckout");
if (formularioCheckout) {
  formularioCheckout.addEventListener("submit", event => {
    event.preventDefault();
    // Previene que el formulario se envíe de la manera tradicional, lo que recargaría la página.
    if (carrito.length === 0) {
      // Si el carrito está vacío, se muestra un mensaje de alerta y se detiene el proceso de compra.
      alert("El carrito está vacío. Agregá una pizza antes de realizar la compra.");
      return;
    }
     carrito = [];
     // actualizo el carrito a vacio
     actualizarVistaCarrito();
     formularioCheckout.reset();
    //  limpia los campos del formulario después de enviar la compra
    alert("¡Pedido realizado con éxito! Gracias por elegir PizzaDelivery.");
  });
}

// Delegación de eventos para los botones de las cartas.
if (cartasPizzas) {
  cartasPizzas.addEventListener("click", event => {
    const tarjeta = event.target.closest(".pizzas");
    // event.target es el elemento exacto que recibió el clic
    if (!tarjeta) return;
    
    if (tarjeta) {
      console.log("se hizo click en la tarjeta");
    }
    const botonAgregar = event.target.closest(".btn-agregar");
    const botonRestar = event.target.closest(".btn-restar");
    if (!botonAgregar && !botonRestar) return;

    const pizzaId = Number.parseInt(tarjeta.dataset.id, 10);
    if (botonAgregar) {
      agregarAlCarrito(pizzaId);
      console.log(`Botón "+" presionado para la pizza con ID: ${pizzaId}`);
      console.log("Carrito actualizado correctamente");
    } else {
      cambiarCantidad(pizzaId, -1);
      console.log(`Botón "-" presionado para la pizza con ID: ${pizzaId}`);
      console.log("carrito actualizado correctamente");
    }
  });
}
