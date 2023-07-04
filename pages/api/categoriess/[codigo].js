import CategoryModel from "@/models/categoryModel";
import { converToCode } from "@/utils/transformString";
import moment from "moment";

export default async function singleHandler(req, res) {
  const model = new CategoryModel();

  if (req.method === "GET") {
    const { codigo } = req.query;

    const category = await model.getCategoryByCode(codigo);
    const subcategories = await model.getSubCategories(category.id_categoria);

    if (!category) {
      return res.status(404).json(`La categoria ${codigo} no existe`);
    }

    res.status(200).json({
      ...category,
      subcategories: subcategories,
    });
  }

  if (req.method === "PUT") {
    const { codigo } = req.query;
    const {
      id_categoria,
      nombre,
      descripcion,
      subcategorias,
      newSubcategorias,
      is_active,
    } = req.body;
    const error = {
      nombre: "",
      descripcion: "",
      subcategorias: "",
    };

    if (nombre != req.body.nombre) {
      const isCategoryExists = await model.isCategoryExists(
        req.body.nombre.toLowerCase()
      );
      if (isCategoryExists) {
        error.nombre = "La categoria ya existe";
      }
    }

    //Validacion
    if (!req.body.nombre || req.body.nombre.trim().length < 2) {
      error.nombre = "El nombre es requerido";
    }

    if (!descripcion || descripcion.trim().length < 2) {
      error.descripcion = "La descripcion es requerida";
    }

    if (!subcategorias || subcategorias.length < 1) {
      error.subcategorias = "Debe seleccionar al menos una subcategoria";
    }

    if (error.nombre !== "" || error.descripcion !== "") {
      return res.status(422).json({
        typeError: "validation",
        messages: error,
      });
    }

    moment.locale("es-sv");
    try {
      const deleteSub = subcategorias.filter((item) => {
        return !newSubcategorias.includes(item.nombre);
      });

      const subcategoriasNombre = subcategorias.map((item) => {
        return item.nombre;
      });

      const newSub = newSubcategorias.filter((item) => {
        return !subcategoriasNombre.includes(item);
      });

      if (deleteSub.length > 0) {
        await model.deleteSubCategories(deleteSub);
      }

      if (newSub.length > 0) {
        const items = newSub.map((item) => {
          return {
            codigo: converToCode(item.trim().toLowerCase()),
            nombre: item.trim().toLowerCase(),
          };
        });

        await model.createSubCategories({
          id_categoria: id_categoria,
          items: items,
          created_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
          updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
        });
      }

      await model.updateCategory({
        id_categoria: id_categoria,
        codigo: converToCode(nombre.toLowerCase()),
        nombre: nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        is_active: is_active,
        updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
      });

      return res.status(201).json("ok");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
