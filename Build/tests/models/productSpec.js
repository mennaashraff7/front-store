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
const product_1 = __importDefault(require("../../models/product"));
const database_1 = __importDefault(require("../../database"));
const productModel = new product_1.default();
describe('Product Model', () => {
    describe('Test methods exist', () => {
        it('should have an index method', () => {
            expect(productModel.getAllProducts).toBeDefined();
        });
        it('should have a show method', () => {
            expect(productModel.getOneProduct).toBeDefined();
        });
        it('should have a create method', () => {
            expect(productModel.createProduct).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(productModel.DeleteProduct).toBeDefined();
        });
    });
    describe('Test Model logic', () => {
        const product = {
            name: 'product name',
            price: 9.99
        };
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM product;\n ALTER SEQUENCE product_id_seq RESTART WITH 1;\n';
            yield connection.query(sql);
            connection.release();
        }));
        it('Create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.createProduct(product);
            expect(createdProduct).toBeDefined();
        }));
        it('Index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield productModel.getAllProducts();
            expect(products[0].name).toBeTruthy();
        }));
        it('Show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedProduct = yield productModel.getOneProduct(1);
            expect(returnedProduct).toBeTruthy();
        }));
        it('Edit method should return a product with edited attributes', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedProduct = yield productModel.UpdateProduct({
                id: 1,
                name: 'product name edited',
                price: 10
            });
            expect(returnedProduct.name).toBeTruthy();
        }));
        it('Delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedProduct = yield productModel.DeleteProduct(1);
            expect(deletedProduct.id).toBeTruthy();
        }));
    });
});
