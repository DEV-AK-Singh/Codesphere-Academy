import express from 'express'; 
import dotenv from 'dotenv';
import path from 'node:path';
import { logger } from './middlewares/logger.middleware.js';

import AuthRouter from './routes/auth.routes.js';
import UserRouter from './routes/user.routes.js';
import fileRoutes from './routes/file.routes.js';

dotenv.config();

const app = express();
const port = process.env['PORT'];

app.use(express.json()); 
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(logger);

app.use('/api/auth', AuthRouter);
app.use('/api/files', fileRoutes);
app.use('/api/users', UserRouter);

app.get('/health', (_req, res) => {
    const date = new Date();
    res.json({ status: 'ok', statusCode: 200, timeStamp: date.toLocaleString() });
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});