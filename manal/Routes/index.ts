// import * as all from '../Interfaces';
import { Application, Request, Response, NextFunction } from "express";
import userRoute from './userRoute';
import transactionRouter from './transactionRouter';

const AllRoutes = (app: Application): void => {
    
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/transactions', transactionRouter);
    // app.all('*', (req: Request, res: Response, next: NextFunction) => {
    //   next(new ApiErrors(`The router ${req.originalUrl} is not found`, 400))
    // })
    // app.use(globalErrors);
  }
  
  export default AllRoutes;
