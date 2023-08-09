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
exports.refreshToken = exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userServices_1 = require("../services/userServices");
const authServices_1 = require("../services/authServices");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.email) ? req.body.email : "";
        const password = req.body.password;
        if (!(email && password))
            return res.status(400).json({ msg: "Bad Request" });
        const dbUser = yield userSchema_1.default.findOne({
            email,
        }); // Use findOne instead of find
        if (!dbUser)
            return res.status(401).json({ msg: "Invalid Email" });
        bcrypt_1.default.compare(password, dbUser.password, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res
                    .status(500)
                    .json({ msg: "Error comparing passwords:", err });
            }
            else {
                if (!result) {
                    return res.status(401).json({ msg: "Invalid Password" });
                }
                else {
                    const tokens = yield (0, authServices_1.generateTokens)(Object.assign({}, dbUser));
                    // Update authToken in DB
                    const updatedData = yield userSchema_1.default.findOneAndUpdate({ email }, { $set: { authToken: tokens.accessToken } }, { new: true });
                    return res.json({
                        msg: "Welcome " + dbUser.name,
                        data: updatedData,
                        tokens,
                    });
                }
            }
        }));
    }
    catch (e) {
        return res.status(500).json({ msg: "Error oocured while logging in:", e });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    if ((0, userServices_1.isInValid)(userData)) {
        res.status(400).json({ msg: "Bad request" });
        return;
    }
    try {
        // Check Duplication of Employee Code
        const dbUser = yield userSchema_1.default.findOne({ email: userData.email });
        if (dbUser)
            return res.status(400).json({
                msg: "This Email has already been registered",
            });
        const saltPassword = yield bcrypt_1.default.genSalt(10);
        userData.password = yield bcrypt_1.default.hash(userData.password, saltPassword);
        console.log(userData);
        const resData = yield (0, userServices_1.addUserService)(userData);
        console.log(resData);
        res.status(201).json({ msg: "User added successfully", data: resData });
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
});
exports.signup = signup;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.headers.token
        ? req.headers.token.toString()
        : "";
    if (!refreshToken)
        res.status(401).json({ msg: "Bad request" });
    try {
        const user = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET
            ? process.env.REFRESH_TOKEN_SECRET.toString()
            : "");
        if (typeof user == "string")
            return res.status(500).json({ msg: "Returned a string" });
        const accessToken = yield (0, authServices_1.generateAccessToken)(user);
        // Update authToken in DB
        const updatedData = yield userSchema_1.default.findOneAndUpdate({ email: (user === null || user === void 0 ? void 0 : user._doc.email) ? user._doc.email : "" }, { $set: { authToken: accessToken } }, { new: true });
        res.status(200).json({ accessToken, updatedData });
    }
    catch (e) {
        return res.status(500).json({ msg: "Error comparing tokens!" });
    }
});
exports.refreshToken = refreshToken;
