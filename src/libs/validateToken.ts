import { Request, Response, NextFunction} from "express"
import  jwt  from "jsonwebtoken";

export interface IPayload {
    _id: string;
    iat: number;
} 

export const TokenValidation = (req: Request, res:Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if(!token) return res.status(400).json("no autorizado");
    const payload = jwt.verify(token,process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    console.log(payload);
    
    next();
}