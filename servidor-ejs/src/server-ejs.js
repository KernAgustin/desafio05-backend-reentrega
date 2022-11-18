const express = require("express");
const app = express();
// const pug = require("pug");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const viewsFolder = path.join(__dirname, "views");

app.listen(8080, () => {
	console.log("Servidor escuchando en el puerto 8080");
});

//Configurando el motor de plantillas (No se necesita app.engine)
app.set("views", viewsFolder); // Donde están las vistas
app.set("view engine", "ejs"); // Que motor de vistas uso

/* Array de productos */
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

//Configuración de rutas
app.get("/", (_req, res) => {
	console.log("req recibida");
	res.render("welcome");
});

app.post("/productos", async (req, res) => {
	const item = await req.body;
	const yaIngresado = PRODUCTOS.some((el) => el.name === item.name);
	if (yaIngresado) {
		console.log("Ya ingresado")
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
	}
	res.redirect("/")
});

app.get("/productos", (_req, res) => {
	res.render("productos", {productos: PRODUCTOS });
});
