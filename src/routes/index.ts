import express from 'express';
const router  = express.Router();
import {validateKeyMiddleWare} from './middlewares/apikeyValidator';
import {validateJwtMiddleWare} from './middlewares/jwtValidator';

router.get('/', (_req, res) => {
  res.json({msg: 'Onlyfans ON the LINE'});
});

import securityRoutes from './security/security';
router.use('/security', validateKeyMiddleWare, securityRoutes);

import ventiladoresRouter from './ventiladores/ventiladores';
router.use('/ventiladores', validateKeyMiddleWare, validateJwtMiddleWare, ventiladoresRouter);

export default router;
