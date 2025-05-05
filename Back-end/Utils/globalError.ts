import { Request, Response, NextFunction } from "express";
import customErrors from "./Errors";
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof customErrors) {
    res.status(err.statusCode).json(err.toJSON());
  } else {
    res.status(500).json({
      success: false,
      status: "error",
      statusCode: 500,
      message: err.message || "Internal server error"
    });
  }
};
