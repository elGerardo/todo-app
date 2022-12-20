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
    let { username, email, first_name, last_name, password } = body;
    yield mysql_1.connection.query(`INSERT INTO users(username, email, first_name, last_name, password) VALUES("${username}", "${email}", "${first_name}", "${last_name}", "${password}")`, (err, result) => {
        if (err)
            res.json({ message: "ERROR REGISTER", status: 500 });
        res.json({
            message: "success",
            status: 0,
            token: btoa(`${username}-${new Date().toJSON()}`),
        });
    });
});
exports.registerUser = registerUser;
const loginUser = (headers, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = headers;
    yield mysql_1.connection.query(`SELECT username, password FROM users where username = "${username}" and password = "${password}"`, (err, result) => {
        if (err)
            res.json({ message: "ERROR LOGIN", error: err, status: 500 });
        if (result.length == 0) {
            res.json({ message: "Username or Password Incorrect", status: 1 });
            return;
        }
        res.json({
            token: btoa(`${username}-${new Date().toJSON()}`),
            status: 0,
        });
    });
});
exports.loginUser = loginUser;
