import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development' }.local` });

export const {
    PORT,
    NODE_ENV,
    RAILWAY_MYSQL_URL,
    RAILWAY_USER,
    RAILWAY_PASSWORD,
    RAILWAY_DATABASE,
    RAILWAY_DATABASE_HOST
} = process.env;