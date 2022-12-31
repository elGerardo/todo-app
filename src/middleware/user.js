"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
let auth = (headers, res, next) => {
    if (headers.token !== undefined) {
        next();
        return;
    }
    res.json({ message: "TOKEN NECESSARY", status: 400 });
    return;
};
exports.auth = auth;
