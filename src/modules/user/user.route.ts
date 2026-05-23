import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";
import { pool } from "../../db";
import { userService } from "./user.service";

const router = Router();

router.post("/", userController.createUser);

// getApi get all user
router.get("/", userController.getAllUser);

router.get("/:id", userController.getSingleUser );

router.put("/:id", userController.getSingleUser);

router.delete("/:id", userController.deleteUser);

export const userRoute = router;