// Definición de la clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Creación de una lista de productos
const productos = [
    new Producto("guitarra", 999.99),
    new Producto("piano", 1999.99),
    new Producto("bateria", 2999.99),
    new Producto("trompeta", 1499.99),
    new Producto("tambor", 1799.99)
];

// IVA para aplicar al pago con tarjeta
const IVA = 1.21;

// Carrito de compras donde se almacenarán los productos seleccionados
const carrito = [];

// Función para mostrar los productos y sus precios
function mostrarProductos() {
    return productos.map((producto, index) => ` ${index + 1}. Nombre: ${producto.nombre} - Precio: $${producto.precio}\n`).join("");
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto, cantidad) {
    carrito.push({ producto, cantidad });
}

// Función para calcular el precio final, teniendo en cuenta el método de pago
function calcularPrecioFinal(carrito, metodoPago) {
    let precioFinal = carrito.reduce((total, item) => total + Math.ceil(item.producto.precio * item.cantidad), 0);

    if (metodoPago === "tarjeta") {
        precioFinal *= IVA;
        alert("Se agrega recargo del 21% por metodo de pago")
    }

    return precioFinal;
}

// Función para saludar al usuario
const saludo = () => {
    let nombre = prompt("Ingrese su nombre: ");
    alert(`Bienvenido ${nombre}`);
}

// Comienzo de la compra
function realizarCompra() {
    // Saludo al usuario
    saludo();

    // Mensaje de bienvenida y presentación de productos
    alert("Bienvenido a la tienda de instrumentos. Comencemos con su compra. \nA continuación nuestros productos:");

    let continuar = true;

    while (continuar) {
        // Muestra los productos disponibles
        alert(mostrarProductos());

        let cantidad = parseInt(prompt("Ingrese la cantidad de instrumentos a elegir. Ingrese '0' para salir"));

        if (isNaN(cantidad)) {
            alert("Entrada no válida. Debe ingresar un número.");
        } else if (cantidad <= 0) {
            continuar = false;
            alert("Puede comprar en otra ocasión.");
        } else {
            let instrumento = prompt("Ingrese el nombre del instrumento que desea comprar (guitarra, piano, batería, trompeta, tambor):");

            const productoSeleccionado = productos.find((producto) => producto.nombre.toLowerCase() === instrumento.toLowerCase());

            if (productoSeleccionado) {
                agregarAlCarrito(productoSeleccionado, cantidad);
                alert(`Ha agregado ${cantidad} ${instrumento}(s) al carrito.`);

                let respuesta;
                // Pedir la respuesta hasta que se ingrese una válida
                do {
                    respuesta = prompt("¿Desea comprar algo más? (Sí o No):").toLowerCase();
                    if (respuesta !== "si" && respuesta !== "sí" && respuesta !== "no") {
                        alert("Respuesta no válida. Por favor, ingrese 'Sí' o 'No'.");
                    }
                } while (respuesta !== "si" && respuesta !== "sí" && respuesta !== "no");
                if (respuesta !== "si" && respuesta !== "sí") {
                    continuar = false;
                }

            } else {
                alert("Instrumento no válido.");
            }
        }
    }

    if (carrito.length === 0) {
        alert("No se ha agregado ningún producto al carrito. Hasta luego.");
    } else {
        let metodoPago;
        // Pedir el método de pago hasta que se ingrese uno válido
        do {
            metodoPago = prompt("Ingrese el método de pago (Efectivo, Tarjeta):").toLowerCase();
            if (metodoPago !== "efectivo" && metodoPago !== "tarjeta") {
                alert("Método de pago no válido. Por favor, ingrese 'Efectivo' o 'Tarjeta'.");
            }
        } while (metodoPago !== "efectivo" && metodoPago !== "tarjeta");
        let precioFinal = calcularPrecioFinal(carrito, metodoPago);

        // Ordena los productos en el carrito por precio
        carrito.sort((a, b) => a.producto.precio - b.producto.precio);

        // Muestra los productos en el carrito y el precio total a pagar
        const productosEnCarrito = carrito.map((item) => `${item.cantidad} ${item.producto.nombre}(s) - Precio unitario: $${item.producto.precio} - Subtotal: $${item.producto.precio * item.cantidad}`);
        alert(`Productos en el carrito:\n${productosEnCarrito.join('\n')}`);
        alert(`El precio total a pagar es: $${precioFinal}. Gracias por su compra.`);
    }
}

// Inicia el proceso de compra llamando a la función realizarCompra
realizarCompra();