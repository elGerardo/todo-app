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
        let { username, email, password } = body;
        let [result] = yield mysql_1.pool.query(`INSERT INTO users(username, email, password) VALUES("${username}", "${email}", "${password}")`);
        let content = {
            username: `${username}`,
            user_id: `${result.insertId}`,
            login_datetime: `${new Date().toJSON()}`,
            type: "user",
            access: ["create", "read", "update", "delete"],
        };
        res.json({
            message: "Success",
            status: 0,
            token: btoa(JSON.stringify(content)),
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
        if (result.length !== 0) {
            let content = {
                username: `${username}`,
                user_id: `${result[0].id}`,
                login_datetime: `${new Date().toJSON()}`,
                type: "user",
                access: ["create", "read", "update", "delete"],
            };
            res.json({
                token: btoa(JSON.stringify(content)),
                status: 0,
            });
            return;
        }
        res.json({
            status: 400,
            message: "Username or Password Incorrect",
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.json({
            status: 400,
            message: "Username or Password Incorrect",
        });
    }
});
exports.loginUser = loginUser;
