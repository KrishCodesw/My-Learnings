import { Client } from "pg";
import express from "express";
const pgClient = new Client(
  "postgresql://neondb_owner:npg_5wm7RZCfoEMx@ep-royal-snow-a8gqugx3-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
);
  pgClient.connect();


const app=express();
app.use(express.json())

app.post("/signup",async(req,res)=>{
  const username=req.body.username
  const email=req.body.email
  const password=req.body.password
  const city=req.body.city
  const country=req.body.country


  try{
const insertQuery=`INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id;` /// This is to avoid SQL Injections 

await pgClient.query("BEGIN;")

  const response= await pgClient.query(insertQuery,[username,email,password]) ;///-------------------- Query 1 

  const user_id=response.rows[0].id;

 const InsertAddressQuery = `INSERT INTO addresses (city,country,user_id) VALUES ($1,$2,$3);`


 const addressresponse= await pgClient.query(InsertAddressQuery,[city,country,user_id]) ;///-------------------- Query 2 
await pgClient.query("COMMIT;")
 res.json({
    message:"You have signed up"
  })
  }

  catch(e){
    console.error("Actual error:", e);
    res.json({
      message:"Error signing up"
    })
  }


  
})

app.get("/metadata",async(req,res)=>{
        const id=req.query.id
        const query=`SELECT users.id, users.username, users.email, addresses.city, addresses.country
FROM users JOIN addresses ON users.id = addresses.user_id
WHERE users.id = ${id};`;

const response=await pgClient.query(query);
res.json({
  response:response.rows
})

}
)








app.listen(3000);
