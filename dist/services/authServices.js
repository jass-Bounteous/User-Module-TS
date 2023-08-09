"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.generateTokens = void 0;
const jwt = require("jsonwebtoken");
function generateTokens(user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    return { accessToken, refreshToken };
}
exports.generateTokens = generateTokens;
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20m",
    });
}
exports.generateAccessToken = generateAccessToken;
