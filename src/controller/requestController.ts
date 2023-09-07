import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { RequestModel } from '../schema/requestSchema';



// Create a request
export const createRequest = async (req: Request, res: Response) => {
    const { senderId, bill, avatar, recipientId, firstName, lastName, gender, age, city, state, country, text } = req.body;
    try {
        const newRequest = new RequestModel({ senderId,avatar, recipientId, bill, firstName, lastName, gender, age, city, state, country, text, status :"pending" })
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Get all requests
export const getAllRequest = async (req: Request, res: Response) => {
    const recipientId = req.params.id
    const request = await RequestModel.find({ recipientId })
    try {
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//Update a request
export const updateRequest = async (req: Request, res: Response) => {
    const recipientId = req.params.id
    const request = await RequestModel.findOneAndUpdate({recipientId}, {status:"success"}, {new:true})
    try {
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}