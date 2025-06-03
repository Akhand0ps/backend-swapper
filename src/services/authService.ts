import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string | undefined;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
}



export const signup = async(name: string,email:string,password:string)=>{

    const existingUser = await prisma.user.findUnique({where:{email}});

    if(existingUser) throw new Error("Email already registered");



    const hashedPass = await bcrypt.hash(password,10);
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPass
        }
    })

    const token = jwt.sign({userId: user.id},JWT_SECRET,{expiresIn:"7d"});
    

    return{
        token,
        user: {id: user.id,name:user.name,email:user.email}

    } 
};



export const login = async(email:string,password:string)=>{
    const user = await prisma.user.findUnique({where:{email}});

    if(!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign({userId: user.id},JWT_SECRET,{expiresIn:"7d"});

    return {
        token,
        user:{id:user.id,name:user.name,email:user.email}
    };
}

