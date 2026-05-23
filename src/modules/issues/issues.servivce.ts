import { pool } from "../../db";

const createIssuesIntoDB = async(payLoad:any)=>{
    console.log(payLoad);

const {issues_id, title, description, type, status} = payLoad;
const user = await pool.query(`
    SELECT * FROM users WHERE id=$1
    `, [issues_id])

if(user.rows.length === 0){
    throw new Error("User not found!!");
};
const result = await pool.query(`
    INSERT INTO issues(issues_id, title, description, type, status) VALUES($1, $2,$3, $4, $5) RETURNING *
    `, [issues_id, title, description, type, status]);
    return result;
}
export const issuesService = {
    createIssuesIntoDB
}