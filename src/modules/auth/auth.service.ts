import { pool } from "../../db";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"
// import config from "../../config";


const signupUserIntoDB = async(payLoad:{name: string, email:string, password:string, role:string})=>{
    
    const { name, email,password,role} = payLoad;
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `
     INSERT INTO users(name,email, password, role) VALUES($1,$2,$3,$4, $5) RETURNING *
    `,
      [name, email, hashPassword,role],
    );
    delete result.rows[0].password;
    return result;
};





// // login service
// const signupUserIntoDB = async(payLoad:{email:string, password:string})=>{
// const {email, password} =payLoad;

// const userData= await pool.query(`
//     SELECT * FROM users WHERE email=$1
//     `, [email]);

// if(userData.rows.length === 0){
//     throw new Error("Invalid email or Credintials!");
// }
// const user = userData.rows[0];

// const matchPassword = await bcrypt.compare(password, user.password)

//     console.log(matchPassword);
//     if(!matchPassword){
//         throw new Error("Invalid password or Credintials!")
//     };

//     // token generate
//     const jwtpayload = {
//         id : user.id,
//         name:user.name,
//         email:user.email,

//     }
//     const accessToken = jwt.sign(jwtpayload, config.secret as string, {expiresIn:"1d"});
//     return {accessToken};
// };
export const authService = {
    signupUserIntoDB,
}