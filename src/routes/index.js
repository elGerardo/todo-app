"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs_1 = require("fs");
const PATH_ROUTER = `${__dirname}`;
const router = (0, express_1.Router)();
exports.router = router;
const cleanFileName = (fileName) => {
    const file = fileName.split(".").shift();
    return file;
};
(0, fs_1.readdirSync)(PATH_ROUTER).filter((fileName) => {
    var _a;
    const cleanName = cleanFileName(fileName);
    if (cleanName !== "index") {
        (_a = `./${cleanName}`, Promise.resolve().then(() => __importStar(require(_a)))).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router);
        });
    }
});
