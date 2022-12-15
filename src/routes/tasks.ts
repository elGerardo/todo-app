import { Router } from "express";
import { create } from "../controllers/TasksController";

const router = Router();

router.post("/create", create);

export { router };
