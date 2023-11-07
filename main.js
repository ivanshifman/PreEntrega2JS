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

alert("Bienvenido a la tienda de instrumentos. Comencemos con su compra. \n A continuacion nuestros productos:");

let continuar = true;

while (continuar) {
    let mostrarProductos = productos.map((producto, index) => `${index + 1}. Nombre: ${producto.nombre} - Precio: $${producto.precio}`);
    alert(mostrarProductos.join("///"));

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
            carrito.push({ producto: productoSeleccionado, cantidad });
            alert(`Has agregado ${cantidad} ${instrumento}(s) al carrito.`);

            // Preguntar si desea comprar algo más
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
    carrito.sort((a, b) => a.producto.precio - b.producto.precio);

    let precioFinal = carrito.reduce((total, item) => total + Math.ceil(item.producto.precio * item.cantidad), 0);

    let metodoPago = prompt("Ingrese el método de pago (Efectivo, Tarjeta):").toLowerCase();

    if (metodoPago == "tarjeta") {
        precioFinal *= IVA
        alert("Se agrega 21% de costo por IVA")
    }

    const productosEnCarrito = carrito.map((item) => `${item.cantidad} ${item.producto.nombre}(s) - Precio unitario: $${item.producto.precio} - Subtotal: $${item.producto.precio * item.cantidad}`);
    alert(`Productos en el carrito:\n${productosEnCarrito.join('\n')}`);

    alert(`El precio total a pagar es: $${precioFinal}. Gracias por su compra. Hasta luego!`);
}
