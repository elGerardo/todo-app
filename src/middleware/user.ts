import { NextFunction, Response } from "express";

let auth = (headers:any, res:Response, next:NextFunction) => {
    if (headers.token !== undefined) {
      next();
      return;
    }
    res.json({ message: "TOKEN NECESSARY", status: 400 });
    return;
  }

export { auth }