"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const TasksController_1 = require("../controllers/TasksController");
const user_1 = require("../middleware/user");
const tasks_1 = require("../middleware/tasks");
const router = (0, express_1.Router)();
exports.router = router;
//validate if has a token
router.use(({ headers }, res, next) => {
    return (0, user_1.auth)(headers, res, next);
});
router.use("/get", ({ headers }, res, next) => {
    return (0, tasks_1.validateAction)(headers, res, next, "read");
});
router.get("/get", TasksController_1.get);
router.use("/find", ({ headers }, res, next) => {
    return (0, tasks_1.validateAction)(headers, res, next, "read");
});
router.get("/find", TasksController_1.find);
router.use("/create", ({ headers }, res, next) => {
    return (0, tasks_1.validateAction)(headers, res, next, "create");
});
router.post("/create", TasksController_1.create);
router.use("/delete", ({ headers }, res, next) => {
    return (0, tasks_1.validateAction)(headers, res, next, "delete");
});
router.delete("/delete", TasksController_1.deleteItem);
router.use("/updateList", ({ headers }, res, next) => {
    return (0, tasks_1.validateAction)(headers, res, next, "update");
});
router.post("/updateList", TasksController_1.updateList);
router.get("/test_task", (req, res) => {
    res.json("Success");
});
