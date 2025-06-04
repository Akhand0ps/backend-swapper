import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createFeedback = async(
    sessionId: string,
    fromUserId: string,
    toUserId: string,
    rating: number,
    comment: string
)=>{

    return await prisma.feedback.create({
        data:{
            sessionId,
            fromUserId,
            toUserId,
            rating,
            comment
        }
    })
};


export const getFeedbackForUser = async(userId: string)=>{
    return await prisma.feedback.findMany({
        where:{toUserId: userId},
        orderBy:{createdAt:"desc"},

        include:{
            fromUser:{select:{name:true}},
            session:{select:{subject:true,startTime:true}}
        }
    })
};

