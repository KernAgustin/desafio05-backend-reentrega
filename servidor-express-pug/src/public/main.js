document.addEventListener("DOMContentLoaded", console.log("Funcionando"));
const d = document;
const form = d.getElementById("form");
console.log(form);
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const nombre = d.getElementById("nombreProducto").value;
	const precio = d.getElementById("precioProducto").value;
	const thumbnail = d.getElementById("thumbnailProducto").value;

	console.log("Form enviado");
	if (isNaN(precio) || nombre.length < 5 || thumbnail.length < 6) {
		alert("Los datos ingresados no son validos");
	} else {
		fetch("/productos", {
			method: "POST",
			body: JSON.stringify({
				name: nombre,
				price: precio,
				thumbnail: thumbnail,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
	}
});
