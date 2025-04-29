import { PORT, NODE_ENV } from './config/env.config.js';
import app from './app.js';
import { createSchoolTable } from './models/school-management.model.js';

/**
 * Initialize server and database tables
 * @async
 * @returns {Promise<void>}
 */
const startServer = async () => {
    try {
        // Create tables before starting server
        await createSchoolTable();
        console.log('School table created successfully');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port: http://localhost:${PORT} in ${NODE_ENV} mode`);
        });

    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1); // Exit with error code
    }
};

// Start the server
startServer().catch(error => {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
});