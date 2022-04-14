import User from "../types/userType";
import db from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
} = process.env;


export class user{
    async create(u:User) :Promise<User>{
        try {
            const conn = await db.connect();
            const sql = `INSERT INTO users (firstname,lastname,password) VALUES ($1,$2,$3) returning id,firstname,lastname`;
            const hash = bcrypt.hashSync(
                u.password + BCRYPT_PASSWORD, 
                parseInt(SALT_ROUNDS as string)
              );
            const result = await conn.query(sql,[u.firstname,u.lastname,hash]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to create user'
            );
        }
    }
    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await db.connect()
        const sql = 'SELECT password FROM users WHERE firstname=($1)'
    
        const result = await conn.query(sql, [username])
    
        console.log(password+BCRYPT_PASSWORD)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password)) {
            return user
          }
        }
    
        return null
      }
    async getAllUsers() :Promise<User[]>{
        try {
            const conn = await db.connect();
            const sql = `SELECT id,firstname,lastname FROM users`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows; 
        } catch (error) {
            throw new Error(
                'unable to get all user'
            );
        }
    }
    async getOneUser(id:Number) :Promise<User>{
        try {
            const conn = await db.connect();
            const sql = `SELECT id,firstname,lastname FROM users WHERE id=($1)`;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to get this user'
            );
        }
    }
    async Update(u:User) :Promise<User>{
        try {
    
           const connection = await db.connect();
            const sql = "UPDATE users SET firstname = $2, lastname = $3, password= $4 WHERE id = $1 RETURNING id,firstname,lastname"
          
             const {rows} = await connection.query(sql, [u.id,u.firstname, u.lastname,u.password])

             connection.release()

             return rows[0]

        } catch (error) {
            throw new Error(
                'unable to update user'
            );
        }
    }
    async DeleteUser(id:Number) :Promise<User>{
        try {
            const conn = await db.connect();
            const sql = `DELETE FROM users WHERE id=($1) 
                                           returning id,firstname,lastname;
                                           `;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to get this user'
            );
        }
    }
}

export default user;