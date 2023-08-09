"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./middleware/logger"));
const dbConfig_1 = __importDefault(require("./dbConfig"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_1.default);
(0, dbConfig_1.default)();
app.use("/app", authRouter_1.default);
app.get("/", (req, res, next) => {
    console.log("Try /login or /signup");
    res.status(200).send("Try /login or /signup");
});
app.listen(5000, () => console.log("Server started"));
