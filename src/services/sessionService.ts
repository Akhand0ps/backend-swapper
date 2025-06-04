import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSession = async(
    teacherId:string,
    learnerId:string,
    subject:string,
    startTime:Date,
    endTime:Date
)=>{
    try{
        const session = await prisma.session.create({
            data:{
                teacherId,
                learnerId,
                subject,
                startTime,
                endTime,
                videoUrl: `https://meet.google.com/cxf-jxxz-sca`,
            },
        })


        return session;
    }catch(err){
        console.error("Error creating session:",err);
        throw new Error("Failed to create session");
    }
}

export const getSessionsForUser = async(userId:string)=>{

    try{

        return await prisma.session.findMany({
            where:{
                OR:[{teacherId:userId},{learnerId:userId}]
            },
            orderBy:{startTime:"desc"},
            include:{
                teacher:{select:{name:true,email:true}},
                learner:{select:{name:true,email:true}},
            },
        })
    }catch(err){
        console.error("Error fetching sessions for user:", err);
        throw new Error("Failed to fetch sessions");
    }
}

export const updateSessionStatus = async(
    
    sessionId:string,
    status:"SCHEDULED" | "COMPLETED" | "CANCELLED"
)=>
    
    {


    return await prisma.session.update({

        where:{id:sessionId},
        data:{status},
    });
}