"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UsersControllers_1 = require("../controllers/UsersControllers");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/register", UsersControllers_1.register);
router.post("/login", UsersControllers_1.login);
router.get("/test_encode", (req, res) => {
    const date = new Date().toJSON();
    let encode = btoa(date);
    res.send(encode);
});
