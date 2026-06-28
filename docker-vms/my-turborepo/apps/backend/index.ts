import express from 'express';
import {prisma} from 'db/client';

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  prisma.user.findMany()
    .then(user => {
      res.json(user);
    })
    .catch((err: any) => {
      res.status(500).json({ error: err.message });
    });
})
app.post("/user", (req, res) => {

  const {username,password}=req.body;

   if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  prisma.user.create({
    data:{
      username,password
    }

  }).then(user=>{res.status(201).json(user)}).catch((err:any)=>{res.status(500).json({error:err.message})})

})


app.listen(8000,()=>{console.log("listening on 8000");
});


