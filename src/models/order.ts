import Order from "../types/orderType"
import db from "../database";

export class order
{
    async createOrder(O:Order) :Promise<Order>{
        try {
            const conn = await db.connect();
            const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) returning *`;
            const result = await conn.query(sql,[O.status,O.user_id]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to create order'
            );
        }
    }
    async getAllOrders() :Promise<Order[]>{
        try {
            const conn = await db.connect();
            const sql = `SELECT * FROM orders`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows; 
        } catch (error) {
            throw new Error(
                'unable to get all orders'
            );
        }
    }
    async getOneOrder(id:Number) :Promise<Order>{
        try {
            const conn = await db.connect();
            const sql = `SELECT * FROM orders WHERE id=($1)`;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to get this order'
            );
        }
    }
    async UpdateOrder(O:Order) :Promise<Order>{
        try {
          
            const connection = await db.connect();
             const sql = "UPDATE orders SET status = $2, user_id = $3 WHERE id =($1) RETURNING id,status,user_id"
           
              const {rows} = await connection.query(sql, [O.id,O.status, O.user_id])
 
              connection.release()
 
              return rows[0]
 
         } catch (error) {
             throw new Error(
                 'unable to update order'
             );
         }
    }
    async DeleteOrder(id:Number) :Promise<Order>{
        try {
            const conn = await db.connect();
            const sql = `DELETE FROM orders WHERE id=($1) 
                                           returning *;
                                           `;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to delete this order'
            );
        }
    }
    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'

          const conn = await db.connect()
    
          const result = await conn.query(sql, [quantity, orderId, productId])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }
}

export default order;
