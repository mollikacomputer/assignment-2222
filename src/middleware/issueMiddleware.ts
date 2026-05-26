import type { NextFunction, Request, Response } from "express";

const issueMiddleware = async ()=>{
    return async(req : Request, res: Response, next: NextFunction)=>{
    console.log("This is issueMiddleware")
    }
}


export default issueMiddleware;