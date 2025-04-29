import express from 'express';
import schoolRoutes from "./routes/school.routes.js";
import {NODE_ENV, PORT} from "./config/env.config.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to EdSync. A school management API..')
})

// main routes
app.use('/api/v1/school', schoolRoutes);

app.listen(PORT, () => {
    console.log(`AI issue tracker and suggestions provider API Listening on port: http://localhost:${PORT} in ${NODE_ENV}`);
})

export default app;