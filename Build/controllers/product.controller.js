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
exports.DeleteProduct = exports.UpdateProduct = exports.getOneProduct = exports.getAllProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
//handler product file
const product = new product_1.default();
//handling CRUD oprations
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield product.createProduct(req.body);
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield product.getAllProducts();
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProducts = getAllProducts;
const getOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield product.getOneProduct(req.params.id);
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneProduct = getOneProduct;
const UpdateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield product.UpdateProduct(req.body);
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateProduct = UpdateProduct;
const DeleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield product.DeleteProduct(req.params.id);
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteProduct = DeleteProduct;
