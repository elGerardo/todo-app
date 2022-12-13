import { Request, Response } from "express";
import { registerUser, loginUser } from "../models/Users";

const register = async ({ body }: Request, res: Response) => {
  try {
    await registerUser(body, res);
  } catch (e) {
    res.status(500);
    res.json("ERROR REGISTER USER");
  }
};

const login = async ({ body }:Request, res: Response) => {
  try {
    await loginUser(body, res);
  } catch (e) {
    res.status(500);
    res.json("ERROR LOGIN USER");
  } 
}

export { register, login };
