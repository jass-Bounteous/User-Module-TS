"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authRouter = express_1.default.Router();
authRouter.post("/login", authController_1.login);
authRouter.post("/signup", authController_1.signup);
authRouter.post("/refreshToken", authController_1.refreshToken);
exports.default = authRouter;
