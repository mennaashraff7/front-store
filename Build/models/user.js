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
exports.user = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS, } = process.env;
class user {
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO users (firstname,lastname,password) VALUES ($1,$2,$3) returning id,firstname,lastname`;
                const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                const result = yield conn.query(sql, [u.firstname, u.lastname, hash]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('unable to create user');
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE firstname=($1)';
            const result = yield conn.query(sql, [username]);
            console.log(password + BCRYPT_PASSWORD);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(user);
                if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT id,firstname,lastname FROM users`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('unable to get all user');
            }
        });
    }
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT id,firstname,lastname FROM users WHERE id=($1)`;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('unable to get this user');
            }
        });
    }
    Update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "UPDATE users SET firstname = $2, lastname = $3, password= $4 WHERE id = $1 RETURNING id,firstname,lastname";
                const { rows } = yield connection.query(sql, [u.id, u.firstname, u.lastname, u.password]);
                connection.release();
                return rows[0];
            }
            catch (error) {
                throw new Error('unable to update user');
            }
        });
    }
    DeleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM users WHERE id=($1) 
                                           returning id,firstname,lastname;
                                           `;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('unable to get this user');
            }
        });
    }
}
exports.user = user;
exports.default = user;
