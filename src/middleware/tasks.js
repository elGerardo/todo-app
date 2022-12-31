"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAction = void 0;
let validateAction = (headers, res, next, type) => {
    const token = headers.token;
    const tokenData = JSON.parse(atob(token));
    if (tokenData.access.includes(type)) {
        next();
        return;
    }
    res.json({ message: "YOU DON'T HAVE PERMISSIONS", status: 403 });
    return;
};
exports.validateAction = validateAction;
