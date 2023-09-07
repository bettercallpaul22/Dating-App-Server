import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    status: String,
    gender: String,
    age: Number,
    followers:Array,
    height: Number,
    orientation_: String,
    bodyType: String,
    ethnicity: String,
    hasChildren: String,
    genderInterest: String,
    religion: String,
    about: String,

    city: String,
    state: String,
    country: String,
    avatar: String,
    password: { type: String, required: true },
},
    { timestamps: true }

)

export const UserModel = mongoose.model('user', UserSchema)