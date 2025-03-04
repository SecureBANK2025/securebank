
import { Router } from "express";
import {login, signUp, biometricLogin } from "../controllers/authController";
import {signUpValidation ,loginValidator}from '../validators/authValidator';
import validatorMiddleware from "../validators/validatorMiddleware";
const authRoute: Router = Router();

authRoute.route('/signup').post(signUpValidation,signUp);
authRoute.route('/login').post(login);
authRoute.route('/loginWithFinger').post(validatorMiddleware,biometricLogin);


export default authRoute;