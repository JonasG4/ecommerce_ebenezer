import { pool } from "@/config/db";

export default class BrandModel {
  constructor() {
    this.db = pool;
  }

  async getAllBrands() {
    const query =
      "SELECT id_marca, codigo, nombre, is_active FROM tbl_marcas ORDER BY id_marca DESC";

    const brandsList = await this.db.query(query);

    return brandsList[0];
  }

  async isBrandExists(nombre) {
    const query = "SELECT * FROM tbl_marcas WHERE nombre = ?";
    const result = await this.db.query(query, [nombre]);
    return result[0].length > 0;
  }

  async getBrandById(id) {
    const query = "SELECT * FROM tbl_marcas WHERE id_marca = ?";
    const result = await this.db.query(query, [id]);
    return result[0][0];
  }

  async createBrand(brand) {
    const query = "INSERT INTO tbl_marcas SET ?";
    const result = await this.db.query(query, [brand]);

    if (result[0].affectedRows > 0) {
      return result[0].insertId;
    }

    return null;
  }
}
