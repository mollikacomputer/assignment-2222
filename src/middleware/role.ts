import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../db";
const role = ()=>{
    return async(req:Request, res: Response, next:NextFunction) =>{
    // console.log("protect route with role");
        // console.log(req.headers.authorization)
        const token = req.headers.authorization;
    if(!token){
       res.status(200).json({
        success:false,
        message:"UnAuthorized Access!!"
       });
        }
    const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload;
    // console.log(decoded)

    const userData = await pool.query(

        `
        SELECT * FROM users WHERE email =$1
        `, [decoded.email],
    );
    const user = userData.rows[0];
// console.log(user.email);
// console.log(user.role);
if(userData.rows.length === 0){
     res.status(404).json({
        success:false,
        message:"User not found!!"
       });
    }

    if (user.role !== "maintainer") {
    res.status(403).json({
    success: false,
    message: "Forbidden access!!"
  });
}
   next(); 
};
};

export default role;
