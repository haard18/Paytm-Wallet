import express from 'express';
const app = express();
import db from "@repo/db/client";
app.use(express.json());
app.post('/hdfchook', async(req, res) => {
    const paymentInfo:{token:string,amount:string,userId:string}={
        token:req.body.token,
        amount:req.body.amount,
        userId:req.body.userId
    }
    console.log(req.body);
   const intUserId =parseInt(paymentInfo.userId);
    //update the payment status in the database
    try{
        await db.$transaction([
            db.balance.updateMany({
                where:{
                    userId:intUserId
                },
                data:{
                    amount:{
                        increment:Number(paymentInfo.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where:{
                    token:paymentInfo.token
                },
                data:{
                    status:"Success"
                }
            })
        ]);
        res.json({msg:"Captured"});

    }catch(err){
        console.log(err);
        res.status(411).json({msg:"Failed"});
        // res.json({msg:"Failed"});
    }
});
app.listen(3003);