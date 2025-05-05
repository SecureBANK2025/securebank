import mongoose, { Schema, Document } from "mongoose";

export interface ICard {
  userId: mongoose.Types.ObjectId;
  cardId: mongoose.Schema.Types.ObjectId,//new
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isActive: boolean;
  isFrozen: boolean;
  cardHolderName: string; 
  cardPassword: string;
}