import express from 'express'
import { PrismaClient } from '../generated/prisma'
const app = express()
const port = 3000
const client=new PrismaClient()



app.get('/', async (req:Request, res:any) =>{
        const data=await client.user.findMany()
        res.json({data})
})


app.post("/",async(req:any,res:any)=>{
    await client.user.create({
            data:{
                username:Math.random().toString(),
                password:Math.random().toString()+1
            }
    })
    res.json({
        "message":"Signup"
    })
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))