import { pool } from "../../db";
import type { IIssue } from "./issueInterface";

const createIssuesIntoDB = async (payLoad: IIssue) => {

  const { title, description, type, status, reported_id } = payLoad;

  // check user exists
  const user = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [reported_id]
  );

  if (user.rows.length === 0) {
    throw new Error("User not found!!");
  }

  // create issue
  const result = await pool.query(
    `
    INSERT INTO issues
    (title, description, type, status, reported_id)

    VALUES($1, $2, $3, $4, $5)

    RETURNING *
    `,
    [title, description, type, status, reported_id]
  );

  return result;
};

export const issuesService = {
  createIssuesIntoDB,
};

