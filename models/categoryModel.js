import { pool } from "@/config/db";

export default class CategoryModel {
  constructor() {
    this.db = pool;
  }

  async getAllCategories() {
    const query =
      "SELECT id_categoria, codigo, nombre, descripcion, is_active FROM tbl_categorias ORDER BY id_categoria DESC";

    const categories = await this.db.query(query);

    return categories[0];
  }

  async isCategoryExists(nombre) {
    const query = "SELECT * FROM tbl_categorias WHERE nombre = ?";
    const result = await this.db.query(query, [nombre]);
    return result[0].length > 0;
  }

  async getCategoryById(id) {
    const query = "SELECT * FROM tbl_categorias WHERE id_categoria = ?";
    const result = await this.db.query(query, [id]);
    return result[0][0];
  }

  async getCategoryByCode(codigo) {
    const query = "SELECT * FROM tbl_categorias WHERE codigo = ? LIMIT 1";
    const result = await this.db.query(query, [codigo]);
    return result[0][0];
  }

  async filterCategories(filter) {
    const query =
      "SELECT id_categoria, nombre, descripcion, is_active FROM tbl_categorias WHERE nombre LIKE ? OR descripcion LIKE ? ORDER BY id_categoria ASC";
    const result = await this.db.query(query, [
      "%" + filter + "%",
      "%" + filter + "%",
    ]);
    return result[0];
  }

  async createCategory(category) {
    const query = "INSERT INTO tbl_categorias SET ?";
    const result = await this.db.query(query, [category]);

    if (result[0].affectedRows > 0) {
      return result[0].insertId;
    }

    return false;
  }

  async updateCategory(category) {
    const query = "UPDATE tbl_categorias SET nombre = ?, codigo = ?, descripcion = ?, is_active = ? WHERE id_categoria = ?";

    try {
      const result = await this.db.query(query, [
        category.nombre,
        category.codigo,
        category.descripcion,
        category.is_active,
        category.id_categoria,
      ]);
      return result[0].affectedRows;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // =================================================
  // Subcategories
  // =================================================

  async createSubCategories(subcategory) {
    let query =
      "INSERT INTO tbl_categoria_subcategorias (id_categoria, codigo, nombre, created_at, updated_at) VALUES ?";

    const values = subcategory.items.map((item) => {
      return [
        subcategory.id_categoria,
        item.codigo,
        item.nombre,
        subcategory.created_at,
        subcategory.updated_at,
      ];
    });

    try {
      const result = await this.db.query(query, [values]);
      return result[0].affectedRows > 0;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async getSubCategories(id_categoria) {
    const query =
      "SELECT id_subcategoria, id_categoria, codigo, nombre FROM tbl_categoria_subcategorias WHERE id_categoria = ? ORDER BY id_subcategoria DESC";
    const result = await this.db.query(query, [id_categoria]);
    return result[0];
  }

  async deleteSubCategories(categorias) {
    const query =
      "DELETE FROM tbl_categoria_subcategorias WHERE id_subcategoria IN ( ? )";

    const values = categorias.map((categoria) => {
      return categoria.id_subcategoria;
    });

    try {
      const result = await this.db.query({
        sql: query,
        values: [values],
      });

      return result[0].affectedRows;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
