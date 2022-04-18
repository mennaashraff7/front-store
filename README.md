"dependencies": {
"bcrypt": "^5.0.1",
"body-parser": "^1.20.0",
"db-migrate": "^0.11.13",
"db-migrate-pg": "^1.2.2",
"dotenv": "^16.0.0",
"express": "^4.17.3",
"jsonwebtoken": "^8.5.1",
"pg": "^8.7.3"
},
"devDependencies": {
"@types/bcrypt": "^5.0.0",
"@types/express": "^4.17.13",
"@types/jasmine": "^3.10.5",
"@types/jsonwebtoken": "^8.5.8",
"@types/node": "^17.0.23",
"@types/pg": "^7.14.11",
"@types/supertest": "^2.0.12",
"jasmine": "^3.99.0",
"jasmine-spec-reporter": "^6.0.0",
"supertest": "^6.2.2",
"ts-node": "^9.1.1",
"tsc-watch": "^4.2.9",
"typescript": "^4.6.3"
}
#Technologies used
Node.js
Express.js
TypeScript
Jasmine
PostgreSql
JWT
db-migrate

# For installation

npm i express
npm i --save-dev @types/express
npm i pg
npm install dotenv --save
npm i --save-dev @types/pg
npm i db-migrate
npm i --save-dev @types/node
npm i typescript --save-dev
npm i body-parser
npm i bcrypt
npm i --save-dev @types/bcrypt
npm i jsonwebtoken
npm i --save-dev @types/jsonwebtoken
npm i --save-dev jasmine-ts
npm i --save-dev jasmine
npm i --save-dev @types/jasmine
npm i --save-dev jasmine-spec-reporte
npm i --save-dev @types/jasmine-spec-reporter
npm i --save-dev supertest
npm i --save-dev @types/supertest

#Commands Used
"start": "node src/server.ts",
"watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
"jasmine": "jasmine-ts --config=./spec/support/jasmine.json",
"test": "set NODE_ENV=test&& db-migrate up --config ./database.json -e test && tsc && jasmine && db-migrate reset",
"build": "npx tsc"
Test script: npm run test
Build script: npm run build
Run server: node build/server.js
create tables: db-migrate up
drop all tables: db-migrate reset
drop last migration: db-migrate down
drop (N) number of migrations: db-migrate down -c N
Please note if db-migrate isn't installed globally on your machine add npx before each command.

Environment variables
PORT=3030
#run tests on store_test database
NODE_ENV=test    
POSTGRES_HOST=localhost
POSTGRES_PORT=3000
POSTGRES_DB=store
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
BCRYPT_PASSWORD=my-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=12345


# For Endpoints

Please refer to REQUIREMENTS.md

**\*\*\*\***\***\*\*\*\***Database Setup**\*\*\*\***\*\*\***\*\*\*\***
Database PORT = 3000

# install postgress

installed postgress locally

# Login to Postgres

psql -U postgres

# Postgres shell

# This will list out all the databases

\l

# If "store" database is not present

create database store;
And
create database store_test; ## for unit testing of database

# If YOU WANT TO CONNECT TO "STORE" DATABASE OR "STORE_TEST" Database

\c store
or
\c store_test #To test database

Database

Please refer to REQUIREMENTS.md for schema All database tables can be created using db-migrate
