import Joi from 'joi';


// Input
export const signUpSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(30).trim(),
    lastName: Joi.string().required().min(3).max(30).trim(),
    email: Joi.string().required().min(3).max(30).trim().email(),
    password: Joi.string().required().min(6).max(30).trim(),

})
export const updateSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(30).trim(),
    lastName: Joi.string().required().min(3).max(30).trim(),
})

export const loginSchema = Joi.object({
    email: Joi.string().required().min(3).max(30).trim().email(),
    password: Joi.string().required().min(6).max(30).trim(),

})