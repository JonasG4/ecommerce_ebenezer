import { pool } from "../config/db";

export default class userModel {
  constructor() {
    this.db = pool;
  }

  async findOne(email) {
    const query =
      "SELECT email, password, id_role, is_active from tbl_usuarios WHERE email = ? LIMIT 1";
    const result = await this.db.query(query, [email]);
    const user = result[0][0];

    if (!user) {
      return false;
    }

    return user;
  }

  async createUser(user) {
    const query = "INSERT INTO tbl_usuarios SET ?";

    if (await this.db.query(query, [user])) {
      return true;
    } else {
      return false;
    }
  }

  async getAllUsers() {
    const query =
      "SELECT id_usuario, usuarios.nombre, apellido, email, telefono, roles.nombre AS role, usuarios.id_role, is_active, is_google, is_facebook, updated_at FROM tbl_usuarios usuarios JOIN tbl_roles roles ON usuarios.id_role = roles.id_role ORDER BY id_usuario DESC";
    const users = await this.db.query(query);
    return users[0];
  }

  async getAllRoles() {
    const query = "SELECT id_role, nombre FROM tbl_roles";

    const roles = await this.db.query(query);
    return roles[0];
  }

  async getUserById(id) {
    const query =
      "SELECT id_usuario, usuarios.nombre, roles.nombre as role, usuarios.id_role, imagen, apellido, email, telefono, is_active, is_google, is_facebook, created_at, updated_at FROM tbl_usuarios usuarios JOIN tbl_roles roles ON usuarios.id_role = roles.id_role WHERE id_usuario = ?";
    const user = await this.db.query(query, [id]);

    if (!user) {
      return false;
    }
    return user[0][0];
  }

  async filterUsers(filter) {
    const query =
      "SELECT id_usuario, nombre, apellido, email, telefono, is_active, created_at, updated_at FROM tbl_usuarios WHERE nombre LIKE ? OR apellido LIKE ? OR email LIKE ? ORDER BY id_usuario ASC";
    const result = await this.db.query(query, [
      "%" + filter + "%",
      "%" + filter + "%",
      "%" + filter + "%",
    ]);
    return result[0];
  }

  async updateUser(user) {
    const query =
      "UPDATE tbl_usuarios SET nombre=?, apellido=?, email=?, telefono=?, is_active=?, updated_at=?, id_role=? WHERE id_usuario=?";
    const response = await this.db.query(query, [
      user.nombre,
      user.apellido,
      user.email,
      user.telefono,
      user.is_active,
      user.updated_at,
      user.id_role,
      user.id_usuario,
    ]);

    if (response[0].affectedRows > 0) {
      return true;
    }
    return false;
  }

  async updatePassword(data) {
    const query =
      "UPDATE tbl_usuarios SET password=?, updated_at=? WHERE id_usuario=?";
    const response = await this.db.query(query, [
      data.password,
      data.updated_at,
      data.id_usuario,
    ]);

    if (response[0].affectedRows > 0) {
      return true;
    }

    return false;
  }

  async isEmailExist(email) {
    const query = "SELECT id_usuario FROM tbl_usuarios WHERE email=? LIMIT 1";

    const result = await this.db.query(query, email);

    if (result[0].length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
