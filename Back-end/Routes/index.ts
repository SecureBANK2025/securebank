// import * as all from '../Interfaces';
import { Application, Request, Response, NextFunction } from "express";
import customErrors from "../Utils/Errors";
import userRoute from './userRoute';
import authRoute from './authRoute'
import { protectRoute } from "../controllers/authController";
import homeRouter from "./home";

const AllRoutes = (app: Application): void => {
    
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/profile',protectRoute, homeRouter); 
    
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new customErrors(`The router ${req.originalUrl} is not found`, 400));
    })
    // app.use(globalErrors);
  }
  
  export default AllRoutes;
