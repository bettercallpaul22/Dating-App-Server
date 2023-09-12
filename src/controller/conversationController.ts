import { Request, Response } from "express"
import Conversation from "../schema/conversationModel"
import { UserModel } from "../schema/userModel";


// Create a new Conversation
export const createConversation = async (req: Request, res: Response) => {
const {senderId, receiverId} = req.body;

    try {
        const sender = await UserModel.findById({_id: senderId})
        const receiver = await UserModel.findById({_id: receiverId})
        if(!sender || !receiver) return  res.status(404).json('users not found');
        const newConversation = new Conversation({
            friend: receiver,
            members: [senderId, receiverId]
        })
        const chat = await newConversation.save()
        res.status(201).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Find user conversation
export const userConversation = async (req: Request, res: Response) => {
    try {
        //find the chat of a member, one member can have multiple chat with diff persons
        //so the response will be a type of an array
        const chat = await Conversation.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}


// find a particular chat, will need the id of the two users who initiated the chat
export const getPersonalConversation = async (req: Request, res: Response) => {
    const chat = await Conversation.findOne({
        members: { $all: [req.params.firstId, req.params.secoundId] }
    })
    res.status(200).json(chat)
    try {

    } catch (error) {
        res.status(500).json(error)
    }
}