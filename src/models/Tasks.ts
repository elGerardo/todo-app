import { connection } from "../config/mysql";
import { Task } from "../interfaces/task.interface";
import { Response } from "express";

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
                      `INSERT INTO task_items(task_id, title, description) VALUES("${result[0].id}", "${item.title}", "${item.description}")`,
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
              message: "success",
              status: 0,
            });
            return;
          }
        );
        return;
      }
      res.json({
        message: "success",
        status: 0,
      });
      return;
    }
  );
};

export { createTask };
