"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const methodLogger = (req, res, next) => {
    console.log(`Method.Entry, URL: ${req.url} type: ${req.method}`);
    next();
};
exports.default = methodLogger;
