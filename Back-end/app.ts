import express  from 'express';
import dotenv from 'dotenv';
import database from './DB_config/database';
import AllRoutes from './Routes';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app : express.Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors()); // Enable CORS preflight for all routes

database();
dotenv.config();

AllRoutes(app);

app.listen(process.env.PORT , ()=>{
   console.log(`App listen on Port : ${process.env.PORT}`) 
});  

