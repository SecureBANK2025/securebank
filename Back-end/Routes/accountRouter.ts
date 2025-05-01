import express from "express";
import { createAccount, getUserAccounts } from "../controllers/accountController";
import validatorMiddleware from "../validators/validatorMiddleware";
import { protectRoute } from "../controllers/authController";

const accountRouter = express.Router();

accountRouter.post("/create", protectRoute,createAccount);
accountRouter.get("/myAccount", protectRoute,getUserAccounts);

export default accountRouter;