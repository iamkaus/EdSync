/**
 * MySQL database configuration and utility functions
 * @module config/mysql.config
 */

import mysql from 'mysql2/promise';
import {
    RAILWAY_DATABASE_HOST,
    RAILWAY_USER,
    RAILWAY_DATABASE,
    RAILWAY_PASSWORD,
    RAILWAY_DATABASE_PORT
} from "./env.config.js";

/**
 * Creates a MySQL connection pool with defined configuration
 * @constant {Object} databaseConnection - Pool of database connections
 */

const databaseConnection = mysql.createPool({
    host: RAILWAY_DATABASE_HOST,
    port: RAILWAY_DATABASE_PORT,
    user: RAILWAY_USER,
    password: RAILWAY_PASSWORD,
    database: RAILWAY_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    idleTimeout: 5000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    connectTimeout: 5000
});

/**
 * Executes a callback function within a database transaction
 * Automatically handles commit/rollback based on success/failure
 *
 * @async
 * @param {Function} callback - Function to execute within the transaction
 * @param {Object} callback.connection - The database connection to use for the transaction
 * @returns {Promise<*>} Result of the callback function
 * @throws {Error} If an error occurs during the transaction
 */

const withTransaction = async (callback) => {
    const connection = await databaseConnection.getConnection();

    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

/**
 * Executes an SQL query with proper error handling
 *
 * @async
 * @param {string} sql - The SQL query to execute
 * @param {Array} [params=[]] - Parameters for the SQL query (for prepared statements)
 * @returns {Promise<Array>} Query results
 * @throws {Error} If query execution fails
 */

const execute = async (sql, params = []) => {
    try {
        const [rows] = await databaseConnection.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Database connection error: ', error);
        throw error;
    }
};

/**
 * Checks if the database connection is healthy
 *
 * @async
 * @returns {Promise<boolean>} True if connection is healthy, false otherwise
 */

const healthCheck = async () => {
    try {
        await databaseConnection.query('SELECT 1');
        return true;
    } catch (error) {
        console.error('Database connection error: ', error);
        return false;
    }
};

/**
 * Closes the database connection pool
 * Should be called when shutting down the application
 *
 * @async
 * @returns {Promise<void>} Resolves when pool is closed
 */

const closePool = async () => {
    await databaseConnection.end();
};

export {
    databaseConnection,
    withTransaction,
    execute,
    healthCheck,
    closePool
}
