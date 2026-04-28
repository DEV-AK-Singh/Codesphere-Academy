import express from 'express'; 
import dotenv from 'dotenv';
import { logger } from './middlewares/logger.js';

dotenv.config();

const app = express();
const port = process.env['PORT'];

app.use(express.json());
app.use(logger);

app.get('/health', (_req, res) => {
    const date = new Date();
    res.json({ status: 'ok', statusCode: 200, timeStamp: date.toLocaleString() });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});