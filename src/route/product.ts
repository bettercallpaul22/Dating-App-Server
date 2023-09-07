import { createProduct } from '../controller/product';
import express from 'express';

const router = express.Router() 

router.post('/new/:id', createProduct)


export default router;