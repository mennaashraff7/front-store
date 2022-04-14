"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const authHeader = (req.headers.authorization);
        const token = authHeader.split(' ')[1];
        const decode = (jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET));
        next();
    }
    catch (err) {
        res.status(401);
        res.json(` 401: Unauthorized (Access denied)`);
    }
};
exports.default = verifyToken;
