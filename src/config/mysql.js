"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
require("dotenv/config");
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    port: `${process.env.DB_PORT}`,
});
