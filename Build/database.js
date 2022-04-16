"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV, BCRYPT_PASSWORD, SALT_ROUNDS, } = process.env;
const client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: NODE_ENV === 'development' ? POSTGRES_DB : POSTGRES_DB_TEST,
    port: parseInt(POSTGRES_PORT, 10),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});
exports.default = client;
