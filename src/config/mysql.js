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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = exports.connection = void 0;
require("dotenv/config");
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
});
exports.connection = connection;
const Connect = () => __awaiter(void 0, void 0, void 0, function* () {
    new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });
});
exports.Connect = Connect;
