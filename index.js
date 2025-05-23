import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';
import schoolRoutes from './routes/schoolRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

app.use(express.json());
app.use('/', schoolRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to School Management API');
});

app.listen(PORT, () => {
  console.log(`Server running in ${ENV} mode on port ${PORT}`);
});
