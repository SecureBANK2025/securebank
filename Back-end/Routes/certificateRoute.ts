import express from "express";
import {
 
    doToCertificate,
    buyCertificate,
    getUserCertificates,
    
} from "../controllers/certificateController";
import validatorMiddleware from "../validators/validatorMiddleware";
import { protectRoute } from "../controllers/authController";

const router = express.Router();


router.post("/buy", protectRoute, buyCertificate);
router.post("/redeem", protectRoute, doToCertificate);
router.get("/getCertificates", protectRoute, getUserCertificates);
export default router;