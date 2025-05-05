import express from "express";
import { activateCard, toggleFreezeCard, requestNewCard, deleteCard, getUserCard } from "../controllers/cardController";
import { protectRoute } from "../controllers/authController";

const router = express.Router();

router.post("/requestNew",protectRoute, requestNewCard);
router.patch("/activate", protectRoute,activateCard);
router.patch("/toggleCardStatus",protectRoute, toggleFreezeCard);//new
router.delete("/delete", protectRoute,deleteCard);
router.get("/getCard",protectRoute,getUserCard);

export default router;