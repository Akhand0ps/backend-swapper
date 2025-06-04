import { Request,Response } from "express";
import * as sessionService from "../services/sessionService";
import { error } from "console";



export const createSession = async(req:Request,res:Response)=>{
    console.log("came here")

    try{

        const { teacherId, learnerId, subject, startTime, endTime }: { teacherId: string; learnerId: string; subject: string; startTime: Date; endTime: Date } = req.body;
        const session = await sessionService.createSession(
            teacherId,
            learnerId,
            subject,
            new Date(startTime),
            new Date(endTime)
        );

        res.status(201).json({
            session
        });
    }catch(err){
        res.status(500).json({error:"Failed to create session",details:err});
    }
};


export const getSessionsForUser =async(req:Request,res:Response)=>{
    console.log("Came here in getSessionsForUser");

    try{

        const userId = req.params.userId;
        const sessions = await sessionService.getSessionsForUser(userId);
        // console.log("Fetched sessions:", sessions);
        res.status(200).json({
            sessions
        });

    }catch(err){
        res.status(500).json({error:"Failed to fetch sessions",details:err})
    }
};

export const updateStatus = async(req:Request,res:Response)=>{
    console.log("came in updateStatus")
    try{
        const {sessionId,status} = req.body;
        const session = await sessionService.updateSessionStatus(
            sessionId,status
        )
        res.status(200).json({
            session
        });
    }catch(err){
        res.status(500).json({error:"Failed to update session status",details:err});
    }
}