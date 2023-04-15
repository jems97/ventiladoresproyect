import express from 'express';
const router = express.Router();
import { ProveedoresDao } from '@dao/models/Proveedores/ProveedoresDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IProveedores } from '@dao/models/Proveedores/IProveedores';
import { Proveedores }from '@libs/Proveedores/Proveedores';
const proveedoresDao = new ProveedoresDao(MongoDBConn);
let proveedoresModel:Proveedores;
proveedoresDao.init().then(()=>{
  proveedoresModel = new Proveedores(proveedoresDao);
});

//registrar los endpoint en router
//http://localhost:3001/ventiladores

router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "proveedores/all"},
    "getById": {"method":"get", "url": "proveedores/byid/:id"},
    "new": {"method":"post", "url": "proveedores/new"},
    "update": {"method":"put", "url": "proveedores/upd/:id"},
    "delete": {"method":"delete", "url": "proveedores/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await proveedoresModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const proveedor = await proveedoresModel.getById(codigo);
  if(proveedor){
    return res.status(200).json(proveedor);
  }
  return res.status(404).json({"error":"No se encontró el Proveedor"});
});

router.post('/new', async (req, res) => {
  console.log("Proveedores /new request body:", req.body);
  const {
    nombre ="Ernesto",
    identidad = "12345678",
    ciudad = "1178.35"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newProveedor: IProveedores = {
    nombre,
    identidad,
    ciudad
  };
  if (await proveedoresModel.add(newProveedor)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar un proveedor nuevo"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----NotRecieved------",
    identidad="----NotRecieved------",
    ciudad = "----NotRecieved------"
  } = req.body;

  if (
    nombre === "----NotRecieved------"
    || identidad === "----NotRecieved------"
    || ciudad === "----NotRecieved------"
  ) {
    return res.status(403).json({"error":"Debe venir el nombre proveedor , la identidad  y ciudad correctos"});
  }
  const updateProveedores : IProveedores = {
    nombre,
    identidad,
    ciudad
  };

  if (await proveedoresModel.update(id, updateProveedores)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Proveedor"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await proveedoresModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar el Proveedor"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;
