import { body } from "express-validator";
import usersModel from "../Models/usersModel";


export const userValidationRules = [
  // Name validation
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  // Email validation
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .custom(async (email) => {
        const existingUser = await usersModel.findOne({ email });
        if (existingUser) {
          throw new Error("Email already exists");
        }
      }),

  // Password validation
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6, max: 6 }).withMessage("Password must be 6 characters"),

  // Phone number validation
  body("phoneNum")
    .notEmpty().withMessage("Phone number is required")
    .isString().withMessage("Phone number must be string")
    .isLength({ min: 11, max: 11 }).withMessage("Phone number must be 11 digits"),

  // IBAN validation
  body("IBAN")
    .notEmpty().withMessage("IBAN is required")
    .isString().withMessage("IBAN must be a string"),

  // Card number validation
  body("cardNum")
    .notEmpty().withMessage("Card number is required")
    .isString().withMessage("Card number must be string")
    .isLength({ min: 15, max: 15 }).withMessage("Card number must be 15 digits"),

  // CVV validation
  body("cvv")
    .notEmpty().withMessage("CVV is required")
    .isNumeric().withMessage("CVV must be numeric")
    .isLength({ min: 3, max: 3 }).withMessage("CVV must be 3 digits"),

  // National ID validation
  body("nationalId")
    .notEmpty().withMessage("National ID is required")
    .isString().withMessage("National ID must be string")
    .isLength({ min: 15, max: 15 }).withMessage("National ID must be 15 digits"),

  // Fingerprint ID validation
  body("fingerId")
    .notEmpty().withMessage("Fingerprint ID is required")
    .isNumeric().withMessage("Fingerprint ID must be numeric"),

  // Address validation
  body("address")
    .isArray({ min: 1 }).withMessage("At least one address is required"),

  body("address.*.street")
    .notEmpty().withMessage("Street is required"),

  body("address.*.city")
    .notEmpty().withMessage("City is required"),

  body("address.*.country")
    .notEmpty().withMessage("Country is required")
];
