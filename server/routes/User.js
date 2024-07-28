import express from 'express';
import {userRegister,userLogin} from '../controllers/User.js';


const router = express.Router();

router.post('/signup',userRegister);

router.post('/signin',userLogin);

export default router