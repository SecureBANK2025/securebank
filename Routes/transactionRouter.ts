import express from 'express';
import { depositMoney, transferMoney } from '../controllers/transactionController';
import { transactionValidationRules } from '../validators/transactionValidator';
import asyncHandler from 'express-async-handler';

const transactionRouter = express.Router();

transactionRouter.post('/deposit', transactionValidationRules, asyncHandler(depositMoney));
transactionRouter.post('/transfer', transactionValidationRules, asyncHandler(transferMoney));

export default transactionRouter;