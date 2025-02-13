import { body } from "express-validator";
import transactionModel from "../Models/transactionModel";
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


export const transactionValidationRules = [
  body('userId').isMongoId().withMessage('Invalid userId'),
  body('receiverId').isMongoId().withMessage('Invalid receiverId'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')
];