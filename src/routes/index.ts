import express from 'express';
const router  = express.Router();
import {validateKeyMiddleWare} from './middlewares/apikeyValidator';
import {validateJwtMiddleWare} from './middlewares/jwtValidator';
import securityRoutes from './security/security';
import ventiladoresRouter from './ventiladores/ventiladores';
import proveedoresRouter from './proveedores/proveedores';

router.get('/', (_req, res) => {
  res.json({msg: 'Onlyfans ON the LINE'});
});

router.use('/security', validateKeyMiddleWare, securityRoutes);

router.use('/ventiladores', validateKeyMiddleWare, validateJwtMiddleWare, ventiladoresRouter);

router.use('/proveedores', validateKeyMiddleWare, validateJwtMiddleWare, proveedoresRouter);

export default router;
