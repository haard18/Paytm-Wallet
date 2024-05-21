"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
import axios from "axios";
export async function createOnramp({amount,provider}:{amount:string,provider:string}){
    const session=await getServerSession(authOptions);
    const userId=session?.user?.id;
    const token=Math.random().toString(36).substring(7);
    if(!userId){
        return {msg:"Failed"};
    }
    const notfirst= await db.balance.findFirst({
        where:{
            userId:parseInt(userId)
        }
    })
    if(!notfirst){
        await db.balance.create({
            data:{
                amount:0,
                locked:0,
                userId:parseInt(userId)
            }
        })
    }
    await db.onRampTransaction.create({
        data:{
            amount:parseInt(amount)*100,
            status:"Processing",
            provider:provider,
            token:token,
            // status:"Pending",
            startTime:new Date(),
            userId:parseInt(userId), 
        }
    });
    const hook=await axios.post("http://localhost:3003/hdfchook",{
        token:token,
        amount:parseInt(amount)*100,
        userId:userId
    
    })
    


}