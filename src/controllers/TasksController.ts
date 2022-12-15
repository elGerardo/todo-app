import { Request, Response } from "express";
import { createTask } from "../models/Tasks";

//this most recieve the user_id from header
const create = async ({ body, headers }: Request, res: Response) => {
  try {
    await createTask(body, headers, res);
  } catch (e) {
    res.status(500);
    res.json("ERROR REGISTER USER");
  }
};

export { create };