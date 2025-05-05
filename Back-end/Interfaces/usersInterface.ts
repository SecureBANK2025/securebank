import  mongoose,{Document,Types}from 'mongoose';

type Role = 'user' | 'admin'| 'manager' ;
type AccountType = 'current' | 'savings' | 'foreign_currency';
export interface users extends Document{
    email: string;
    PIN: string;
    name: string;
    fingerId: number;
    role: Role;
    active: boolean;
    nationalId: string;
    address: Address[];
    phoneNum: string;
    cardFrozen?: boolean;
    // balance? :number ; remove it 
    birthDate: Date;
    accounts?: Account[];
    cardId?: mongoose.Types.ObjectId; //new
    certificateId?: mongoose.Types.ObjectId[]; //new;

}

export interface Address extends Document {
  street: string ;
  city: string;
  governorate: string;
}
export interface Account {
  _id: Types.ObjectId; 
  type: AccountType;   
}