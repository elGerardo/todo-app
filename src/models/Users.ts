import { Response } from "express";
import { connection } from "../config/mysql";
import { RegisterUser, LoginUser } from "../interfaces/user.interface";

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

const loginUser = async (body: LoginUser, res: Response) => {
  let { username, password } = body;
  await connection.query(
    `SELECT username, password FROM users where username = "${username}" and password = "${password}"`,
    (err, result) => {
      if (err) res.json({ message: "ERROR LOGIN", error: err, status: 500 });
      if (result.length == 0) {
        res.json({ message: "username or password incorrect", status: 500 });
        return;
      }
      res.json({ token: btoa(`${username}-${new Date().toJSON()}`) });
    }
  );
};

export { registerUser, loginUser };
