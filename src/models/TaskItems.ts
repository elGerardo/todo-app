import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";
import { Tasks } from "./Tasks";

const TaskItems = sequelize.define(
  "task_items",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tasks,
        key: "task_id",
      },
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    order_item: DataTypes.INTEGER,
  },
  { underscored: true, timestamps: false }
);
export { TaskItems };
