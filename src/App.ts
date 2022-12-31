import express, {
  Express,
  Request,
  Response
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes";
import { pool } from "./config/mysql";

const port = process.env.PORT || 3002;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(router);
dotenv.config();

app.get("/test", async (req: Request, res: Response) => {
  let [result] = await pool.query("SELECT * FROM tasks");
  res.json(result);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
