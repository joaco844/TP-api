import { Request, Response } from "express";
import User, { IUser } from "../User";
import  jwt  from "jsonwebtoken";
export const signup = async(req: Request, res:Response) => {
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        });
        user.password = await user.encrypPassword(user.password);
        const savedUser = await user.save();
        const token: string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'tokentest')
        console.log(user);
    res.header('Authorization', token).json(savedUser);
};
export const signin = async(req: Request, res:Response)=> {

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json("el email o la contraseña esta mal")

    const correctpassword:boolean = await user.validatePassword(req.body.password)
    if(!correctpassword)return res.status(400).json("la contraseña esta mal")
    const token: string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'tokentest',{
        expiresIn: 60 * 60 * 24
    })
    
    res.header("Authorization", token).json(user)
};
export const profile = (req: Request, res:Response)=> {
    console.log(req.header("Authorization"))
    res.send('profile');
};