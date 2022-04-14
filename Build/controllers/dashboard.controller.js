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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fiveMostExpensive = exports.usersWithOrders = exports.productsInOrders = void 0;
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const productsInOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.productsInOrders();
    res.json(products);
});
exports.productsInOrders = productsInOrders;
const usersWithOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield dashboard.usersWithOrders();
    res.json(users);
});
exports.usersWithOrders = usersWithOrders;
const fiveMostExpensive = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield dashboard.fiveMostExpensive();
    res.json(users);
});
exports.fiveMostExpensive = fiveMostExpensive;
