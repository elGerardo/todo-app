import { NextFunction, Request, Response, Router } from "express";
import {
  create,
  get,
  find,
  deleteItem,
  updateList,
} from "../controllers/TasksController";
import { auth } from "../middleware/user";
import { validateAction } from "../middleware/tasks";

const router = Router();

//validate if has a token
router.use(({ headers }: Request, res: Response, next: NextFunction) => {
  return auth(headers, res, next);
});

router.use(
  "/get",
  ({ headers }: Request, res: Response, next: NextFunction) => {
    return validateAction(headers, res, next, "read");
  }
);
router.get("/get", get);

router.use(
  "/find",
  ({ headers }: Request, res: Response, next: NextFunction) => {
    return validateAction(headers, res, next, "read");
  }
);
router.get("/find", find);

router.use(
  "/create",
  ({ headers }: Request, res: Response, next: NextFunction) => {
    return validateAction(headers, res, next, "create");
  }
);
router.post("/create", create);

router.use(
  "/delete",
  ({ headers }: Request, res: Response, next: NextFunction) => {
    return validateAction(headers, res, next, "delete");
  }
);
router.delete("/delete", deleteItem);

router.use(
  "/updateList",
  ({ headers }: Request, res: Response, next: NextFunction) => {
    return validateAction(headers, res, next, "update");
  }
);
router.post("/updateList", updateList);


router.get("/test_task", (req: Request, res: Response) => {
  res.json("Success");
});

export { router };
