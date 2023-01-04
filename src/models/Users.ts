import { Response } from "express";
import { RegisterUser } from "../interfaces/user.interface";
import { sequelize } from "../config/sequelize";
import { DataTypes } from "sequelize";

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  image: DataTypes.STRING,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  password: DataTypes.STRING,
});

const registerUser = async (body: RegisterUser, res: Response) => {
  const t = await sequelize.transaction();
  try {
    let { username, password } = body;

    let result: any = await Users.create(
      {
        username: `${username}`,
        password: `${password}`,
      },
      {
        transaction: t,
      },
    );

    await t.commit();

    let content = {
      username: `${username}`,
      user_id: `${result.toJSON().id}`,
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
    await t.rollback();
    console.log(e);
    res.json({
      status: 500,
      message: "ERROR REGISTER USER",
    });
  }
};

const loginUser = async (headers: any, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { username, password } = headers;

    const [result]: any = await Users.findAll({
      attributes: ["id", "username", "password"],
      where: {
        username: `${username}`,
        password: `${password}`,
      },
      transaction: t
    });

    await t.commit();

    if (result.length !== 0) {
      let content = {
        username: `${username}`,
        user_id: `${result.toJSON().id}`,
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
    await t.rollback();
    console.log(e);
    res.json({
      status: 400,
      message: "Username or Password Incorrect",
    });
  }
};

export { Users, registerUser, loginUser };
