import {check, param } from "express-validator";//bahy
import validatorMiddleware from "./validatorMiddleware";
export const transactionValidationRules = [
  param('id').isMongoId().withMessage('Invalid userId'),
  check('username').optional()
  .isString()
  .withMessage('Invalid receiver username'), 
  check('amount').isNumeric().withMessage('Amount must be numeric and greater than 0'),
  validatorMiddleware
];