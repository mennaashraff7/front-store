import supertest from 'supertest';
import db from '../../../database';
import app from '../../../server';
import UserModel from '../../../models/user';
import User from '../../../types/userType';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();
const request = supertest(app);
const token = jwt.sign({user: [userModel]},process.env.TOKEN_SECRET as string);

describe('Orders API Endpoints', () => {
  beforeAll(async () => {
    const user: User = {
    
      firstname: 'Test',
      lastname: 'User',
      password: 'test123'
    } ;

    await userModel.create(user);
  });

  afterAll(async () => {
    // clean db
    const connection = await db.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });

  describe('Test Authenticate method', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstname: 'testUser',
          lastname: 'test123',
          password: 'test123'
        });
      expect(res.status).toBe(200);
    });
  });

  describe('Test CRUD API methods', () => {
    it('should create new order', async () => {
      const res = await request
        .post('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'active',
          user_id: 1
        });
      expect(res.status).toBe(200);
    });

    it('should get list of orders', async () => {
      const res = await request
        .get('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should get order info', async () => {
      const res = await request
        .get('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should update order info', async () => {
      const res = await request
        .patch('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          status: "completed",
          user_id: 1
        });
      expect(res.status).toBe(200);
    });

    it('should delete order', async () => {
      const res = await request
        .delete('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});