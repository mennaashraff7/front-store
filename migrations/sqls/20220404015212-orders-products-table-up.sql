/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    product_id bigint,
    FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
   
);