
import { Router } from "express";
import {login, signUp, biometricLogin,verifyOtp } from "../controllers/authController";
import {signUpValidation ,loginValidator}from '../validators/authValidator';
import validatorMiddleware from "../validators/validatorMiddleware";
const authRoute: Router = Router();

authRoute.route('/signup').post(signUpValidation,signUp);
authRoute.route('/login').post(login);
authRoute.route('/loginWithFinger').post(validatorMiddleware,biometricLogin);
authRoute.route('/verifyOTP').post(validatorMiddleware,verifyOtp);


export default authRoute;