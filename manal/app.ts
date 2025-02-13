import express from 'express';
import dotenv from 'dotenv';
import database from './DB_config/database';
import AllRoutes from './Routes';

dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
database();

AllRoutes(app);

app.listen(PORT, () => {
  console.log(`App listening on Port: ${PORT}`);
});
