import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
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

    await pool.query(`
    CREATE TABLE issues (
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL
        CHECK (char_length(title) <= 150),

    description TEXT NOT NULL
        CHECK (char_length(description) >= 20),

    type VARCHAR(20) NOT NULL
        CHECK (type IN ('bug', 'feature_request')),

    status VARCHAR(20) DEFAULT 'open'
        CHECK (status IN ('open', 'in_progress', 'resolved')),

    issues_id INT UNIQUE
        REFERENCES users(id)
        ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `);
    
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};