"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    port: parseInt(`${process.env.DB_PORT}`),
    dialect: `mysql`
});
