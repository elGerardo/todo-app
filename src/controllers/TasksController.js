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
exports.find = exports.get = void 0;
const Tasks_1 = require("../models/Tasks");
const get = ({ headers }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Tasks_1.getTasks)(headers, res, next);
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
