import express from 'express';
import schoolRoutes from './routes/school.routes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/school', schoolRoutes);

export default app;