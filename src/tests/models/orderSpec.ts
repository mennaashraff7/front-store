import db from '../../database';
import User from '../../types/userType';
import Product from '../../types/productType';
import Order from '../../types/orderType';
import OrderModel from '../../models/order';
import user from '../../models/user';
import product from '../../models/product';

const u = new user();
const P = new product();
const orderModel = new OrderModel();

describe('Order Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(orderModel.getAllOrders).toBeDefined();
    });

    it('should have a show method', () => {
      expect(orderModel.getOneOrder).toBeDefined();
    });

    it('should have a create method', () => {
      expect(orderModel.createOrder).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(orderModel.DeleteOrder).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const user : User= {
    
      firstname: 'Test',
      lastname: 'User',
      password: 'test123'
    };

    const product : Product= {
      name: 'product name',
      price: 20
    };

    const order : Order = {
      user_id: 1,
      status: 'active'
    };

    beforeAll(async () => {
      // setup user/product to test with
      await u.create(user);
      await P.createProduct(product);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM product;\n ALTER SEQUENCE product_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should add an order', async () => {
      const createdOrder = await orderModel.createOrder(order);
      expect(createdOrder.id).toEqual(1);
    });

    it('Index method should return a list of orders', async () => {
      const orders = await orderModel.getAllOrders();
      expect(orders[0].id).toBe(1);
    });

    it('Show method should return the correct order', async () => {
      const returnedOrder = await orderModel.getOneOrder(1);
      expect(returnedOrder.id).toEqual(1);
    });

    it('Edit method should return an order with edited attributes', async () => {
      const returnedOrder = await orderModel.UpdateOrder({
        id: 1,
        status: 'completed',
        user_id: 1
      });
      expect(returnedOrder.status).toBe('completed');
    });

    it('Delete method should remove the order', async () => {
      const deletedOrder = await orderModel.DeleteOrder(1);
      expect(deletedOrder.id).toBe(1);
    });
  });
});