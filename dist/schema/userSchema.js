"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userTemplate = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    emp_code: {
        type: String,
        require: true,
    },
    dob: {
        type: Date,
        require: false,
    },
    authToken: {
        type: String,
        require: false,
    },
});
exports.default = mongoose_1.default.model("user", userTemplate);
