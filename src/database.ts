import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,

} = process.env 

    const client = new Pool({
    host: POSTGRES_HOST,
    database: NODE_ENV === 'development' ? POSTGRES_DB : POSTGRES_DB_TEST,
    port:parseInt(POSTGRES_PORT as string, 10),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})
export default client