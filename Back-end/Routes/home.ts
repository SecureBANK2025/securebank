import express from "express";
import { home } from "../controllers/authController";
const homeRouter = express.Router();


homeRouter.route('/')
.post(home)

export default homeRouter;