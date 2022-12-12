import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { router } from "./routes";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3002;
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});