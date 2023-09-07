import { Request, Response } from "express"
import { ProductModel } from "../schema/productSchema"
import { UserModel } from "../schema/userModel"



export const createProduct = async (req: Request, res: Response) => {
    const { name, price, model, desc, color } = req.body
    const _id = req.params.id
    try {
        const product: any = new ProductModel({
            name,
            price,
            model,
            desc,
            color,

        })

        const user = await UserModel.findByIdAndUpdate(_id,{$push: {products: product}}, {new:true});
        await user.save();
        
        const user2 = await UserModel.findById({_id}).select('-password');
        product.seller= user2
        await product.save();
        
        // await product.save();
        // console.log(product)
        // user.products.push(product);
        // await user.save();
        return res.status(201).json({ message: "Product created successfully" })
    } catch (error) {
        res.status(500).json({ message: error })
    }

}
