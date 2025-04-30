import express from "express";
import { activateCard, toggleFreezeCard, requestNewCard, deleteCard } from "../controllers/cardController";

const router = express.Router();

router.post("/request-new", requestNewCard);
router.patch("/activate", activateCard);
router.patch("/cardStatus", toggleFreezeCard);//new
router.delete("/delete", deleteCard);

export default router;