import { verify } from '../milddleWare/tokenValidation';
import { logOut, login, refresh, register,  } from '../controller/authController';
import express from 'express';
const router = express.Router() 

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', verify,   logOut) 

export default router;