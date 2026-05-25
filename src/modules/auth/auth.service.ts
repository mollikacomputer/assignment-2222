import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { IUser } from "../user/user.interface";
import config from "../../config";
import jwt from "jsonwebtoken"



const signupUserIntoDB = async(payLoad:IUser)=>{
    const { name, email,password,role} = payLoad;
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `
     INSERT INTO users(name,email, password, role) VALUES($1,$2,$3,$4) RETURNING *
    `,
      [name, email, hashPassword, role],
    );
    delete result.rows[0].password;
    return result;
};


// login service
const loginUserIntoDB = async(payLoad:{email:string, password:string})=>{
const {email, password} =payLoad;

const userData= await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email]);

if(userData.rows.length === 0){
    throw new Error("Invalid email or Credintials!");
}
const user = userData.rows[0];

const matchPassword = await bcrypt.compare(password, user.password)

    console.log(matchPassword);
    if(!matchPassword){
        throw new Error("Invalid password or Credintials!")
    };

    // token generate
    const jwtpayload = {
        id : user.id,
        name:user.name,
        email:user.email,

    }
    const accessToken = jwt.sign(jwtpayload, config.secret as string, {expiresIn:"1d"});
    delete user.password;
    return {accessToken,user };
};
export const authService = {
    signupUserIntoDB,
    loginUserIntoDB,
}