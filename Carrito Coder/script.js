const productosLista = document.getElementById("productos");
const totalPagar = document.getElementById("total");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

fetch("productos.json")
  .then(response => response.json())
  .then(productos => {
    productos.forEach(producto => {
      const item = document.createElement("li");
      item.innerHTML = `
        ${producto.nombre} - $${producto.precio}
        <button class="agregar">+</button>
        <button class="quitar">-</button>
      `;
      
      const agregarProd = item.querySelector(".agregar");
      agregarProd.addEventListener("click", () => {
        carrito.push(producto.nombre);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        total += producto.precio;
        totalPagar.innerHTML = `Total a pagar: $${total}`;
      });

      const quitarProd = item.querySelector(".quitar");
      quitarProd.addEventListener("click", () => {
        const index = carrito.indexOf(producto.nombre);
        if (index !== -1) {
          carrito.splice(index, 1);
          localStorage.setItem("carrito", JSON.stringify(carrito));
          if (total > 0) {
            total -= producto.precio;
            totalPagar.innerHTML = `Total a pagar: $${total}`;
          }
        }
      });
      productosLista.appendChild(item);
    });
  });
