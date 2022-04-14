import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    NODE_ENV,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,

} = process.env 

    const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    port:parseInt(POSTGRES_PORT as string, 10),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})
export default client