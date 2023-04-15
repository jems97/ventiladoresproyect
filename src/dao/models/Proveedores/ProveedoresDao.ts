import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IProveedores } from "./IProveedores";

export class ProveedoresDao extends MongoDAOBase<IProveedores>{
  constructor(conexion: IDBConnection){
      super("proveedores", conexion);
  }
}