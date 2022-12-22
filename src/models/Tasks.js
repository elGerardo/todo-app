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
exports.findTask = exports.getTasks = void 0;
const mysql_1 = require("../config/mysql");
const getTasks = (headers, res) => __awaiter(void 0, void 0, void 0, function* () {
    //try {
    let { user_id } = headers;
    let [result] = yield mysql_1.pool.query(`SELECT id as id, title As title, description AS description, type AS type FROM TASKS WHERE user_id = ${user_id}`);
    res.json({
        status: 0,
        message: "Success",
        data: result,
    });
    /*} catch (e) {
      res.json({ message: "ERROR GET TASKS", status: 500 });
    }*/
});
exports.getTasks = getTasks;
const findTask = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let items = null;
        let resData;
        let result;
        [result] = yield mysql_1.pool.query(`SELECT title AS title, type AS type, status AS status, description AS description, percent AS percent, status AS status FROM tasks where id = ${id}`);
        resData = {
            status: 0,
            message: "Success",
            data: Object.assign(Object.assign({}, result[0]), { items: items }),
        };
        if (result[0].type == "Note") {
            res.json(resData);
            return;
        }
        [result] = yield mysql_1.pool.query(`SELECT description AS text, id AS task_item_id FROM task_items WHERE task_id = ${id}`);
        resData.data.items = result;
        res.json(resData);
        return;
    }
    catch (e) {
        res.json({ message: "ERROR FIND TASK", status: 500 });
    }
});
exports.findTask = findTask;
