
import { Router } from "express";
import {login, signUp, biometricLogin,verifyOtp, chooseAccount, protectRoute } from "../controllers/authController";
import {signUpValidation ,loginValidator}from '../validators/authValidator';
import validatorMiddleware from "../validators/validatorMiddleware";
const authRoute: Router = Router();

authRoute.route('/signup').post(signUpValidation,signUp);
authRoute.route('/login').post(login);
authRoute.route('/loginWithFinger').post(validatorMiddleware,biometricLogin);
authRoute.route('/verifyOTP').post(validatorMiddleware,verifyOtp);
// authRoute.route('/chooseAccount/:id').post(chooseAccount);
authRoute.route('/chooseAccount').post(protectRoute,chooseAccount);




export default authRoute;