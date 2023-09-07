import { Request, Response } from "express"
import Conversation from "../schema/conversationModel"



export const createConversation = async (req: Request, res: Response) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        
        const chat = await newConversation.save()
        res.status(201).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}


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