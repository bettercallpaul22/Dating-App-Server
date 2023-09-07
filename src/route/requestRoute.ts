import { createRequest, getAllRequest, updateRequest } from '../controller/requestController';
import express from 'express';
const router = express.Router() 

router.post('/new-request', createRequest)
router.get('/all/:id', getAllRequest)
router.put('/update/:id', updateRequest)

export default router;