class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const productos = [
    new Producto("guitarra", 999.99),
    new Producto("piano", 1999.99),
    new Producto("bateria", 2999.99),
    new Producto("trompeta", 1499.99),
    new Producto("tambor", 1799.99)
];

const IVA = 1.21

const carrito = [];

function mostrarProductos() {
    return productos.map((producto, index) => `${index + 1}. Nombre: ${producto.nombre} - Precio: $${producto.precio}`).join("///");
}

function agregarAlCarrito(producto, cantidad) {
    carrito.push({ producto, cantidad });
}

function calcularPrecioFinal(carrito, metodoPago) {
    let precioFinal = carrito.reduce((total, item) => total + Math.ceil(item.producto.precio * item.cantidad), 0);
    
    if (metodoPago === "tarjeta") {
        precioFinal *= IVA;
    }

    return precioFinal;
}

function realizarCompra() {
    alert("Bienvenido a la tienda de instrumentos. Comencemos con su compra. \nA continuacion nuestros productos:");
    let continuar = true;

    while (continuar) {
        alert(mostrarProductos());

        let cantidad = parseInt(prompt("Ingrese cantidad de instrumentos a elección. Ingrese '0' para salir"));

        if (isNaN(cantidad)) {
            alert("Entrada no válida. Debe ingresar un número.");
        } else if (cantidad <= 0) {
            continuar = false;
            alert("Puedes comprar en otra ocasión.");
        } else {
            let instrumento = prompt("Ingrese el instrumento que desea comprar (guitarra, piano, bateria, trompeta, tambor):");

            const productoSeleccionado = productos.find((producto) => producto.nombre.toLowerCase() === instrumento.toLowerCase());

            if (productoSeleccionado) {
                agregarAlCarrito(productoSeleccionado, cantidad);
                alert(`Has agregado ${cantidad} ${instrumento}(s) al carrito.`);

                let respuesta = prompt("¿Desea comprar algo más? (Sí o No):").toLowerCase();
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
        let metodoPago = prompt("Ingrese el método de pago (Efectivo, Tarjeta):").toLowerCase();
        let precioFinal = calcularPrecioFinal(carrito, metodoPago);

        carrito.sort((a, b) => a.producto.precio - b.producto.precio);

        const productosEnCarrito = carrito.map((item) => `${item.cantidad} ${item.producto.nombre}(s) - Precio unitario: $${item.producto.precio} - Subtotal: $${item.producto.precio * item.cantidad}`);
        alert(`Productos en el carrito:\n${productosEnCarrito.join('\n')}`);

        alert(`El precio total a pagar es: $${precioFinal}. Gracias por su compra. Hasta luego!`);
    }
}

realizarCompra();
