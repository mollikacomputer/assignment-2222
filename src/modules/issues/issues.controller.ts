import type { Request, Response } from "express"
import { issuesService } from "./issues.servivce";


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
    })
  }
};

const updateIssues = async(req:Request, res: Response, id: string) =>{
  try {
    const result = await issuesService.updateIssueFromDB(req.body, id as string);
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
}