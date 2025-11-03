import express, { json } from 'express'
import promClient from 'prom-client';
import type { NextFunction } from "express";
import type { Request,Response } from "express";


//Middleware start

function middleware(req:Request,res:Response,next:NextFunction){

            const startTime=Date.now();
            next(); 
            //If there is an async call to db , this will fail as we  did not write //await next()
            const endTime=Date.now();
            console.log(`The time this request took is : ${endTime-startTime} ms for method: ${req.method} for route: ${req.route.path}`);
}

// Middleware end


//Start of making a counter 
const requestCounter= new promClient.Counter({
    name:"http_requests_total",
    help:"Total number of http requests",
    labelNames:['method','route','status_code']
})

//adding the custom middleware 

// https://prometheus.io/docs/concepts/metric_types/ THIS ARTICLE WILL HELP


function requestCountermiddleware(req:Request,res:Response,next:NextFunction){
        const startTime=Date.now();

        res.on("finish",()=>{
            const endTime=Date.now();
 const routePath = req.route ? req.route.path : req.originalUrl;
  const statusCode = res.statusCode || 0;
            requestCounter.inc({
                method:req.method,
                route:routePath,
                status_code:statusCode,
            })
        })
        next();
}

//expose the metrics endpoint 
const app =express();
app.use(json());
app.use(middleware);
app.use(requestCountermiddleware);

app.get("/metrics",async(req,res)=>{
    const metrics=await promClient.register.metrics();
    res.set('Content-type',promClient.register.contentType),
    res.end(metrics)

})








app.get("/cpu",(req,res)=>{
    for(let i=0;i<100000;i++){
        Math.random();
    }
    res.json({
        message:"cpu"
    })
})
app.get("/user",(req,res)=>{
    
    res.json({
        message:"user"
    })
})




app.listen(3000);