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
exports.createTask = void 0;
const mysql_1 = require("../config/mysql");
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
                            mysql_1.connection.query(`INSERT INTO task_items(task_id, title, description) VALUES("${result[0].id}", "${item.title}", "${item.description}")`, (err) => {
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
                    message: "success",
                    status: 0,
                });
                return;
            });
            return;
        }
        res.json({
            message: "success",
            status: 0,
        });
        return;
    });
});
exports.createTask = createTask;
