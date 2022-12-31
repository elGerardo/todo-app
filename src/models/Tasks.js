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
exports.updateListItem = exports.deleteTask = exports.findTask = exports.getTasks = exports.createTask = void 0;
const mysql_1 = require("../config/mysql");
const find = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let [result] = yield mysql_1.pool.query(`SELECT id AS task_id, title AS title, type AS type, status AS status, description AS description, percent AS percent, status AS status FROM tasks where id = ${id}`);
    return result;
});
const getListItems = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let [result] = yield mysql_1.pool.query(`SELECT description AS text, id AS task_item_id, status AS status FROM task_items WHERE task_id = ${id}`);
    return result;
});
const getTasks = (tokenData, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user_id } = tokenData;
        let [result] = yield mysql_1.pool.query(`SELECT id as id, title As title, description AS description, type AS type FROM tasks WHERE user_id = ${user_id}`);
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
        let items = null;
        let resData;
        let result = yield find(id);
        resData = {
            status: 0,
            message: "Success",
            data: Object.assign(Object.assign({}, result[0]), { items: items }),
        };
        if (result[0].type == "Note") {
            res.json(resData);
            return;
        }
        result = yield getListItems(id);
        resData.data.items = result;
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
        let { title, type, description, items } = body;
        let { user_id } = tokenData;
        let result;
        [result] = yield mysql_1.pool.query(`INSERT INTO tasks(title, description, type, user_id) VALUES("${title}", "${description}", "${type}", ${user_id})`);
        if (items === null || type == "Note") {
            res.json({
                message: "Success",
                status: 0,
            });
            return;
        }
        items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield mysql_1.pool.query(`INSERT INTO task_items(task_id, description) VALUES("${result.insertId}", "${item.text}")`);
        }));
        res.json({
            message: "Success",
            status: 0,
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.json({ message: "ERROR CREATE TASK", status: 500 });
    }
});
exports.createTask = createTask;
const deleteTask = (body, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id, type } = body;
        if (type === "Note") {
            yield mysql_1.pool.query(`DELETE FROM tasks WHERE id = ${id}`);
            res.json({
                message: "Success",
                status: 0,
            });
            return;
        }
        yield mysql_1.pool.query(`DELETE FROM task_items WHERE task_id = ${id}`);
        yield mysql_1.pool.query(`DELETE FROM tasks WHERE id = ${id}`);
        res.json({
            status: 0,
            message: "Success",
        });
        return;
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
        let { task_item_id, status } = body;
        yield mysql_1.pool.query(`UPDATE task_items SET status = ${status} WHERE id = ${task_item_id}`);
        res.json({
            message: "Success",
            status: 0,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json("ERROR UPDATE LIST ITEM");
    }
});
exports.updateListItem = updateListItem;
