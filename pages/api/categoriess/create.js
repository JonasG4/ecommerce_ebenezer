import categoryModel from "@/models/categoryModel";
import { converToCode } from "@/utils/transformString";
import moment from "moment/moment";

export default async function CreateHandler(req, res) {
  const model = new categoryModel();

  if (req.method === "POST") {
    const { nombre, descripcion, is_active, subcategorias } = req.body;

    const error = {
      nombre: "",
      descripcion: "",
    };

    const isCategoryExists = await model.isCategoryExists(nombre.toLowerCase());

    if (isCategoryExists) {
      error.nombre = "La categoria ya existe";
    }

    //Validacion
    if (!nombre || nombre.trim().length < 2) {
      error.nombre = "El nombre es requerido";
    }

    if (!descripcion || descripcion.trim().length < 2) {
      error.descripcion = "La descripcion es requerida";
    }

    if (error.nombre !== "" || error.descripcion !== "") {
      return res.status(422).json({
        typeError: "validation",
        messages: error,
      });
    }

    const codigoCategoria = converToCode(nombre.trim().toLowerCase());
    const items = subcategorias.map((item) => {
      return {
        codigo: converToCode(item.trim().toLowerCase()),
        nombre: item.trim().toLowerCase(),
      };
    });

    moment.locale("es-sv");

    try {
      const categoryId = await model.createCategory({
        codigo: codigoCategoria,
        nombre: nombre.trim().toLowerCase(),
        descripcion: descripcion.trim().toLowerCase(),
        is_active: is_active,
        created_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
        updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
      });

      if (!categoryId) {
        throw new Error("Error al crear la categoria");
      }

      const wasCreated = await model.createSubCategories({
        id_categoria: categoryId,
        items: items,
        created_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
        updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
      });

      if (!wasCreated) {
        throw new Error("Error al crear la categoria");
      }

      return res.status(201).json("Categoria creada exitosamente");
    } catch (error) {
      return res.status(500).json({
        typeError: "server",
        message: "Error al crear la categoria",
      });
    }
  }
}
