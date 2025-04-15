import { Request, Response, NextFunction } from "express";
import customErrors from "./Errors";

const errorMiddleware = (err: customErrors, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json(err.toJSON());
};

export default errorMiddleware;