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
exports.DeleteUser = exports.UpdateUser = exports.getOneUser = exports.getAllUsers = exports.create = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET, } = process.env;
//handler user file
const user = new user_1.default();
//handling CRUD oprations
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield user.create(req.body);
        var token = jsonwebtoken_1.default.sign({ user: u }, TOKEN_SECRET);
        const resResult = {
            data: Object.assign({}, u),
            token: token
        };
        res.json(resResult);
    }
    catch (error) {
        next(error);
        res.status(400);
    }
});
exports.create = create;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield user.getAllUsers();
        const resResult = {
            data: Object.assign({}, u)
        };
        res.json(resResult);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield user.getOneUser(req.params.id);
        const resResult = {
            data: Object.assign({}, u)
        };
        res.json(resResult);
    }
    catch (error) {
        next(error);
    }
});
exports.getOneUser = getOneUser;
const UpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield user.Update(req.body);
        const resResult = {
            data: Object.assign({}, u),
        };
        res.json(resResult);
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateUser = UpdateUser;
const DeleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield user.DeleteUser(req.params.id);
        const resResult = {
            data: Object.assign({}, u),
        };
        res.json(resResult);
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteUser = DeleteUser;
