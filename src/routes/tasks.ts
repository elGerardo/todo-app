import { Router } from "express";
import { create, get, find, deleteItem } from "../controllers/TasksController";

const router = Router();

router.get("/get", get);
router.get("/find", find);
router.post("/create", create);
router.delete("/delete", deleteItem);

export { router };
