const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");

// APP USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const viewsFolder = path.join(__dirname, "views");

// Inicializando motor de plantillas
app.engine("handlebars", handlebars.engine());
console.log(viewsFolder);

// Ejecutar el servidor
app.listen(8080, (req, res) => {
	console.log("Servidor desplegado en el puerto 8080");
});

// Donde tengo las vistas de mi proyecto
app.set("views", viewsFolder);

// Que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");

// Lista de productos
let PRODUCTOS = [
	{
		name: "MACETA 01",
		price: 30999,
		thumbnail: "https://raw.githubusercontent.com/KernAgustin/rococoproyecto/master/img/MACETA_TIPO_02.webp",
		id: 1,
	},
	{
		name: "MACETA 02",
		price: 22999,
		thumbnail: "https://raw.githubusercontent.com/KernAgustin/rococoproyecto/master/img/MACETA_TIPO_01.webp",
		id: 2,
	},
	{
		name: "MACETA 03",
		price: 13999,
		thumbnail: "https://raw.githubusercontent.com/KernAgustin/rococoproyecto/master/img/MACETA_TIPO_03.webp",
		id: 3,
	},
];

app.get("/", (_req, res) => {
	console.log("Req recibida");
	res.render("home"); // Primer parametro: Nombre de la vista a mostrart
});

app.get("/productos", (req, res) => {
	res.render("productos", {
		productos: PRODUCTOS,
	});
});

app.post("/productos", async (req, res) => {
	const item = await req.body;
	const yaIngresado = PRODUCTOS.some((el) => el.name === item.name);
	if (yaIngresado) {
		console.log("Ya existe");
	} else {
		PRODUCTOS.push({
			...item,
			price: parseInt(item.price),
			id:
				PRODUCTOS.length > 0
					? PRODUCTOS[PRODUCTOS.length - 1].id + 1
					: PRODUCTOS.length + 1,
		});
		console.log(PRODUCTOS);
		res.redirect("/");
	}
});
