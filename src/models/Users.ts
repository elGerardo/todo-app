import { Response } from "express";
import { RegisterUser } from "../interfaces/user.interface";

const registerUser = async (body: RegisterUser, res: Response) => {
    let {username, email, first_name, last_name, password} = body;
}

export { registerUser }