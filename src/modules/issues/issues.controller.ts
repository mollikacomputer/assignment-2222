import type { Request, Response } from "express"
import { issuesService } from "./issues.servivce";

const createIssues = async(req : Request, res :Response)=>{
    try {
    const result = await issuesService.createIssuesIntoDB(req.body)
    } catch (error:any) {
    res.status(500).json({
    success: false,
    message: error.message,
    error: error,
    });
    }
    
}
export const issuesController = {
    createIssues,
}