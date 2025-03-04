import express from "express";
import { createAccount, getUserAccounts } from "../controllers/accountController";
import validatorMiddleware from "../validators/validatorMiddleware";

const accountRouter = express.Router();

accountRouter.post("/create/:id", validatorMiddleware,createAccount);
accountRouter.get("/myAccount/:id", validatorMiddleware,getUserAccounts);

export default accountRouter;