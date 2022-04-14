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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../../database"));
const server_1 = __importDefault(require("../../../server"));
const user_1 = __importDefault(require("../../../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new user_1.default();
const request = (0, supertest_1.default)(server_1.default);
const token = jsonwebtoken_1.default.sign({ user: [userModel] }, process.env.TOKEN_SECRET);
describe('Orders API Endpoints', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstname: 'Test',
            lastname: 'User',
            password: 'test123'
        };
        yield userModel.create(user);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // clean db
        const connection = yield database_1.default.connect();
        const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
        yield connection.query(sql);
        connection.release();
    }));
    describe('Test Authenticate method', () => {
        it('should be able to authenticate to get token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstname: 'testUser',
                lastname: 'test123',
                password: 'test123'
            });
            expect(res.status).toBe(200);
        }));
    });
    describe('Test CRUD API methods', () => {
        it('should create new order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                status: 'active',
                user_id: 1
            });
            expect(res.status).toBe(200);
        }));
        it('should get list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        }));
        it('should get order info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/orders/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        }));
        it('should update order info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch('/api/orders/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                id: 1,
                status: "completed",
                user_id: 1
            });
            expect(res.status).toBe(200);
        }));
        it('should delete order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete('/api/orders/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        }));
    });
});
