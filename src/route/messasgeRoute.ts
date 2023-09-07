import { createMessage, getMessage } from '../controller/messageController';
import express from 'express';

const router = express.Router() 

router.post('/create-message', createMessage)
router.get('/get-message/:conversationId', getMessage) // get message of a particular chat
// router.get('/:userId', userChats) // Get the chat of a user
// router.get('/find/:firstId/:secoundId', findChat) // Get the chat of a user


export default router;