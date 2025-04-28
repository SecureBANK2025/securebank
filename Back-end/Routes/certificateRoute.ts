import express from "express";
import {
 
    doToCertificate,
    buyCertificate,
    getUserCertificates,
    
} from "../controllers/certificateController";
import validatorMiddleware from "../validators/validatorMiddleware";

const router = express.Router();


router.post("/buy", validatorMiddleware, buyCertificate);
router.post("/redeem", validatorMiddleware, doToCertificate);
router.get("/getCertificates", validatorMiddleware, getUserCertificates);
export default router;