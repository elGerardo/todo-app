import { pool } from "../config/mysql";
import { Task } from "../interfaces/task.interface";
import { Response } from "express";

const getTasks = async (headers: any, res: Response) => {
  try {
    let { user_id } = headers;
    console.log(headers);
    console.log(user_id);
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

const findTask = async (id: any, res: Response) => {
  try {
    let items: [] | null = null;
    let resData: any;

    let result: any;

    [result] = await pool.query(
      `SELECT title AS title, type AS type, status AS status, description AS description, percent AS percent, status AS status FROM tasks where id = ${id}`
    );

    resData = {
      status: 0,
      message: "Success",
      data: { ...result[0], items: items },
    };
    if (result[0].type == "Note") {
      res.json(resData);
      return;
    }

    [result] = await pool.query(
      `SELECT description AS text, id AS task_item_id FROM task_items WHERE task_id = ${id}`
    );

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

    pool.query(
      `INSERT INTO tasks(title, description, type) VALUES("${title}", "${type}", "${description}")`
    );

    if (items === null) {
      res.json({
        message: "Success",
        status: 0,
      });
      return;
    }

    items.forEach((item) => {
      pool.query(
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

export { createTask, getTasks, findTask, deleteTask };
