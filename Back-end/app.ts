import express  from 'express';
import dotenv from 'dotenv';
import database from './DB_config/database';
import AllRoutes from './Routes';


const app : express.Application = express();
app.use(express.json());

database();
dotenv.config();

AllRoutes(app);

app.listen(process.env.PORT , ()=>{
   console.log(`App listen on Port : ${process.env.PORT}`) 
});  