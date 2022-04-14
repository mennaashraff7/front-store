import Product from "../types/productType"
import db from "../database";

export class product
{
    async createProduct(P:Product) :Promise<Product>{
        try {
            const conn = await db.connect();
            const sql = `INSERT INTO product (name,price) VALUES ($1,$2) returning id,name,price;`;
            const result = await conn.query(sql,[P.name,P.price]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to create Product'
            );
        }
    }
    async getAllProducts() :Promise<Product[]>{
        try {
            const conn = await db.connect();
            const sql = `SELECT * FROM product`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows; 
        } catch (error) {
            throw new Error(
                'unable to get all products'
            );
        }
    }
    async getOneProduct(id:Number) :Promise<Product>{
        try {
            const conn = await db.connect();
            const sql = `SELECT id,name,price FROM product WHERE id=($1)`;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to get this product'
            );
        }
    }
    async UpdateProduct(P:Product) :Promise<Product>{
        try {
          
            const connection = await db.connect()
            const sql = "UPDATE product SET name = $2, price = $3 WHERE id = $1 RETURNING id,name,price"
             const {rows} = await connection.query(sql, [P.id,P.name, P.price])

             connection.release()

             return rows[0]

        } catch (error) {
            throw new Error(
                'unable to update Product'
            );
        }
    }
    async DeleteProduct(id:Number) :Promise<Product>{
        try {
            const conn = await db.connect();
            const sql = `DELETE FROM product WHERE id=($1) 
                                           returning id,name,price;
                                          `;
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(
                'unable to get this product'
            );
        }
    }
}

export default product;
