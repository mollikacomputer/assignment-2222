import type { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken"
import config from "../config";
const issueAuth = ()=>{
    return async(req: Request, res:Response, next:NextFunction) =>{
    // console.log("This is protected issue Auth");
    // console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({
        status:false,
        message:"Unauthorized Access!!",
    });
    }

    const decoded =Jwt.verify(token as string, config.secret as string);
    console.log(decoded);
    next();

}
}

export default issueAuth;