import { Router } from "express";
import { register, login } from "../controllers/UsersController"

const router = Router();

router.post("/register", register);

router.post("/login", login)

export { router }