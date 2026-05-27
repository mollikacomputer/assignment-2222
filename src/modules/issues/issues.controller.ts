import type { Request, Response } from "express"
import { issuesService } from "./issues.servivce";
import type { IIssue } from "./issueInterface";

// get api get all issues
const getAllIssues = async(req: Request, res: Response)=>{
  try {
    const result = await issuesService.getAllIssuesFromDB();
        res.status(201).json({
        status:true,
        message:"All Issues shown successfully!!",
        data:result.rows,
    });
  } catch (error:any) {
    res.status(404).json({
    success: false,
    message: error.message,
    error: error,
    });
  }
};
// get singleUsers issues
const getSingleIssue = async(req:Request, res:Response) =>{
const userId = Number(req.params.id);
  try {
      const result = await issuesService.getSingleIssueFromDB(userId);
       res.status(201).json({
        status:true,
        message:"Single issue shown successfully!!",
        data:result.rows,
    });
  } catch (error:any) {
    res.status(404).json({
    success: false,
    message: error.message,
    error: error,
    });
  }
};

// get singleUsers issues
const getSingleUserIssue = async(req:Request, res:Response) =>{
const userId = Number(req.params.id);
  try {
      const result = await issuesService.getSingleUserIssueFromDB(userId);
       res.status(201).json({
        status:true,
        message:"Single users all issue shown successfully!!",
        data:result.rows,
    });
  } catch (error:any) {
    res.status(404).json({
    success: false,
    message: error.message,
    error: error,
    });
  }
};
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
};
const deleteIssue = async(req: Request, res: Response)=>{
  const userId = Number(req.params.id);
  try {
    const result = await issuesService.deleteSingleUserIssuesFromDB(userId);
    res.status(201).json({
        status:true,
        message:"Issues Deleted successfully!!",
        data:result,
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
    getSingleUserIssue,
    getSingleIssue,
    deleteIssue,
}