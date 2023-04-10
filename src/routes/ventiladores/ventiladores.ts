import express from 'express';
const router = express.Router();
import { VentiladoresDao } from '@dao/models/Ventiladores/VentiladoresDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IVentilador } from '@dao/models/Ventiladores/IVentiladores';
import { Ventiladores } from '@libs/Ventiladores/Ventiladores';
const ventiladoresDao = new VentiladoresDao(MongoDBConn);
let ventiladoresModel:Ventiladores;
ventiladoresDao.init().then(()=>{
  ventiladoresModel = new Ventiladores(ventiladoresDao);
});

//registrar los endpoint en router
//http://localhost:3001/ventiladores

router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "ventiladores/all"},
    "getById": {"method":"get", "url": "ventiladores/byid/:id"},
    "new": {"method":"post", "url": "ventiladores/new"},
    "update": {"method":"put", "url": "ventiladores/upd/:id"},
    "delete": {"method":"delete", "url": "ventiladores/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await ventiladoresModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const ventilador = await ventiladoresModel.getById(codigo);
  if(ventilador){
    return res.status(200).json(ventilador);
  }
  return res.status(404).json({"error":"No se encontró el Ventilador"});
});

router.post('/new', async (req, res) => {
  console.log("Ventiladores /new request body:", req.body);
  const {
    marca ="Amazon Basics",
    modelo = "FS40-10BR",
    rpm ="300",
    precio = "1178.35"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newVentilador: IVentilador = {
    marca,
    modelo,
    rpm,
    precio
  };
  if (await ventiladoresModel.add(newVentilador)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar un ventilador nuevo"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    marca="----NotRecieved------",
    modelo="----NotRecieved------",
    rpm = "----NotRecieved------",
    precio = "",
  } = req.body;

  if (
    modelo === "----NotRecieved------"
    || marca === "----NotRecieved------"
    || rpm === "----NotRecieved------"
  ) {
    return res.status(403).json({"error":"Debe venir el marca , modelo y rpm correctos"});
  }
  const UpdateVentilador : IVentilador = {
    marca,
    modelo,
    rpm,
    precio
  };

  if (await ventiladoresModel.update(id, UpdateVentilador)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Ventilador"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await ventiladoresModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar el Ventilador"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;
