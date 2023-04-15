import { IProveedores } from "@dao/models/Proveedores/IProveedores";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Proveedores {
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevoProveedores: IProveedores) {
    const date = new Date();
    const nuevo: IProveedores = {
      ...nuevoProveedores,
      created: date,
      updated: date
    }
    return this.dao.create(nuevo);
  }

  update(id: string, updateProveedores: IProveedores) {
    const updateObject = { ...updateProveedores, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}