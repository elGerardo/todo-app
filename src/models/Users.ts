import { Response } from "express";
import { pool } from "../config/mysql";
import { RegisterUser } from "../interfaces/user.interface";

const registerUser = async (body: RegisterUser, res: Response) => {
  try {
    let { username, email, password } = body;
    let [result]: any = await pool.query(
      `INSERT INTO users(username, email, password) VALUES("${username}", "${email}", "${password}")`
    );

    let content = {
      username: `${username}`,
      user_id: `${result.insertId}`,
      login_datetime: `${new Date().toJSON()}`,
      type: "user",
      access: ["create", "read", "update", "delete"],
    };

    res.json({
      message: "Success",
      status: 0,
      token: btoa(JSON.stringify(content)),
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: 500,
      message: "ERROR REGISTER USER",
    });
  }
};

const loginUser = async (headers: any, res: Response) => {
  try {
    let { username, password } = headers;
    let [result]: any = await pool.query(
      `SELECT id, username, password FROM users where username = "${username}" and password = "${password}"`
    );

    if (result.length !== 0) {
      let content = {
        username: `${username}`,
        user_id: `${result[0].id}`,
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
  } catch (e) {
    console.log(e);
    res.json({
      status: 400,
      message: "Username or Password Incorrect",
    });
  }
};

export { registerUser, loginUser };
