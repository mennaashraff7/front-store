import supertest from 'supertest';
import db from '../../../database';
import app from '../../../server';
import UserModel from '../../../models/user';
import User from '../../../types/userType';
import jwt from 'jsonwebtoken';


const userModel = new UserModel();
const request = supertest(app);
const token = jwt.sign({user: [userModel]},process.env.TOKEN_SECRET as string);


describe('Products API Endpoints', () => {
  beforeAll(async () => {
    const user : User = {
     
      firstname: 'Test',
      lastname: 'User',
      password: 'test123'
    }

    await userModel.create(user);
  });
  afterAll(async () => {
    // clean db
    const connection = await db.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM product;\nALTER SEQUENCE product_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe('Test CRUD API methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'product name',
          price: 9.99,
        });
      expect(res.status).toBe(200);
     
    });

    it('should get list of products', async () => {
      const res = await request
        .get('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
  
    });

    it('should get product info', async () => {
      const res = await request
        .get('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
  
    });

    it('should update product info', async () => {
      const res = await request
        .patch('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          name: 'product name',
          price: 20,
        });
      expect(res.status).toBe(200);
    });

    it('should delete product', async () => {
      const res = await request
        .delete('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});