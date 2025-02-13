
import { Router } from "express";
import {login, signUp, biometricLogin } from "../controllers/authController";


const authRoute: Router = Router();

authRoute.route('/signup').post(signUp);
authRoute.route('/login').post(login);
authRoute.route('/loginWithFinger').post(biometricLogin);


export default authRoute;