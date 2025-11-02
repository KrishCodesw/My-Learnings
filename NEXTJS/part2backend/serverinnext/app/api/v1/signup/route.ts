import { NextRequest, NextResponse } from "next/server";
import client from '@/app/api/v1/db/index'
// const Pclient=new PrismaClient();
export async function POST(req:NextRequest){

    const data =await req.json();
    console.log(data);
    
  await  client.user.create({
        data:{
            username:data.username,
            password:data.password
        }
    })

    return NextResponse.json({
        message:"U have Signed up!"
    })
}