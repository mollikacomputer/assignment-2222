import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUser);

// getApi get all user
router.get("/", userController.getAllUser);

router.get("/:id", userController.getSingleUser );


export const userRoute = router;