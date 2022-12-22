"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const TasksController_1 = require("../controllers/TasksController");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/get", TasksController_1.get);
router.get("/find", TasksController_1.find);
