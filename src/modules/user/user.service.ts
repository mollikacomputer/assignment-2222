import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { IUser } from "./user.interface";

const createUserIntoDB = async(payLoad:IUser) =>{
    const {name, email,password,role} = payLoad;
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `
     INSERT INTO users(name,email, password, role) VALUES($1,$2,$3,$4) RETURNING name, email, role
    `,
      [name, email, hashPassword,role],
    );
    return result;
};


const getAllUserFromDB = async()=>{
      const result = await pool.query(`
      SELECT id, name, email, role FROM users  
        `);
  return result;      
}

// const getAllUserFromDB = async()=>{
//       const result = await pool.query(`
//       SELECT * FROM users  
//         `);
//   return result;      
// }

export const userService ={
    createUserIntoDB,
    getAllUserFromDB,
}