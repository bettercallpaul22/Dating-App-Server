import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: String,
    refreshToken: String,
   
},
    { timestamps: true }
)

const TokenModel = mongoose.model('Token', TokenSchema)
export default TokenModel