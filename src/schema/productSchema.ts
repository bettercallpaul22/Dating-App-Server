import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String },
    condition: { type: String },
    color: { type: String },
    seller:
    {
        // type: Schema.Types.ObjectId,
        // ref: 'user',
        // required:true
    }
    ,
},
    { timestamps: true }

)

export const ProductModel = mongoose.model('product', ProductSchema)