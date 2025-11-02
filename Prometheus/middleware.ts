import type { NextFunction } from "express";
import type { Request,Response } from "express";

export function middleware(req:Request,res:Response,next:NextFunction){

            const startTime=Date.now();
            next();
            const endTime=Date.now();
            console.log(`The time this request took is : ${endTime-startTime} ms for method: ${req.method} for route: ${req.route.path}`);
}