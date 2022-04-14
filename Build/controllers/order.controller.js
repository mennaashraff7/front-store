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
exports.addProduct = exports.DeleteOrder = exports.UpdateOrder = exports.getOneOrder = exports.getAllOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
//handler order file
const order = new order_1.default();
//handling CRUD oprations
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield order.createOrder(req.body);
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield order.getAllOrders();
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrders = getAllOrders;
const getOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield order.getOneOrder(req.params.id);
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneOrder = getOneOrder;
const UpdateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield order.UpdateOrder(req.body);
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateOrder = UpdateOrder;
const DeleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield order.DeleteOrder(req.params.id);
        res.json({
            msg: "done",
            data: Object.assign({}, u)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteOrder = DeleteOrder;
const addProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = _req.params.id;
    const productId = _req.body.product_id;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = yield order.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.addProduct = addProduct;
