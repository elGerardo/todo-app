import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { router } from "./routes";
import { Connect } from './config/mysql';

const port = process.env.PORT || 3002;
const db = Connect();
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(router);
dotenv.config();

db.then(connection => { console.log("Database Connection Ready!") })

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});