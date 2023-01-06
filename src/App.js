"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const sequelize_1 = require("./config/sequelize");
const port = process.env.PORT || 3002;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.router);
dotenv_1.default.config();
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.sequelize
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`⚡️[server]: Server is running`);
        process.env.ENVIRONMENT === "local" &&
            console.log(`at https://localhost:${port}`);
    }))
        .catch((error) => {
        console.error("ERROR TO BUILD", error);
    });
}));
