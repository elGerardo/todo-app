import { Router } from "express";
import { register, login } from "../controllers/UsersController"
import { Request, Response } from "express";

const router = Router();

router.post("/register", register);

router.post("/login", login)

router.get("/test_encode", (req: Request, res: Response) => {
    const date = new Date().toJSON();

    let encode = btoa(date);
    res.send(encode)
})

export { router }