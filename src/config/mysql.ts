import "dotenv/config";
import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    port: parseInt(`${process.env.DB_PORT}`)
});

