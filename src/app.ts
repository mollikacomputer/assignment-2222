import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {pool } from "./db";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));



// home page get api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "DevPlus Home page",
    author: "Ranjit Kumar Mandal",
  });
});


app.use('/api/users', userRoute)

// delete api delete user

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );

    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

export default app;