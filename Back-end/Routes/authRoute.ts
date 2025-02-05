
import { Router } from "express";
import {signUp } from "../controllers/authController";


const authRoute: Router = Router();

authRoute.route('/signup').post(signUp);



export default authRoute;