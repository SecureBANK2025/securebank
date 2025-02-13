import mongoose, { Schema, Document } from 'mongoose';
import {users} from "../Interfaces/usersInterface";
import bcrypt from 'bcryptjs';


const addressSchema: Schema = new Schema({
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  });

const usersSchema:Schema = new Schema<users>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true,unique:true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["manager", "admin", "user"], default: "user" },
    active: { type: Boolean, default: true },
    fingerId: { type: Number, unique:true,required: true },
    phoneNum: { type: String, required: true,unique: true },
    IBAN: { type: String,unique:true, required: true },
    cardNum: { type: String,unique:true, required: true },   //unique
    cvv: { type: String, required: true },
    nationalId: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        country: { type: String }
      },
    balance: { type: Number, default: 0 }

},{timestamps:true});

usersSchema.pre<users>('save', async function (next) {
    if (!this.isModified('password')) return next;
  this.password = await bcrypt.hash(this.password, 12)
});


const usersModel = mongoose.model<users>('User', usersSchema);

export default usersModel;