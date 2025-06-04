import {Request,Response} from "express";
import * as feedbackService from "../services/feedbackService";


export const createFeedback = async(req:Request,res:Response)=>{

    
    console.log("Came in createFeedback");
        const {sessionId,fromUserId,toUserId,rating,comment}:{sessionId:string,fromUserId:string,toUserId:string,rating:number,comment:string} = req.body;

        const feedback = await feedbackService.createFeedback(
            sessionId,
            fromUserId,
            toUserId,
            rating,
            comment
        );

        res.status(201).json(feedback);
     
}


export const getFeedbackForUser = async(req:Request,res:Response)=>{

    console.log("Came in getFeedbackForUser");
        const userId = req.params.userId;
        const feedbacks = await feedbackService.getFeedbackForUser(userId);

        
        const filteredFeed = feedbacks.map((f=>{
            return {
                comment: f.comment,
            }
        }))

        console.log("Filtered Feedbacks:", filteredFeed);
        res.status(200).json({
            feedbacks: filteredFeed
        });

    
}