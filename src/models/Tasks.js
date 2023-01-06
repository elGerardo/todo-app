"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateListItem = exports.deleteTask = exports.findTask = exports.getTasks = exports.createTask = exports.Tasks = void 0;
const sequelize_1 = require("../config/sequelize");
const sequelize_2 = require("sequelize");
const Users_1 = require("./Users");
const TaskItems_1 = require("./TaskItems");
const Tasks = sequelize_1.sequelize.define("tasks", {
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: Users_1.Users,
            key: "id",
        },
    },
    title: sequelize_2.DataTypes.STRING,
    description: sequelize_2.DataTypes.STRING,
    type: sequelize_2.DataTypes.STRING,
    status: sequelize_2.DataTypes.INTEGER,
    percent: sequelize_2.DataTypes.INTEGER,
}, { underscored: true, timestamps: false });
exports.Tasks = Tasks;
Tasks.hasMany(TaskItems_1.TaskItems, { as: "task_items" });
TaskItems_1.TaskItems.hasOne(Tasks, {
    foreignKey: "task_id",
    as: "tasks",
});
const getTasks = (tokenData, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = tokenData;
        const result = yield Tasks.findAll({
            attributes: ["id", "description", "type", "title"],
            where: {
                user_id: `${user_id}`,
            },
            include: {
                model: TaskItems_1.TaskItems,
                as: "task_items",
                attributes: ["status"],
            },
        });
        res.json({
            status: 0,
            message: "Success",
            data: result,
        });
    }
    catch (e) {
        console.log(e);
        res.json({ message: "ERROR GET TASKS", status: 500 });
    }
});
exports.getTasks = getTasks;
const findTask = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield Tasks.findAll({
            attributes: [
                [sequelize_1.sequelize.literal("tasks.id"), "task_id"],
                "description",
                "type",
                "title",
            ],
            where: {
                id: `${id}`,
            },
            include: {
                model: TaskItems_1.TaskItems,
                as: "task_items",
                attributes: [
                    [sequelize_1.sequelize.literal("task_items.id"), "task_item_id"],
                    [sequelize_1.sequelize.literal("task_items.description"), "text"],
                    "status",
                ],
            },
        });
        const resData = {
            status: 0,
            message: "Success",
            data: result,
        };
        res.json(resData);
        return;
    }
    catch (e) {
        console.log(e);
        res.json({ message: "ERROR FIND TASK", status: 500 });
    }
});
exports.findTask = findTask;
const createTask = (body, tokenData, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            let { title, type, description, items } = body;
            let { user_id } = tokenData;
            const result = yield Tasks.create({
                title: `${title}`,
                type: `${type}`,
                description: `${description}`,
                user_id: `${user_id}`,
            }, { transaction: t });
            if (items === null || items === undefined || type == "Note") {
                res.json({
                    message: "Success",
                    status: 0,
                });
                return;
            }
            for (const item of items) {
                yield TaskItems_1.TaskItems.create({
                    task_id: `${result.id}`,
                    description: item.text,
                }, { transaction: t });
            }
            res.json({
                message: "Success",
                status: 0,
            });
            return;
        }));
    }
    catch (e) {
        console.log(e);
        res.json({ message: "ERROR CREATE TASK", status: 500 });
    }
});
exports.createTask = createTask;
const deleteTask = (body, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            let { id, type } = body;
            if (type === "Note") {
                yield Tasks.destroy({
                    where: {
                        id: `${id}`,
                    },
                    transaction: t,
                });
                res.json({
                    message: "Success",
                    status: 0,
                });
                return;
            }
            yield TaskItems_1.TaskItems.destroy({
                where: {
                    task_id: `${id}`,
                },
                transaction: t,
            });
            yield Tasks.destroy({
                where: {
                    id: `${id}`,
                },
                transaction: t,
            });
            res.json({
                message: "Success",
                status: 0,
            });
            return;
        }));
    }
    catch (e) {
        console.log(e);
        res.json({
            status: 500,
            message: "ERROR DELETE TASK",
        });
    }
});
exports.deleteTask = deleteTask;
const updateListItem = (body, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(body);
        yield sequelize_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            let { task_item_id, status } = body;
            yield TaskItems_1.TaskItems.update({ status: status === "false" ? 0 : 1 }, { where: { id: `${task_item_id}` }, transaction: t });
            res.json({
                message: "Success",
                status: 0,
            });
            return;
        }));
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json("ERROR UPDATE LIST ITEM");
    }
});
exports.updateListItem = updateListItem;
