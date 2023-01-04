import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes";
import { pool } from "./config/mysql";
import { sequelize } from "./config/sequelize";

const port = process.env.PORT || 3002;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(router);
dotenv.config();
/*
app.get("/test", async (req: Request, res: Response) => {
  let [result] = await pool.query("SELECT * FROM tasks");
  res.json(result);
});
*/
app.listen(port, async () => {
  await sequelize
    .authenticate()
    .then(async () => {
      
      console.log(`⚡️[server]: Server is running`);
      process.env.ENVIRONMENT === "local" &&
        console.log(`at https://localhost:${port}`);
    })
    .catch((error) => {
      console.error("ERROR TO BUILD", error);
    });
});
