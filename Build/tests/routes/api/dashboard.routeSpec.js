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
const server_1 = __importDefault(require("../../../server"));
const user_1 = __importDefault(require("../../../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new user_1.default();
const request = (0, supertest_1.default)(server_1.default);
const token = jsonwebtoken_1.default.sign({ user: [userModel] }, process.env.TOKEN_SECRET);
describe('Test dashboard API methods', () => {
    it('should get all users having orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/api/dashboard/users-with-orders')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
});
