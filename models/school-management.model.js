import databaseConnection from "../config/mysql.config.js";

export const createSchoolTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS school (
        id INT PRIMARY KEY AUTO_INCREMENT,
        ame VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_school_name (name),
        INDEX idx_school_location (latitude, longitude)
    )`

    try {
        await databaseConnection.execute(sql);
        console.log('School table created or already exists');
    } catch ( error ) {
        console.error('Failed to create school table:', error);
        throw error;
    }
};