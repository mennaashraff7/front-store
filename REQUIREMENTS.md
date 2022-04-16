-------------------------------------------Endpoints-------------------------------------
-Orders:
1-GET http://localhost:3030/api/orders/
2-PATCH http://localhost:3030/api/orders/:id
3-Delete http://localhost:3030/api/orders/:id
4-POST http://localhost:3030/api/orders/

-Users:
1-GET http://localhost:3030/api/users/
2-PATCH http://localhost:3030/api/users/:id
3-Delete http://localhost:3030/api/users/:id
4-POST http://localhost:3030/api/users/

-Product:
1-GET http://localhost:3030/api/products/
2-PATCH http://localhost:3030/api/products/:id
3-Delete http://localhost:3030/api/products/:id
4-POST http://localhost:3030/api/products/

- Dashboard:
  1-GET http://localhost:3030/api/dashboard/products-in-orders
  2-GET http://localhost:3030/api/dashboard/users-with-orders
  3-GET http://localhost:3030/api/dashboard/five-most-expensive
  -------------------------------------schema---------------------------------------------

------------------------------------users table:---------------------------------
TABLE users( id SERIAL PRIMARY KEY,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50)NOT NULL,
password VARCHAR(255) NOT NULL
);
-----------------------product table:------------------------------------
TABLE product( id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
price FLOAT NOT NULL
);

----------------------orders table:----------------------
TABLE orders (
id SERIAL PRIMARY KEY,
status VARCHAR(15),
user_id bigint,
FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

---------------order_products table------------------
TABLE order_products (
id SERIAL PRIMARY KEY,
quantity integer,
order_id bigint,
FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
product_id bigint,
FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE

);
