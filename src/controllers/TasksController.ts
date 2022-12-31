import { Request, Response } from "express";
import {
  createTask,
  getTasks,
  findTask,
  deleteTask,
  updateListItem,
} from "../models/Tasks";

const get = async ({ headers }: Request, res: Response) => {
  try {
    const token: any = headers.token;
    const tokenData: any = JSON.parse(atob(token));
    await getTasks(tokenData, res);
  } catch (e) {
    res.status(500);
    res.json("ERROR GET TASKS");
  }
};

const find = async ({ query }: Request, res: Response) => {
  try {
    let id = query.id;
    await findTask(id, res);
  } catch (e) {
    res.status(500);
    res.json("ERROR FIND TASK");
  }
};

const create = async ({ body, headers }: Request, res: Response) => {
  try {
    const token: any = headers.token;
    const tokenData: any = JSON.parse(atob(token));
    await createTask(body, tokenData, res);
  } catch (e) {
    res.status(500);
    res.json("ERROR REGISTER USER");
  }
};

const deleteItem = async ({ query }: Request, res: Response) => {
  try {
    await deleteTask({ id: query.id, type: query.type }, res);
  } catch (e) {
    res.status(500);
    res.json("ERROR DELETE TASK");
  }
};

const updateList = async ({ query }: Request, res: Response) => {
  try {
    let task_item_id = query.task_item_id;
    let status = query.status;
    await updateListItem({ task_item_id: task_item_id, status: status }, res);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json("ERROR UPDATE LIST ITEM");
  }
};

export { create, get, find, deleteItem, updateList };
