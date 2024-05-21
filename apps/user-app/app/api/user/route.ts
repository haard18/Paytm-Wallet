import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
export const GET=async()=>{
    const session=await getServerSession(authOptions);
    if(session?.user){
        return NextResponse.json({
            user:session.user
        });
    }
    return NextResponse.json({
        "message":"Not authenticated"
    },{
        status:403
    });
}