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
exports.updateList = exports.deleteItem = exports.find = exports.get = exports.create = void 0;
const Tasks_1 = require("../models/Tasks");
const get = ({ headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = headers.token;
        const tokenData = JSON.parse(atob(token));
        yield (0, Tasks_1.getTasks)(tokenData, res);
    }
    catch (e) {
        res.status(500);
        res.json("ERROR GET TASKS");
    }
});
exports.get = get;
const find = ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = query.id;
        yield (0, Tasks_1.findTask)(id, res);
    }
    catch (e) {
        res.status(500);
        res.json("ERROR FIND TASK");
    }
});
exports.find = find;
const create = ({ body, headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = headers.token;
        const tokenData = JSON.parse(atob(token));
        yield (0, Tasks_1.createTask)(body, tokenData, res);
    }
    catch (e) {
        res.status(500);
        res.json("ERROR REGISTER USER");
    }
});
exports.create = create;
const deleteItem = ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Tasks_1.deleteTask)({ id: query.id, type: query.type }, res);
    }
    catch (e) {
        res.status(500);
        res.json("ERROR DELETE TASK");
    }
});
exports.deleteItem = deleteItem;
const updateList = ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task_item_id = query.task_item_id;
        let status = query.status;
        yield (0, Tasks_1.updateListItem)({ task_item_id: task_item_id, status: status }, res);
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json("ERROR UPDATE LIST ITEM");
    }
});
exports.updateList = updateList;
