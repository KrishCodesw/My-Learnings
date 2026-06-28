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

// IF query 1 runs and the Back in crashes the query 2 will not run partial user will be created without an addressso to avoid this we have to use transactions Do we send two SQL queries into the database? What if one of the queries (address query for example) fails? 
// This would require transactions  in SQL to ensure either both the user information and address goes in, or neither does

//-----------------------------------------------------------------------------------------------------------------------------------------------

//What would the SQL query look like under the hood ?
// BEGIN; -- Start transaction

// INSERT INTO users (username, email, password)
// VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');

// INSERT INTO addresses (user_id, city, country, street, pincode)
// VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');

// COMMIT;

//-----------------------------------------------------------------------------------------------------------------------------------------------

//                                                  JOINS 
// 1. BAD APPROACH

// -- Query 1: Fetch user's details
// SELECT id, username, email
// FROM users
// WHERE id = YOUR_USER_ID;

// -- Query 2: Fetch user's address
// SELECT city, country, street, pincode
// FROM addresses
// WHERE user_id = YOUR_USER_ID;


// 2.GOOD APPROACH

// SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users JOIN addresses ON users.id = addresses.user_id
// WHERE users.id = '1';

// SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
// FROM users u
// JOIN addresses a ON u.id = a.user_id
// WHERE u.id = YOUR_USER_ID;

// Drawback : is it does nxn multiplication and it's too expensive sometimes and hence it is not good for a large db we can do 2 queries


//VERY  VERY  IMP ----- TYPES of JOINS 

// Inner , Left ,Right and FULL JOIN 

// 1. INNER JOIN
// Returns rows when there is at least one match in both tables. If there is no match, the rows are not returned. It's the most common type of join.
// Use Case: Find All Users With Their Addresses. If a user hasn’t filled their address, that user shouldn’t be returned

// SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// INNER JOIN addresses ON users.id = addresses.user_id;


// 2. LEFT JOIN
// Returns all rows from the left table, and the matched rows from the right table.
// Use case - To list all users from your database along with their address information (if they've provided it), you'd use a LEFT JOIN. Users without an address will still appear in your query result, but the address fields will be NULL for them.
// SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// LEFT JOIN addresses ON users.id = addresses.user_id;


// 3. RIGHT JOIN
// Returns all rows from the right table, and the matched rows from the left table.
// Use case - Given the structure of the database, a RIGHT JOIN would be less common since the addresses table is unlikely to have entries not linked to a user due to the foreign key constraint. However, if you had a situation where you start with the addresses table and optionally include user information, this would be the theoretical use case.
// SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// RIGHT JOIN addresses ON users.id = addresses.user_id;

// 4. FULL JOIN
// Returns rows when there is a match in one of the tables. It effectively combines the results of both LEFT JOIN and RIGHT JOIN.
// Use case - A FULL JOIN would combine all records from both users and addresses, showing the relationship where it exists. Given the constraints, this might not be as relevant because every address should be linked to a user, but if there were somehow orphaned records on either side, this query would reveal them.
// SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
// FROM users
// FULL JOIN addresses ON users.id = addresses.user_id;

 








//-----------------------------------------------------------------------------------------------------------------------------------------------

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



// const pgClient2=new Client({
//   user:"neondb_owner",
//   password:"5wm7RZCfoEMx",
//   port:5432,
//   host:"ep-royal-snow-a8gqugx3-pooler.eastus2.azure.neon.tech",
//   database:"neondb",
//   ssl:true
// })

// async function main(){
//   await pgClient.connect();
//   const response=await pgClient.query("SELECT * FROM users;")
//   // const response=await pgClient.query("UPDATE users SET username='krisha' WHERE id=2;")
//   // const response=await pgClient.query("UPDATE users SET username='krisha' WHERE id=2;")
//   console.log(response);
  
// }

// main();