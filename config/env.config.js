import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development' }.local` });

export const {
    PORT,
    NODE_ENV,
    RAILWAY_MYSQL_URL,
    RAILWAY_USER,
    RAILWAY_PASSWORD,
    RAILWAY_DATABASE,
    RAILWAY_DATABASE_HOST,
    RAILWAY_DATABASE_PORT,
    WAIT_FOR_CONNECTION,
    CONNECTION_LIMIT,
    IDLE_TIMEOUT,
    ENABLE_KEEP_ALIVE,
    KEEP_ALIVE_INITIAL_DELAY,
    CONNECTION_TIMEOUT
} = process.env;