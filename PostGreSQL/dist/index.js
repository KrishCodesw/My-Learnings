"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const pgClient = new pg_1.Client("postgresql://neondb_owner:npg_5wm7RZCfoEMx@ep-royal-snow-a8gqugx3-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
pgClient.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const country = req.body.country;
    try {
        const insertQuery = `INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id;`; /// This is to avoid SQL Injections 
        yield pgClient.query("BEGIN;");
        const response = yield pgClient.query(insertQuery, [username, email, password]); ///-------------------- Query 1 
        const user_id = response.rows[0].id;
        const InsertAddressQuery = `INSERT INTO addresses (city,country,user_id) VALUES ($1,$2,$3);`;
        const addressresponse = yield pgClient.query(InsertAddressQuery, [city, country, user_id]); ///-------------------- Query 2 
        yield pgClient.query("COMMIT;");
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
        //-----------------------------------------------------------------------------------------------------------------------------------------------
        res.json({
            message: "You have signed up"
        });
    }
    catch (e) {
        console.error("Actual error:", e);
        res.json({
            message: "Error signing up"
        });
    }
}));
app.get("/metadata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const query = `SELECT users.id, users.username, users.email, addresses.city, addresses.country
FROM users JOIN addresses ON users.id = addresses.user_id
WHERE users.id = ${id};`;
    const response = yield pgClient.query(query);
    res.json({
        response: response.rows
    });
}));
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
