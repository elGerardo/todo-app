import { Task } from "../interfaces/task.interface";
import { Response } from "express";
import { sequelize } from "../config/sequelize";
import { DataTypes } from "sequelize";
import { Users } from "./Users";
import { TaskItems } from "./TaskItems";

const Tasks = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.INTEGER,
    percent: DataTypes.INTEGER,
  },
  { underscored: true, timestamps: false }
);

Tasks.hasMany(TaskItems, { as: "task_items" });

TaskItems.hasOne(Tasks, {
  foreignKey: "task_id",
  as: "tasks",
});

const getTasks = async (tokenData: any, res: Response) => {
  try {
    const { user_id } = tokenData;

    const result: any = await Tasks.findAll({
      attributes: ["id", "description", "type", "title"],
      where: {
        user_id: `${user_id}`,
      },
      include: {
        model: TaskItems,
        as: "task_items",
        attributes: ["status"],
      },
    });

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
    const result: any = await Tasks.findAll({
      attributes: [
        [sequelize.literal("tasks.id"), "task_id"],
        "description",
        "type",
        "title",
      ],
      where: {
        id: `${id}`,
      },
      include: {
        model: TaskItems,
        as: "task_items",
        attributes: [
          [sequelize.literal("task_items.id"), "task_item_id"],
          [sequelize.literal("task_items.description"), "text"],
          "status",
        ],
      },
    });

    const resData: any = {
      status: 0,
      message: "Success",
      data: { result },
    };

    res.json(resData);
    return;
  } catch (e) {
    console.log(e);
    res.json({ message: "ERROR FIND TASK", status: 500 });
  }
};

const createTask = async (body: Task, tokenData: any, res: Response) => {
  const t = await sequelize.transaction();
  try {
    let { title, type, description, items } = body;
    let { user_id } = tokenData;

    const result: any = await Tasks.create(
      {
        title: `${title}`,
        type: `${type}`,
        description: `${description}`,
        user_id: `${user_id}`,
      },
      {
        transaction: t,
      }
    );

    if (items === null || items === undefined || type == "Note") {
      await t.commit();
      res.json({
        message: "Success",
        status: 0,
      });
      return;
    }

    for (const item of items) {
      await TaskItems.create(
        {
          task_id: `${result.id}`,
          description: item.text,
        },
        { transaction: t }
      );
    }

    await t.commit();

    res.json({
      message: "Success",
      status: 0,
    });
    return;
  } catch (e) {
    await t.rollback();
    console.log(e);
    res.json({ message: "ERROR CREATE TASK", status: 500 });
  }
};

const deleteTask = async (body: any, res: Response) => {
  const t = sequelize.transaction();
  try {
    await sequelize.transaction(async (t) => {
      let { id, type } = body;

      if (type === "Note") {
        await Tasks.destroy({
          where: {
            id: `${id}`,
          },
        });
        res.json({
          message: "Success",
          status: 0,
        });
        return;
      }

      await TaskItems.destroy({
        where: {
          task_id: `${id}`,
        },
      });
      await Tasks.destroy({
        where: {
          id: `${id}`,
        },
      });

      res.json({
        message: "Success",
        status: 0,
      });
      return;
    });
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
    await sequelize.transaction(async (t) => {
      let { task_item_id, status } = body;
      await TaskItems.update(
        { status: `${status}` },
        { where: { id: `${task_item_id}` } }
      );

      res.json({
        message: "Success",
        status: 0,
      });
      return;
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json("ERROR UPDATE LIST ITEM");
  }
};

export { Tasks, createTask, getTasks, findTask, deleteTask, updateListItem };
