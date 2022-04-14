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
const user_1 = __importDefault(require("../../models/user"));
const database_1 = __importDefault(require("../../database"));
const userModel = new user_1.default();
describe('User Model', () => {
    describe('Test methods exist', () => {
        it('should have an index method', () => {
            expect(userModel.getAllUsers).toBeDefined();
        });
        it('should have a show method', () => {
            expect(userModel.getOneUser).toBeDefined();
        });
        it('should have a create method', () => {
            expect(userModel.create).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(userModel.DeleteUser).toBeDefined();
        });
        it('should have an Authenticate method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('Test Model logic', () => {
        const user = {
            firstname: 'test',
            lastname: 'User',
            password: 'test123'
        };
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
            yield connection.query(sql);
            connection.release();
        }));
        it('Create method should return a User', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create(user);
            expect(createdUser.id).toEqual(1);
        }));
        it('Index method should return All available users in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userModel.getAllUsers();
            expect(users[0].firstname).toBe('test');
        }));
        it('Show method should return testUser when called with ID (1)', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedUser = yield userModel.getOneUser(1);
            expect(returnedUser.id).toBe(1);
        }));
        it('Edit method should return a user with edited attributes', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                id: 1,
                firstname: 'menna',
                lastname: 'ashraf',
                password: 'test123'
            };
            const updatedUser = yield userModel.Update(user);
            expect(updatedUser.firstname).toBe('menna');
            expect(updatedUser.lastname).toBe('ashraf');
        }));
        // it('Authenticate method should return the authenticated user', async () => {
        //   const authenticatedUser = await userModel.authenticate('mohammedelzanaty', 'test123');
        //   if (authenticatedUser) {
        //     expect(authenticatedUser.firstname).toBe('Mohammed');
        //     expect(authenticatedUser.lastname).toBe('Elzanaty');
        //   }
        // });
        it('Authenticate method should return null for wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield userModel.authenticate('mennaAshraf', 'fakeuser');
            expect(authenticatedUser).toBe(null);
        }));
        it('Delete method should delete user from DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedUser = yield userModel.DeleteUser(1);
            expect(deletedUser.id).toBe(1);
        }));
    });
});
