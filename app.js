import express from 'express';
import schoolRoutes from './routes/school.routes.js';
import cors from 'cors';

const app = express();

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 * Allows the API to be accessible from different origins.
 */
app.use(cors());

/**
 * Mounts the school-related API routes under the /api/v1/school path.
 * @namespace /api/v1/school
 */
app.use('/api/v1/school', schoolRoutes);

/**
 * Exports the configured Express application.
 * This can be imported and started by a server entry file.
 * @module app
 */
export default app;
