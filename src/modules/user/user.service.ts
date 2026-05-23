import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { IUser } from "./user.interface";

const createUserIntoDB = async(payLoad:IUser) =>{
    const {name, email,password,role} = payLoad;
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `
     INSERT INTO users(name,email, password, role) VALUES($1,$2,$3,$4) RETURNING id, name, email, role
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
// get single user
const getSingleUserFromDB = async(id:string)=>{
      const result = await pool.query(
      `
      SELECT name, email, role FROM users WHERE id=$1  
        `,
      [id],
    );
return result;
};
// update single user
const updateUserFromDB = async(payLoad:IUser, id:string)=>{
   const {name, email, password, role} = payLoad;
  const result = await pool.query(
      `
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    email=COALESCE($2,email),
    password=COALESCE($3,password),
    role=COALESCE($4,role)

    WHERE id=$5 RETURNING *
    `,
      [name, email, password, role, id],
    );
return result;
};
// delete api
const deleteUserFromDB = async(id:string)=>{
      const result = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );
return result;
}

export const userService ={
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
}