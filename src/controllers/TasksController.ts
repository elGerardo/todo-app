import { Request, Response } from "express";
import { createTask, getTasks, findTask, deleteTask } from "../models/Tasks";

const get = async ({headers}:Request, res:Response) => {
  try{
    await getTasks(headers, res);
  }catch(e){
    res.status(500);
    res.json("ERROR GET TASKS")
  }
}

const find =async ({query}:Request, res: Response) => {
  try{
    console.log(query.id);
    let id = query.id;
    await findTask(id, res);
  }catch(e){
    res.status(500);
    res.json("ERROR FIND TASK")
  }
}

const create = async ({ body, headers }: Request, res: Response) => {
  try {
    await createTask(body, headers, res);
  } catch (e) {
    res.status(500);
    res.json("ERROR REGISTER USER");
  }
};


const deleteItem = async ({query}:Request, res: Response) => {
  try{
    await deleteTask({id:query.id,type:query.type}, res);
  }catch(e){
    res.status(500);
    res.json("ERROR DELETE TASK");
  }
}

export { create, get, find, deleteItem };