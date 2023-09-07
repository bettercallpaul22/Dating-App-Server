import mongoose from "mongoose";
const Schema = mongoose.Schema;


const RequestSchecma = new Schema({
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    avatar: { type: String },
    text: { type: String },
    city: { type: String },
    bill: { type: String },
    state: { type: String },
    country: { type: String },
    status: { type: String },
   
    
},
    { timestamps: true }

)

export const RequestModel = mongoose.model('request', RequestSchecma)