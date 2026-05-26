import type { Request, Response } from "express"
import { issuesService } from "./issues.servivce";
import type { IIssue } from "./issueInterface";

// get api get all issues
const getAllIssues = async(req: Request, res: Response)=>{
  try {
    const result = await issuesService.getAllIssuesFromDB();
        res.status(201).json({
        status:true,
        message:"Issues created successfully!!",
        data:result.rows,
    });
  } catch (error:any) {
    res.status(404).json({
    success: false,
    message: error.message,
    error: error,
    });
  }
}
// post api create issue
const createIssue = async (req: Request, res: Response,) => {
  try {
    const result = await issuesService.createIssuesIntoDB(req.body);
    res.status(201).json({
        status:true,
        message:"Issues created successfully!!",
        data:result.rows[0],
    });
  } catch (error:any) {
     res.status(500).json({
    success: false,
    message: error.message,
    error: error,
    });
  }
};
//put api update issue
const updateIssues = async(req:Request, res:Response,) =>{
  try {
    const result = await issuesService.updateIssueFromDB(req.body);
    res.status(201).json({
        status:true,
        message:"Issues UPDATED successfully!!",
        data:result.rows[0],
    });
  } catch (error:any) {
  res.status(500).json({
    success: false,
    message: error.message,
    error: error,
    });
  }
}

export const issuesController = {
    createIssue,
    updateIssues,
    getAllIssues,
}