
//report 
import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";
import { parseCSV } from "./parser.js";
import { uploadUsers, reportAgeDistribution } from "./processor.js";

dotenv.config();
const app = express();

app.get("/import", async (req, res) => {
try {
console.log("Starting import process...");

const users = parseCSV();
console.log(`Parsed ${users.length} records from CSV.`);
await uploadUsers(users);
console.log(" Data inserted successfully.");
await reportAgeDistribution();
res.json({ message: "Import and report completed successfully." });
  } catch (error) {
    console.error(" Error ", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      age INT NOT NULL,
      address JSONB,
      additional_info JSONB
    );
  `);

  console.log("Table 'users' is readyy");
});
