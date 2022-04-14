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
exports.product = void 0;
const database_1 = __importDefault(require("../database"));
class product {
    createProduct(P) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO product (name,price) VALUES ($1,$2) returning id,name,price;`;
                const result = yield conn.query(sql, [P.name, P.price]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('unable to create Product');
            }
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM product`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('unable to get all products');
            }
        });
    }
    getOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT id,name,price FROM product WHERE id=($1)`;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('unable to get this product');
            }
        });
    }
    UpdateProduct(P) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "UPDATE product SET name = $2, price = $3 WHERE id = $1 RETURNING id,name,price";
                const { rows } = yield connection.query(sql, [P.id, P.name, P.price]);
                connection.release();
                return rows[0];
            }
            catch (error) {
                throw new Error('unable to update Product');
            }
        });
    }
    DeleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM product WHERE id=($1) 
                                           returning id,name,price;
                                          `;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('unable to get this product');
            }
        });
    }
}
exports.product = product;
exports.default = product;
