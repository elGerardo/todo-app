"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskItems = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
const Tasks_1 = require("./Tasks");
const TaskItems = sequelize_2.sequelize.define("task_items", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    task_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Tasks_1.Tasks,
            key: "task_id",
        },
    },
    title: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.STRING,
    status: sequelize_1.DataTypes.INTEGER,
    order_item: sequelize_1.DataTypes.INTEGER,
}, { underscored: true, timestamps: false });
exports.TaskItems = TaskItems;
