const fs = require("fs");

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}

	productos = [];

	escribirProductos() {
		fs.writeFileSync(this.ruta, JSON.stringify(this.productos, null, 2));
	}

	async leerArchivo() {
		try {
			const archivo = await fs.promises.readFile(this.ruta, "utf8");

			return JSON.parse(archivo);
		} catch (error) {
			console.log("El archivo no existe pero sera creado!");
		}
	}

	async save(object) {
		try {
			const archivo = await this.leerArchivo();
			if (archivo != undefined) {
				this.productos = archivo;
				const productId =
					this.productos[this.productos.length - 1].id + 1 ||
					this.productos.length + 1;
				this.productos.push({ ...object, id: productId });
				this.escribirProductos();
				console.log("Productos agregados");
				return console.log(`El id de ${object?.name} es ${productId} `);
			} else {
				const productId = this.productos.length + 1;
				this.productos.push({ ...object, id: productId });
				this.escribirProductos();
				console.log("Productos agregados");
				return console.log(`El id de ${object?.name} es ${productId} `);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async getById(id) {
		try {
			const data = await fs.promises.readFile(this.ruta, "utf-8");

			const res = await JSON.parse(data);

			const item = await res.find((el) => el.id === id);

			console.log(item);
		} catch (error) {
			console.log(error);
		}
	}

	async getAll() {
		try {
			const data = await fs.promises.readFile(this.ruta, "utf-8");
			const res = await JSON.parse(data);
			this.productos = await res;

			return this.productos;
		} catch (error) {
			console.log(error);
		}
	}

	async deleteById(id) {
		try {
			const data = await fs.promises.readFile(this.ruta, "utf-8");

			const res = await JSON.parse(data);

			this.productos = await res.filter((el) => el.id != id);

			await fs.promises.writeFile(
				this.ruta,

				JSON.stringify(this.productos, null, 2)
			);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteAll() {
		this.productos = [];
		fs.unlink(this.ruta, (error) => {
			if (error) {
				console.log("Error: " + error);
			} else {
				console.log("Productos y archivos borrados!");
			}
		});
	}
}

module.exports = Contenedor;
