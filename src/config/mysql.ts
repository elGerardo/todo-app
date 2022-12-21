import "dotenv/config";
import mysql from "mysql";

const connection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
});

const Connect = async () => {
    new Promise<mysql.Connection>((resolve, reject) => {
        connection.connect((error) => {
            if(error){
                reject(error);
                return;
            }
            resolve(connection);
        })
    })
}

export { connection, Connect};