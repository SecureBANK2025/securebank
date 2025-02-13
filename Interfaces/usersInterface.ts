import{Document}from 'mongoose';

type Role = 'user' | 'admin'| 'manager' ;
export interface users extends Document{
    email: string;
    password: string;
    name: string;
    fingerId: number;
    role: Role;
    active: boolean;
    // account:accounts[];
    // subscribtion: products[];
    nationalId: string;
    cardNum: string;
    address: Address[];
    IBAN: string;
    phoneNum: string;
    cvv: string ;
    balance: number;
    
}

export interface Address extends Document {
    street: string ;
  city: string;
  country: string;
}