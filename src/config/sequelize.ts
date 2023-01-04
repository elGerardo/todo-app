import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  `${process.env.DB_DATABASE}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host:`${process.env.DB_HOST}`,
    port: parseInt(`${process.env.DB_PORT}`),
    dialect:`mysql`
  }
);
