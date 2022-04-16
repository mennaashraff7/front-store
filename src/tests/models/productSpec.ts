import ProductModel from '../../models/product';
import Product from '../../types/productType';
import db from '../../database';

const productModel = new ProductModel();

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
    const product : Product= {
      name: 'product name',
      price: 9.99
    };

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM product;\n ALTER SEQUENCE product_id_seq RESTART WITH 1;\n';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should add a product', async () => {
      const createdProduct = await productModel.createProduct(product);
      expect(createdProduct).toBeDefined();
   
    });

    it('Index method should return a list of products', async () => {
      const products = await productModel.getAllProducts();
      expect(products[0].name).toBeTruthy();
    });

    it('Show method should return the correct product', async () => {
      const returnedProduct = await productModel.getOneProduct(1);
      expect(returnedProduct).toBeTruthy();
    });

    it('Edit method should return a product with edited attributes', async () => {
      const returnedProduct = await productModel.UpdateProduct({
        id: 1,
        name: 'product name edited',
        price: 10
      });
      expect(returnedProduct.name).toBeTruthy();
    });

    it('Delete method should remove the product', async () => {
      const deletedProduct = await productModel.DeleteProduct(1);
      expect(deletedProduct.id).toBeTruthy();
    });
  });
});