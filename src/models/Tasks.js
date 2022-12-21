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
exports.deleteTask = exports.findTask = exports.getTasks = exports.createTask = void 0;
const mysql_1 = require("../config/mysql");
const getTasks = (headers, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield mysql_1.connection.connect(() => {
        let { user_id } = headers;
        mysql_1.connection.query(`SELECT id as id, title As title, description AS description, type AS type FROM TASKS WHERE user_id = ${user_id}`, (err, result) => {
            if (err)
                res.json({ message: "ERROR GET TASKS", status: 500 });
            res.json({
                status: 0,
                message: "Success",
                data: result,
            });
        });
    });
});
exports.getTasks = getTasks;
const findTask = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    let items = null;
    let resData;
    yield mysql_1.connection.query(`SELECT title AS title, type AS type, status AS status, description AS description, percent AS percent, status AS status FROM tasks where id = ${id}`, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            res.json({ message: "ERROR FIND TASK", status: 500 });
        resData = {
            status: 0,
            message: "Success",
            data: Object.assign(Object.assign({}, result[0]), { items: items }),
        };
        if (result.length == 0) {
            res.json(resData);
            return;
        }
        if (result[0].type == "Note") {
            res.json(resData);
            return;
        }
        yield mysql_1.connection.query(`SELECT description AS text, id AS task_item_id FROM task_items WHERE task_id = ${id}`, (err, result) => {
            if (err)
                res.json({ message: "ERROR FIND TASK", status: 500 });
            resData.data.items = result;
            res.json(resData);
            return;
        });
        return;
    }));
});
exports.findTask = findTask;
const createTask = (body, headers, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, type, description, items } = body;
    let { user_id } = headers;
    //insert the header task
    yield mysql_1.connection.query(`INSERT INTO tasks(title, description, type, user_id) values("${title}", "${description}", "${type}", "${user_id}")`, (err, result) => {
        if (err)
            res.json({ message: "ERROR CREATE TASK", status: 500 });
        //has items, then find the task_id recently created
        if (items !== null) {
            mysql_1.connection.query(`SELECT * FROM tasks WHERE user_id = ${user_id} order by created_at desc limit 1`, (err, result) => {
                if (err)
                    res.json({ message: "ERROR CREATE TASK ITEMS", status: 500 });
                //revalidation request by ts
                try {
                    items !== null
                        ? items.forEach((item) => {
                            mysql_1.connection.query(`INSERT INTO task_items(task_id, description) VALUES("${result[0].id}", "${item.text}")`, (err) => {
                                if (err)
                                    res.json({
                                        message: "ERROR CREATE TASK ITEMS",
                                        status: 500,
                                    });
                            });
                        })
                        : null;
                }
                catch (e) { }
                //finish items iterations
                res.json({
                    message: "Success",
                    status: 0,
                });
                return;
            });
            return;
        }
        res.json({
            message: "Success",
            status: 0,
        });
        return;
    });
});
exports.createTask = createTask;
const deleteTask = (body, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, type } = body;
    if (type === "Note") {
        yield mysql_1.connection.query(`DELETE FROM tasks WHERE id = ${id}`, (err, result) => {
            if (err)
                res.json({ message: "ERROR DELETE TASK", status: 500 });
            mysql_1.connection.end();
            res.json({
                status: 0,
                message: "Success",
            });
            return;
        });
        return;
    }
    //is type List
    yield mysql_1.connection.query(`DELETE FROM task_items WHERE task_id = ${id}`, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            res.json({ message: "ERROR DELETE TASK", status: 500 });
        yield mysql_1.connection.query(`DELETE FROM tasks WHERE id = ${id}`, (err, result) => {
            if (err)
                res.json({ message: "ERROR DELETE TASK", status: 500 });
            res.json({
                status: 0,
                message: "Success",
            });
        });
    }));
    return;
});
exports.deleteTask = deleteTask;
