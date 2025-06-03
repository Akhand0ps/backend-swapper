
import{Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string | undefined;

interface AuthRequest extends Request{
    userId? : string,
}

export const isAuth = (req:AuthRequest,res:Response,next:NextFunction)=>{

    const token = req.cookies?.token;

    if(!token){
        return res.status(401).json({messgae:"Unauthorized access, please login"});
    }


    try{
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured" });
        }
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}