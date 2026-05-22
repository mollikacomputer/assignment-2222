import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";
import bcrypt from "bcrypt";

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: config.connection_string,
});

const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'contributor'
        CHECK (role IN ('contributor', 'maintainer')),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
            `);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
initDB();


// home page get api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "DevPlus Home page",
    author: "Ranjit Kumar Mandal",
  });
});

// get single user

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT * FROM users WHERE id=$1  
        `,
      [id],
    );

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
});

// getApi get all user
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users  
        `);
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
});
// post api create a user
app.post("/api/users", async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { name, email, password, role } = req.body;

  const hashPassword = await bcrypt.hash(password, 10)

  try {
    const result = await pool.query(
      `
     INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
    `,
      [name, email,hashPassword,role],
    );
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
});

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const result = await pool.query(
      `
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    email=COALESCE($2,email),
    password=COALESCE($3,password),
    role=COALESCE($4,role)

    WHERE id=$5 RETURNING *
    `,
      [name, email, password, role, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    // console.log(result);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});


app.listen(port, () => {
  console.log(`DevPlus server  running on the port: ${port}`);
});