import { pool } from "../config/mysql";
import { Task } from "../interfaces/task.interface";
import { Response } from "express";

const getTasks = async (headers: any, res: Response) => {
  try {
    let { user_id } = headers;
    let [result] = await pool.query(
      `SELECT id as id, title As title, description AS description, type AS type FROM tasks WHERE user_id = ${user_id}`
    );
    res.json({
      status: 0,
      message: "Success",
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "ERROR GET TASKS", status: 500 });
  }
};

const find = async (id: any) => {
  let [result] = await pool.query(
    `SELECT id AS task_id, title AS title, type AS type, status AS status, description AS description, percent AS percent, status AS status FROM tasks where id = ${id}`
  );

  return result;
};

const getListItems = async (id: any) => {
  let [result] = await pool.query(
    `SELECT description AS text, id AS task_item_id, status AS status FROM task_items WHERE task_id = ${id}`
  );

  return result;
};

const findTask = async (id: any, res: Response) => {
  try {
    let items: [] | null = null;
    let resData: any;

    let result: any = await find(id);

    resData = {
      status: 0,
      message: "Success",
      data: { ...result[0], items: items },
    };

    if (result[0].type == "Note") {
      res.json(resData);
      return;
    }

    result = await getListItems(id);

    resData.data.items = result;
    res.json(resData);
    return;
  } catch (e) {
    console.log(e);
    res.json({ message: "ERROR FIND TASK", status: 500 });
  }
};

const createTask = async (body: Task, headers: any, res: Response) => {
  try {
    let { title, type, description, items } = body;
    let { user_id } = headers;

    let result: any;

    [result] = await pool.query(
      `INSERT INTO tasks(title, description, type, user_id) VALUES("${title}", "${description}", "${type}", ${user_id})`
    );

    if (items === null || type == "Note") {
      res.json({
        message: "Success",
        status: 0,
      });
      return;
    }

    items.forEach(async (item) => {
      await pool.query(
        `INSERT INTO task_items(task_id, description) VALUES("${result.insertId}", "${item.text}")`
      );
    });
    res.json({
      message: "Success",
      status: 0,
    });
    return;
  } catch (e) {
    console.log(e);
    res.json({ message: "ERROR CREATE TASK", status: 500 });
  }
};

const deleteTask = async (body: any, res: Response) => {
  try {
    let { id, type } = body;

    if (type === "Note") {
      await pool.query(`DELETE FROM tasks WHERE id = ${id}`);
      res.json({
        message: "Success",
        status: 0,
      });
      return;
    }

    await pool.query(`DELETE FROM task_items WHERE task_id = ${id}`);
    await pool.query(`DELETE FROM tasks WHERE id = ${id}`);
    res.json({
      status: 0,
      message: "Success",
    });
    return;
  } catch (e) {
    console.log(e);
    res.json({
      status: 500,
      message: "ERROR DELETE TASK",
    });
  }
};

const updateListItem = async (body: any, res: Response) => {
  try {
    let { task_item_id, status } = body;
    await pool.query(
      `UPDATE task_items SET status = ${status} WHERE id = ${task_item_id}`
    );
    res.json({
      message: "Success",
      status: 0,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json("ERROR UPDATE LIST ITEM");
  }
};

export { createTask, getTasks, findTask, deleteTask, updateListItem };
