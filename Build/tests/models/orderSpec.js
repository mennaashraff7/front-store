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
const database_1 = __importDefault(require("../../database"));
const order_1 = __importDefault(require("../../models/order"));
const user_1 = __importDefault(require("../../models/user"));
const product_1 = __importDefault(require("../../models/product"));
const u = new user_1.default();
const P = new product_1.default();
const orderModel = new order_1.default();
describe('Order Model', () => {
    describe('Test methods exist', () => {
        it('should have an index method', () => {
            expect(orderModel.getAllOrders).toBeDefined();
        });
        it('should have a show method', () => {
            expect(orderModel.getOneOrder).toBeDefined();
        });
        it('should have a create method', () => {
            expect(orderModel.createOrder).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(orderModel.DeleteOrder).toBeDefined();
        });
    });
    describe('Test Model logic', () => {
        const user = {
            firstname: 'Test',
            lastname: 'User',
            password: 'test123'
        };
        const product = {
            name: 'product name',
            price: 20
        };
        const order = {
            user_id: 1,
            status: 'active'
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            // setup user/product to test with
            yield u.create(user);
            yield P.createProduct(product);
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM product;\n ALTER SEQUENCE product_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
            yield connection.query(sql);
            connection.release();
        }));
        it('Create method should add an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdOrder = yield orderModel.createOrder(order);
            expect(createdOrder.id).toBeTruthy();
        }));
        it('Index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield orderModel.getAllOrders();
            expect(orders[0].id).toBeTruthy();
        }));
        it('Show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedOrder = yield orderModel.getOneOrder(1);
            expect(returnedOrder.id).toBeTruthy();
        }));
        it('Edit method should return an order with edited attributes', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedOrder = yield orderModel.UpdateOrder({
                id: 1,
                status: 'completed',
                user_id: 1
            });
            expect(returnedOrder.status).toBe('completed');
        }));
        it('Delete method should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedOrder = yield orderModel.DeleteOrder(1);
            expect(deletedOrder.id).toBeTruthy();
        }));
    });
});
