import { Router } from "express";
import { register } from "../controllers/UsersControllers"

const router = Router();

router.post("/register", register)

export { router }