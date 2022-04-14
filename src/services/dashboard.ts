import db from '../database'

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      
      const conn = await db.connect()
      const sql = 'SELECT name, price, order_id FROM product INNER JOIN order_products ON product.id = order_products.product_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }
    // Get all users that have made orders
  async usersWithOrders(): Promise<{firstName: string, lastName: string}[]> {
      try {
        
        const conn = await db.connect()
        const sql = 'SELECT firstname, lastname FROM users INNER JOIN orders ON users.id = orders.user_id'
  
        const result = await conn.query(sql)
  
        conn.release()
  
        return result.rows
      } catch (err) {
        throw new Error(`unable get users with orders: ${err}`)
      } 
    }
      // Get all users that have made orders
 async fiveMostExpensive(): Promise<{name: string, price: number}[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`)
    } 
  }
    
}