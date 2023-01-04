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
exports.loginUser = exports.registerUser = exports.Users = void 0;
const sequelize_1 = require("../config/sequelize");
const sequelize_2 = require("sequelize");
const Users = sequelize_1.sequelize.define("users", {
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: sequelize_2.DataTypes.STRING,
    image: sequelize_2.DataTypes.STRING,
    first_name: sequelize_2.DataTypes.STRING,
    last_name: sequelize_2.DataTypes.STRING,
    password: sequelize_2.DataTypes.STRING,
});
exports.Users = Users;
const registerUser = (body, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_1.sequelize.transaction();
    try {
        let { username, password } = body;
        let result = yield Users.create({
            username: `${username}`,
            password: `${password}`,
        }, {
            transaction: t,
        });
        yield t.commit();
        let content = {
            username: `${username}`,
            user_id: `${result.toJSON().id}`,
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
        yield t.rollback();
        console.log(e);
        res.json({
            status: 500,
            message: "ERROR REGISTER USER",
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (headers, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield sequelize_1.sequelize.transaction();
    try {
        const { username, password } = headers;
        const [result] = yield Users.findAll({
            attributes: ["id", "username", "password"],
            where: {
                username: `${username}`,
                password: `${password}`,
            },
            transaction: t
        });
        yield t.commit();
        if (result.length !== 0) {
            let content = {
                username: `${username}`,
                user_id: `${result.toJSON().id}`,
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
        yield t.rollback();
        console.log(e);
        res.json({
            status: 400,
            message: "Username or Password Incorrect",
        });
    }
});
exports.loginUser = loginUser;
