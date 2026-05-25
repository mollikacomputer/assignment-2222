import { pool } from "../../db";

const createIssuesIntoDB = async(payLoad:any)=>{
    console.log(payLoad);

const {issues_id, title, description, type, status, reported_id} = payLoad;
const user = await pool.query(`
    SELECT * FROM users WHERE id=$1
    `, [issues_id])

if(user.rows.length === 0){
    throw new Error("User not found!!");
};
const result = await pool.query(`
    INSERT INTO issues(issues_id, title, description, type, status, reported_id) VALUES($1, $2,$3, $4, $5, 6$) RETURNING *
    `, [issues_id, title, description, type, status, reported_id]);
    return result;
}
export const issuesService = {
    createIssuesIntoDB
}