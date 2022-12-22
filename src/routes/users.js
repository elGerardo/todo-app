"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/register", UsersController_1.register);
router.post("/login", UsersController_1.login);
