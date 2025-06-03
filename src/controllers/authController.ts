import { Request, Response } from "express";

import * as AuthService from "../services/authService";


export const signup = async(req:Request, res:Response)=>{

    try{
        const {name,email,password} = req.body;

        const {token,user} = await AuthService.signup(name,email,password);
        res
        .cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .status(201).json({user});

    }catch(err:any){
        res.status(400).json({message: err.message});
    }
};


export const login = async(req:Request, res:Response)=>{
    try{
        const {email,password}= req.body;
        const {token,user} = await AuthService.login(email,password);

        res
        .cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .status(201).json({user});

    }catch(err:any){
        res.status(401).json({message:err.message});
    }
};

export const logout = async (res: Response) => {
    res.clearCookie("token").status(200).json({ message: "Logged out successfully" });
};