import {   createConversation,  getPersonalConversation,  userConversation } from '../controller/conversationController';
import express from 'express';

const router = express.Router() 

router.post('/create-conversation', createConversation)
router.get('/:userId', userConversation) // Get the chat of a user
router.get('/private-conversation/:firstId/:secoundId', getPersonalConversation  ) // Get the chat of a user


export default router;