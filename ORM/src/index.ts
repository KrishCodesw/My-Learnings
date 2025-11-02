import { PrismaClient } from "../src/generated/prisma";
import express from 'express'
const Client=new PrismaClient;
const app=express();



app.get("/client",async(req,res)=>{
const users= await Client.user.findMany();

res.json({users})
})








app.get("/todos/:id",async(req,res)=>{
  const id=req.params.id 
const users= await Client.user.findFirst({
  where:{
    id:Number(id)
  },
  select:{
    todos:true
  }
});
res.json({users})
})





console.log("✅ Hello from your ORM app!");

async function CreateUser(){
 const res=   await Client.user.create({
        data:{
            username:"ksrish",
            password:"jdwdjk3f3_3f3",
            age:30,
            city:"keie"
        }
    })
console.log(res);

}
async function DeleteUser(){
   await Client.user.delete({
      where:{
        id:2
      }})

}

// CreateUser();
// DeleteUser();

async function UpdateUser(){
   await Client.user.update({
      where:{
        id:3
      },
      data:{
        username:"harkirat"
      }
    })
}

// UpdateUser();

async function FindUser(){
 const dala=  await Client.user.findFirst({
      where:{
        id:3
      },
      include:{
        todos:true
      }
    })
    console.log(dala?.password);
    console.log(dala);
    
    
}
// FindUser()





app.listen(3000);
