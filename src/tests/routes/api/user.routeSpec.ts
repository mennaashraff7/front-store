import supertest from 'supertest';
import db from '../../../database';
import UserModel, { user } from '../../../models/user';
import User from '../../../types/userType';
import app from '../../../server';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();
const request = supertest(app);
//let token: string = '';
const token = jwt.sign({user: [user]},process.env.TOKEN_SECRET as string);
describe('User API Endpoints', () => {
  beforeAll(async () => {
    const user:User = {
      
      firstname: 'Test',
      lastname: 'User',
      password: 'test123'
    };

    await userModel.create(user);
  });
  afterAll(async () => {
    // clean db
    const connection = await db.connect();
    const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
 

  describe('Test CRUD API methods', () => {
    it('should create new user', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstname: 'Test2',
          lastname: 'User2',
          password: 'test123'
        });
      expect(res.status).toBe(200);
      const { id, firstname, lastname } = res.body.data;
      expect(firstname).toBe('Test2');
      expect(lastname).toBe('User2');
    });
 
    it('should delete user', async () => {
      const res = await request
        .delete('/api/users/2')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should get list of users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should get user info', async () => {
      const res = await request
        .get('/api/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should update user info', async () => {
      const res = await request
        .patch('/api/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          firstname: 'menna',
          lastname: 'ashraf',
          password: 'test123'
        });
      expect(res.status).toBe(200);
    });
  });
});