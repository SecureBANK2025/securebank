import mongoose, { Schema, Document } from 'mongoose';
import {users} from "../Interfaces/usersInterface";
import bcrypt from 'bcryptjs';


const addressSchema: Schema = new Schema({
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true },
    governorate: { type: String, required: true }
  });

const usersSchema:Schema = new Schema<users>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true,unique:true, trim: true, lowercase: true },
    PIN: { type: String, required: true },
    role: { type: String, enum: ["manager", "admin", "user"], default: "user" },
    active: { type: Boolean, default: true },
    fingerId: { type: Number, unique:true,required: true },
    phoneNum: { type: String, required: true,unique: true },
    nationalId: { type: String, required: true },
    balance: { type: Number,  default: 0 },
    birthDate: { type: Date, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        governorate: { type: String }
      },
    
    accounts: [
      {
            _id: { type: Schema.Types.ObjectId, ref: 'Account' }, 
            type: { type: String, enum: ['current', 'savings', 'foreign_currency'], required: true } 
      } ]
    

},{timestamps:true});

usersSchema.pre<users>('save', async function (next) {
    if (!this.isModified('PIN')) return next;
  this.PIN = await bcrypt.hash(this.PIN, 12)
});


const usersModel = mongoose.model<users>('User', usersSchema);

export default usersModel;