import { IVentilador } from "@dao/models/Ventiladores/IVentiladores";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Ventiladores {
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
  add(nuevoVentilador: IVentilador) {
    const date = new Date();
    const nuevo: IVentilador = {
      ...nuevoVentilador,
      created: date,
      updated: date
    }
    return this.dao.create(nuevo);
  }

  update(id: string, updateVentilador: IVentilador) {
    const updateObject = { ...updateVentilador, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}
