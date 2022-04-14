"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3030";
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3030, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
