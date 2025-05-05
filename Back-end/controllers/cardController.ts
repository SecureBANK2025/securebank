import { Request, Response, NextFunction } from "express";
import Card from "../Models/cardModel";
import User from "../Models/usersModel";
import {enrollFingerprint, verifyFingerprint} from './FingerprintController';
import customErrors from '../Utils/Errors';


const generateCardNumber = () => {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
};

const generateCVV = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

const generateExpiryDate = () => {
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 4);
  const month = (expiry.getMonth() + 1).toString().padStart(2, "0");
  const year = expiry.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
};

export const requestNewCard = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    
    const { password, confirmPassword } = req.body;
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!password || !confirmPassword) {
      res.status(400).json({ message: "Password and confirmation are required" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    const existingCard = await Card.findOne({ userId });
    if (existingCard) {
      res.status(400).json({ message: "User already has a card" });
      return;
    }
    //new --->

    // constfinger_Id = await verifyFingerprint();
    const finger_Id = 8; // cursor ميقدرش يقولك ان هنا فى غلط 

    if (!finger_Id) {
        return  next(new customErrors("Fingerprint not found - card",400)); 
    }
    if (user.fingerId != finger_Id) {
      return  next(new customErrors("FingerID doesn't match",400)); 
    }

    const newCard = new Card({
      userId,
      cardHolderName: user.name,
      cvv: generateCVV(),
      cardNumber: generateCardNumber(),
      expiryDate: generateExpiryDate(),
      cardPassword: password,
      isActive: false,
      isFrozen: false,
    });

    await newCard.save();

    user.cardId = newCard._id; //new
    await user.save(); //new
    
    res.status(201).json({ message: "New card requested successfully", card: newCard });
  } catch (error) {
    next(error);
  }
};

export const activateCard = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    // const  cardId  = req.params;
    const { password } = req.body; //new
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found-Login again" });
      return;
    }
    const card = await Card.findById(user.cardId);

    if (!card) {
      res.status(404).json({ message: "Card not found" });
      return;
    }

    if (card.cardPassword !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    card.isActive = true;
    await card.save();
    res.json({ message: "Card activated successfully", card });

  } catch (error) {
    next(error);
  }
};


export const toggleFreezeCard = async (req: any, res: Response, next: NextFunction): Promise<void> => {

    const { password } = req.body;
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found-Login again" });
      return;
    }
    const card = await Card.findById(user.cardId);

    if (!card) {
      res.status(404).json({ message: "Card not found" });
      return;
    }

    if (card.cardPassword !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    card.isFrozen = !card.isFrozen;
    user.cardFrozen= card.isFrozen ;//new
    await card.save();
    await user.save();//new

    res.json({
      message: card.isFrozen ? "Card has been frozen" : "Card has been unfrozen",
      card
    });

};


export const deleteCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cardId } = req.params;
    const { password } = req.body;

    const card = await Card.findById(cardId);

    if (!card) {
      res.status(404).json({ message: "Card not found" });
      return;
    }

    if (card.cardPassword !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    await Card.findByIdAndDelete(cardId);
    res.json({ message: "Card deleted successfully" });

  } catch (error) {
    next(error);
  }
};

export const getUserCard = async (req: any, res: Response): Promise<any> => {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(400).json({success: false , message :"user id is required" });
    }

    const cards = await Card.find({ userId });

    res.status(200).json({
        success: true,
        data: cards
    });
};