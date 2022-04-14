"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./api/users.routes"));
const product_routes_1 = __importDefault(require("./api/product.routes"));
const order_routes_1 = __importDefault(require("./api/order.routes"));
const dashboard_routes_1 = __importDefault(require("./api/dashboard.routes"));
const routes = (0, express_1.Router)();
routes.use('/users', users_routes_1.default);
routes.use('/products', product_routes_1.default);
routes.use('/orders', order_routes_1.default);
routes.use('/dashboard', dashboard_routes_1.default);
exports.default = routes;
