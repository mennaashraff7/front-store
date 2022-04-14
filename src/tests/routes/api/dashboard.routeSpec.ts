import supertest from 'supertest';
import db from '../../../database';
import app from '../../../server';
import UserModel from '../../../models/user';
import User from '../../../types/userType';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();
const request = supertest(app);
const token = jwt.sign({user: [userModel]},process.env.TOKEN_SECRET as string);
 describe('Test dashboard API methods', () => {
it('should get all users having orders', async () => {
    const res = await request
      .get('/api/dashboard/users-with-orders')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);  
  });
});