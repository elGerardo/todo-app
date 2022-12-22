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
exports.loginUser = exports.registerUser = void 0;
const mysql_1 = require("../config/mysql");
const registerUser = (body, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, email, first_name, last_name, password } = body;
        let [result] = yield mysql_1.pool.query(`INSERT INTO users(username, email, first_name, last_name, password) VALUES("${username}", "${email}", "${first_name}", "${last_name}", "${password}")`);
        res.json({
            message: "Success",
            status: 0,
            user_id: result[0].id,
            token: btoa(`${username}-${new Date().toJSON()}`),
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            status: 500,
            message: "ERROR REGISTER USER",
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (headers, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, password } = headers;
        let [result] = yield mysql_1.pool.query(`SELECT id, username, password FROM users where username = "${username}" and password = "${password}"`);
        console.log("user id");
        console.log(result[0].id);
        res.json({
            token: btoa(`${username}-${new Date().toJSON()}`),
            user_id: result[0].id,
            status: 0,
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            status: 500,
            message: "ERROR LOGIN USER",
        });
    }
});
exports.loginUser = loginUser;
