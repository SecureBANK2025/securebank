import { check ,body} from "express-validator";
import  validatorMiddleware from './validatorMiddleware';
import usersModel from '../Models/usersModel';
import moment from "moment";

export const signUpValidation = [
  check("name")
    .notEmpty().withMessage("Name is required")
    .trim()
    .isLength({ min: 4 ,max: 16 }).withMessage("Name must be at least 4 characters"),

  check("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .custom(async (val: string) => {
      const user = await usersModel.findOne({ email: val });
      if (user) { throw new Error(`email is already exist`) }
      return true;
    }),

  check("PIN")
    .notEmpty().withMessage("PIN is required")
    .isLength({  min: 6, max: 6  }).withMessage("PIN  must be 6 "),  

    body('confirmPIN')
        .custom((value, { req }) => {
            if (value !== req.body.PIN) {
                throw new Error('PINs do not match');
            }
            return true;
        }),

  check("phoneNum")
    .notEmpty().withMessage("Phone number is required")
    .isMobilePhone("ar-EG").withMessage("Invalid phone number"),

  check("nationalId")
    .notEmpty().withMessage("National ID is required")
    .isNumeric().withMessage("National ID must be numeric")
    .isLength({ min: 14, max: 14 }).withMessage("National ID must be exactly 14 digits"),

  check("birthDate")
    .notEmpty().withMessage("Birthday is required")
    .isISO8601().withMessage("Invalid date format, use YYYY-MM-DD")
    .custom((value) => {
        const age = moment().diff(moment(value, "YYYY-MM-DD"), "years");
        if (age < 18) {
            throw new Error("User must be at least 18 years old");
        }
        return true;
    }),
    
  check("address.street")
    .optional()
    .trim(),

  check("address.city")
    .optional()
    .trim(),

  check("address.governorate")
    .optional()
    .trim(),
    validatorMiddleware
];

export const  loginValidator =[
  
  check("cardNum")
    .notEmpty().withMessage("Card number is required when using card login")
    .isCreditCard().withMessage("Invalid card number format"),

  check("PIN")
    .notEmpty().withMessage("PIN is required")
    .isLength({ min: 6 , max:6 }).withMessage("PIN must be 6 "),
    validatorMiddleware
];
