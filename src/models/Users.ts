import { Response } from "express";
//import { pool } from "../config/mysql";
import { RegisterUser } from "../interfaces/user.interface";

/*
const registerUser = async (body: RegisterUser, res: Response) => {
  let { username, email, first_name, last_name, password } = body;
  await connection.query(
    `INSERT INTO users(username, email, first_name, last_name, password) VALUES("${username}", "${email}", "${first_name}", "${last_name}", "${password}")`,
    (err, result) => {
      if (err) res.json({ message: "ERROR REGISTER", status: 500 });
      res.json({
        message: "success",
        status: 0,
        token: btoa(`${username}-${new Date().toJSON()}`),
      });
    }
  );
};

const loginUser = async (headers: any, res: Response) => {
  let { username, password } = headers;
  await connection.query(
    `SELECT id, username, password FROM users where username = "${username}" and password = "${password}"`,
    (err, result) => {
      if (err) res.json({ message: "ERROR LOGIN", error: err, status: 500 });
      if (result.length == 0) {
        res.json({ message: "Username or Password Incorrect", status: 1 });
        return;
      }
      res.json({
        token: btoa(`${username}-${new Date().toJSON()}`),
        user_id: result[0].id,
        status: 0,
      });
    }
  );
};
*/
export { /*registerUser, loginUser*/ };
