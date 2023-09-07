import MessageModel from "../schema/messageModel"
import { Request, Response } from "express"





export const createMessage = async (req: Request, res: Response) => {
    const { senderId, conversationId, text } = req.body
    try {
        const newMessage = new MessageModel({ senderId, conversationId, text })
        await newMessage.save()
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json(error)

    }

}



export const getMessage = async (req: Request, res: Response) => {
    const {conversationId} = req.params
    try {
        const conversations = await MessageModel.find({conversationId})
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json(error)
    }
}