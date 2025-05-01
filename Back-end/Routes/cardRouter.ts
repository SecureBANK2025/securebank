import express from "express";
import { activateCard, toggleFreezeCard, requestNewCard, deleteCard } from "../controllers/cardController";
import { protectRoute } from "../controllers/authController";

const router = express.Router();

router.post("/request-new",protectRoute, requestNewCard);
router.patch("/activate", protectRoute,activateCard);
router.patch("/cardStatus",protectRoute, toggleFreezeCard);//new
router.delete("/delete", protectRoute,deleteCard);

export default router;