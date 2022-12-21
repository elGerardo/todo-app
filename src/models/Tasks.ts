import { connection, Connect } from "../config/mysql";
import { Task } from "../interfaces/task.interface";
import { Response, NextFunction } from "express";

const getTasks = async (headers: any, res: Response, next: NextFunction) => {
  await connection.connect(() => {
    let { user_id } = headers;
    connection.query(
      `SELECT id as id, title As title, description AS description, type AS type FROM TASKS WHERE user_id = ${user_id}`,
      (err, result) => {
        if (err) res.json({ message: "ERROR GET TASKS", status: 500 });
        res.json({
          status: 0,
          message: "Success",
          data: result,
        });
      }
    );
  });
};

const findTask = async (id: any, res: Response) => {
  let items: [] | null = null;
  let resData: any;
  await connection.query(
    `SELECT title AS title, type AS type, status AS status, description AS description, percent AS percent, status AS status FROM tasks where id = ${id}`,
    async (err, result) => {
      if (err) res.json({ message: "ERROR FIND TASK", status: 500 });
      resData = {
        status: 0,
        message: "Success",
        data: { ...result[0], items: items },
      };
      if (result.length == 0) {
        res.json(resData);
        return;
      }

      if (result[0].type == "Note") {
        res.json(resData);
        return;
      }

      await connection.query(
        `SELECT description AS text, id AS task_item_id FROM task_items WHERE task_id = ${id}`,
        (err, result) => {
          if (err) res.json({ message: "ERROR FIND TASK", status: 500 });
          resData.data.items = result;
          res.json(resData);
          return;
        }
      );
      return;
    }
  );
};

const createTask = async (body: Task, headers: any, res: Response) => {
  let { title, type, description, items } = body;
  let { user_id } = headers;
  //insert the header task
  await connection.query(
    `INSERT INTO tasks(title, description, type, user_id) values("${title}", "${description}", "${type}", "${user_id}")`,
    (err, result) => {
      if (err) res.json({ message: "ERROR CREATE TASK", status: 500 });
      //has items, then find the task_id recently created
      if (items !== null) {
        connection.query(
          `SELECT * FROM tasks WHERE user_id = ${user_id} order by created_at desc limit 1`,
          (err, result) => {
            if (err)
              res.json({ message: "ERROR CREATE TASK ITEMS", status: 500 });

            //revalidation request by ts
            try {
              items !== null
                ? items.forEach((item) => {
                    connection.query(
                      `INSERT INTO task_items(task_id, description) VALUES("${result[0].id}", "${item.text}")`,
                      (err) => {
                        if (err)
                          res.json({
                            message: "ERROR CREATE TASK ITEMS",
                            status: 500,
                          });
                      }
                    );
                  })
                : null;
            } catch (e) {}
            //finish items iterations
            res.json({
              message: "Success",
              status: 0,
            });
            return;
          }
        );
        return;
      }
      res.json({
        message: "Success",
        status: 0,
      });
      return;
    }
  );
};

const deleteTask = async (body: any, res: Response) => {
  let { id, type } = body;
  if (type === "Note") {
    await connection.query(
      `DELETE FROM tasks WHERE id = ${id}`,
      (err, result) => {
        if (err) res.json({ message: "ERROR DELETE TASK", status: 500 });
        connection.end();
        res.json({
          status: 0,
          message: "Success",
        });
        return;
      }
    );
    return;
  }
  //is type List
  await connection.query(
    `DELETE FROM task_items WHERE task_id = ${id}`,
    async (err, result) => {
      if (err) res.json({ message: "ERROR DELETE TASK", status: 500 });
      await connection.query(
        `DELETE FROM tasks WHERE id = ${id}`,
        (err, result) => {
          if (err) res.json({ message: "ERROR DELETE TASK", status: 500 });
          res.json({
            status: 0,
            message: "Success",
          });
        }
      );
    }
  );
  return;
};

export { createTask, getTasks, findTask, deleteTask };
