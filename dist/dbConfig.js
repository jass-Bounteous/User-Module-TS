"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const DbConnect = () => {
    (0, dotenv_1.config)();
    const dbUrl = process.env.dbUrl ? process.env.dbUrl.toString() : "";
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose_1.default
        .connect(dbUrl, options)
        .then(() => console.log("DB Connected!!"))
        .catch((err) => console.log("Error: " + err));
};
exports.default = DbConnect;
