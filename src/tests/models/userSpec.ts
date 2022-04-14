import UserModel from '../../models/user';
import db from '../../database';
import User from '../../types/userType';


const userModel = new UserModel();

describe('User Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(userModel.getAllUsers).toBeDefined();
    });

    it('should have a show method', () => {
      expect(userModel.getOneUser).toBeDefined();
    });

    it('should have a create method', () => {
      expect(userModel.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(userModel.DeleteUser).toBeDefined();
    });

    it('should have an Authenticate method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const user:User = {
      firstname: 'test',
      lastname: 'User',
      password: 'test123'
    };

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should return a User', async () => {
      const createdUser = await userModel.create(user);
      expect(createdUser.id).toEqual(1);
    });

    it('Index method should return All available users in DB', async () => {
      const users = await userModel.getAllUsers();

      expect(users[0].firstname).toBe('test');
    });

    it('Show method should return testUser when called with ID (1)', async () => {
      const returnedUser = await userModel.getOneUser(1);
      expect(returnedUser.id).toBe(1);
    
    });

    it('Edit method should return a user with edited attributes', async () => {
        const user :User  = {
            id: 1,
            firstname: 'menna',
            lastname:'ashraf',
            password: 'test123'
        };
      const updatedUser = await userModel.Update(user);
      expect(updatedUser.firstname).toBe('menna');
      expect(updatedUser.lastname).toBe('ashraf');
    });
    it('Authenticate method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticate('mennaAshraf', 'fakeuser');
      expect(authenticatedUser).toBe(null);
    });

    it('Delete method should delete user from DB', async () => {
      const deletedUser = await userModel.DeleteUser(1);
      expect(deletedUser.id).toBe(1);
    });
  });
});