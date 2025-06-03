import { Request, Response } from "express";

import * as AuthService from "../services/authService";


export const signup = async(req:Request, res:Response)=>{

    try{
        const {name,email,password} = req.body;

        const user = await AuthService.signup(name,email,password);
        res.status(201).json({user});

    }catch(err:any){
        res.status(400).json({message: err.message});
    }
};


export const login = async(req:Request, res:Response)=>{
    try{
        const {email,password}= req.body;
        const result = await AuthService.login(email,password);
        res.status(200).json({result});

    }catch(err:any){
        res.status(401).json({message:err.message});
    }
};