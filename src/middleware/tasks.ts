import { NextFunction, Response } from "express";

let validateAction = (headers: any, res: Response, next: NextFunction, type:string) => {
  const token: any = headers.token;
  const tokenData: any = JSON.parse(atob(token));
  if (tokenData.access.includes(type)) {
    next();
    return;
  }

  res.json({ message: "YOU DON'T HAVE PERMISSIONS", status: 403 });
  return;
};

export { validateAction };
