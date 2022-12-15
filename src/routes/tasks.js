"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const TasksController_1 = require("../controllers/TasksController");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", TasksController_1.create);
