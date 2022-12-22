import { Response } from "express";
import { pool } from "../config/mysql";
import { RegisterUser } from "../interfaces/user.interface";

const registerUser = async (body: RegisterUser, res: Response) => {
  try {
    let { username, email, first_name, last_name, password } = body;
    let [result]: any = await pool.query(
      `INSERT INTO users(username, email, first_name, last_name, password) VALUES("${username}", "${email}", "${first_name}", "${last_name}", "${password}")`
    );
    res.json({
      message: "Success",
      status: 0,
      user_id: result[0].id,
      token: btoa(`${username}-${new Date().toJSON()}`),
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
    console.log("user id");
    console.log(result[0].id);
    res.json({
      token: btoa(`${username}-${new Date().toJSON()}`),
      user_id: result[0].id,
      status: 0,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: 500,
      message: "ERROR LOGIN USER",
    });
  }
};

export { registerUser, loginUser };
