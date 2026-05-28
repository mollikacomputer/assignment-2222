import { pool } from "../../db";
import type { IIssue } from "./issueInterface";

//get all issues
const getAllIssuesFromDB = async()=>{
      const result = await pool.query(`
      SELECT id, title, description, type, reported_id FROM issues  
        `);
  return result;      
};
const getSingleIssueFromDB = async (id: number) => {
  const result = await pool.query(
    `
      SELECT issues.*, users.name, users.email
      FROM issues
      JOIN users ON users.id = issues.reported_id
      WHERE issues.id=$1
    `,
    [id]
  );

  return result.rows[0];
};
// get single user all issues
const getSingleUserIssueFromDB = async (userId: number) => {
  const result = await pool.query(
    `SELECT * FROM issues WHERE reported_id=$1`,
    [userId]
  );

  return result;
};

//create issues
const createIssuesIntoDB = async (payLoad: IIssue) => {
 const {id, title, description, status,type, reported_id } = payLoad;
 const user = await pool.query(
  `
  SELECT * FROM users WHERE id=$1
  `, [id]
 );
 if(user.rows.length=== 0){
  throw new Error("User not found");
 }
//  console.log("have a user you can create issues");
const result = await pool.query(
  `
  INSERT INTO  issues(id, title, description, status, type, reported_id) VALUES($1, $2, $3, $4, $5, $6)
  RETURNING *
  `,
  [id, title, description, status, type, reported_id]
)
return result;
};
// put api services update issues
const updateIssueFromDB = async (payLoad:IIssue)=>{
  const {title, description, type, reported_id} = payLoad;
  const result = await pool.query(
      `
    UPDATE issues
    SET 
    title=COALESCE($1,title),
    description=COALESCE($2,description), type=COALESCE($3,type) WHERE reported_id=$4 RETURNING *
    `,
      [title, description, type, reported_id],
    );
    return result;
}
// delete single user Issue
const deleteSingleUserIssuesFromDB = async (userId: number) => {
  const result = await pool.query(
    `DELETE FROM issues WHERE reported_id=$1`,
    [userId]
  );

  return result.rowCount;
};

export const issuesService = {
  createIssuesIntoDB,
  updateIssueFromDB,
  getAllIssuesFromDB,
  getSingleUserIssueFromDB,
  getSingleIssueFromDB,
  deleteSingleUserIssuesFromDB,
};
