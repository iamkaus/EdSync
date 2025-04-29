import mysql from 'mysql2/promise';
import {RAILWAY_DATABASE_HOST, RAILWAY_USER, RAILWAY_DATABASE, RAILWAY_PASSWORD} from "./env.config.js";

// creating a connection pool
const databaseConnection = mysql.createPool({
    host: RAILWAY_DATABASE_HOST,
    user: RAILWAY_USER,
    password: RAILWAY_PASSWORD,
    database: RAILWAY_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    maxRetries: 5,
    idleTimeout: 5000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    connectTimeout: 5000
});

// helper for transactions
const withTransaction = async (callback) => {
    const connection = await databaseConnection.getConnection();                // getConnection or establish connection with database

    try {
        await connection.beginTransaction();                                                    // initiate transaction
        const result = await callback(connection);                                              // await transaction result from database
        await connection.commit();                                                              // commit if no error
        return result;                                                                          // return result
    } catch ( error ) {
        await connection.rollback();                                                            // rollback if an error occurs
        throw error;                                                                            // throw error
    } finally {
        connection.release();                                                                   // release connection
    }
};

// query execution with proper error handling
const execute = async (sql, params = []) => {
    try {
        const [ rows ] = await databaseConnection.execute(sql, params);                     // execute sql query with params and destructure rows
        return rows;                                                                            // return rows
    } catch ( error ) {
        console.error('Database connection error: ', error );                                   // log error
        throw error;                                                                            // throw error
    }
}

// method to check if connection is healthy
const healthCheck = async () => {
    try {
        await databaseConnection.query('SELECT 1');                                             // run a query to check connection health
        return true;                                                                            // return true
    } catch ( error ) {
        console.error('Database connection error: ', error );                                   // log error if connection is not healthy
        return false;                                                                           // return false
    }
}

const closePool = async () => {
    await databaseConnection.end();
};

export default {
    databaseConnection,
    withTransaction,
    execute,
    healthCheck,
    closePool
}                                                                                                // export necessary function/methods