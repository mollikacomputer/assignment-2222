import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "../../config";
const signupUserIntoDB = async(payLoad:{email:string, password:string})=>{
const {email, password} =payLoad;
const userData= await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email]);
if(userData.rows.length === 0){
    throw new Error("Invalid Credintials!");
}
const user = userData.rows[0];

const matchPassword = await bcrypt.compare(password, user.password)

    console.log(matchPassword);
    if(!matchPassword){
        throw new Error("Invalid Credintials!")
    };

    // token generate
    const jwtpayload = {
        id : user.id,
        name:user.name,
        email:user.email,

    }
    const accessToken = jwt.sign(jwtpayload, config.secret as string, {expiresIn:"1d"});
    return {accessToken};
}
export const authService = {
    signupUserIntoDB,
}