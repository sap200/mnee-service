import express from 'express';
import cors from 'cors';
import configRoute from './routes/route.js';

const app = express();
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/mnee', configRoute);

// Start server
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
