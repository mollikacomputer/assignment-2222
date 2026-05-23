import type { Request, Response } from "express";

import { userService } from "./user.service";
import { pool } from "../../db";

// post api create a user
const createUser = async (req: Request, res: Response) => {
  // const { name, email, password, role } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);
    // console.log(result);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
// get all user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result.rows,
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
// get single user
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {

    const result = await userService.getSingleUserFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}


export const userController ={
    createUser,
    getAllUser,
    getSingleUser,
}