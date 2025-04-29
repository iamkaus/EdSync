import {databaseConnection} from "../config/mysql.config.js";

/**
 * Creates the school table in the database if it doesn't already exist.
 *
 * The table includes the following fields:
 * - id: Auto-incremented primary key
 * - name: School name (indexed for faster lookups)
 * - address: Physical address of the school
 * - latitude: Geographic latitude coordinate
 * - longitude: Geographic longitude coordinate
 * - created_at: Timestamp of record creation
 * - updated_at: Timestamp of the last update
 *
 * The table has indexes on name and geographic coordinates for optimized queries.
 *
 * @async
 * @returns {Promise<void>} Resolves when table is created or already exists
 * @throws {Error} If database operation fails
 */

export const createSchoolTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS school (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_school_name (name),
            INDEX idx_school_location (latitude, longitude)
            )`;

    try {
        await databaseConnection.execute(sql);
        console.log('School table created or already exists');
    } catch (error) {
        console.error('Failed to create school table:', error);
        throw error;
    }
};