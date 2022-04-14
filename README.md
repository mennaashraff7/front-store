Basic scripts

    start: node src/server.ts
    test: jasmine
    build:npx tsc

Environment variables
PORT=3030
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=3000
POSTGRES_DB=store
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
BCRYPT_PASSWORD=my-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=12345

env-example file is attached with the project with all environment variables names.

Endpoints
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

Please refer to REQUIREMENTS.md

Database

Please refer to REQUIREMENTS.md for schema All database tables can be created using db-migrate

create tables: db-migrate up
drop all tables: db-migrate reset
drop last migration: db-migrate down
drop (N) number of migrations: db-migrate down -c N
Please note if db-migrate isn't installed globally on your machine add npx before each command.
