"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_1 = __importStar(require("../../../models/user"));
const server_1 = __importDefault(require("../../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new user_1.default();
const request = (0, supertest_1.default)(server_1.default);
//let token: string = '';
const token = jsonwebtoken_1.default.sign({ user: [user_1.user] }, process.env.TOKEN_SECRET);
describe('User API Endpoints', () => {
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
        const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
        yield connection.query(sql);
        connection.release();
    }));
    describe('Test CRUD API methods', () => {
        it('should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstname: 'Test2',
                lastname: 'User2',
                password: 'test123'
            });
            expect(res.status).toBe(200);
            const { id, firstname, lastname } = res.body.data;
            expect(firstname).toBe('Test2');
            expect(lastname).toBe('User2');
        }));
        it('should delete user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete('/api/users/2')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        }));
        it('should get list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        }));
        it('should get user info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/users/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        }));
        it('should update user info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch('/api/users/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                id: 1,
                firstname: 'menna',
                lastname: 'ashraf',
                password: 'test123'
            });
            expect(res.status).toBe(200);
        }));
    });
});
