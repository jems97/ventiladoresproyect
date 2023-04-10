import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IVentilador } from "./IVentiladores";

export class VentiladoresDao extends MongoDAOBase<IVentilador>{
  constructor(conexion: IDBConnection){
      super("ventiladores", conexion);
  }
}