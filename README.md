# SecureBank - Modern Banking Application

<div align="center">
  <img src="https://img.shields.io/badge/Angular-19-red" alt="Angular Version">
  <img src="https://img.shields.io/badge/Node.js-v14+-green" alt="Node.js Version">
  <img src="https://img.shields.io/badge/TypeScript-4.5+-blue" alt="TypeScript Version">
  <img src="https://img.shields.io/badge/MongoDB-4.4+-green" alt="MongoDB Version">
</div>

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Setup Guide](#setup-guide)
- [Development Guide](#development-guide)
- [Security Features](#security-features)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contributors](#contributors)

## Overview
SecureBank is a comprehensive banking application that combines modern web technologies with biometric authentication to provide a secure and user-friendly banking experience. The application allows users to perform various banking operations while ensuring high security through biometric authentication and two-factor verification.

### 🎯 Key Objectives
- Provide secure and convenient banking operations
- Implement biometric authentication for enhanced security
- Support multiple account types and banking services
- Ensure real-time transaction processing
- Maintain high performance and scalability

## Features

### Authentication & Security
- 🔐 Biometric fingerprint authentication
- 📧 Email OTP verification
- 🔑 Traditional email/PIN login
- 🛡️ JWT token-based security
- 🔒 Card freezing functionality
- 🔄 Session management
- 🚫 Rate limiting
- 🔍 Activity logging

### Account Management
- 💳 Multiple account types support
  - Current accounts
  - Savings accounts
  - Foreign currency accounts
- 📊 Account details view
- 💰 Balance and IBAN information
- 📜 Transaction history with filtering

### Banking Operations
- 💵 Money deposits
- 💸 Money withdrawals
- 💱 Money transfers between accounts
- 📈 Certificate of deposit purchase
- 💳 Bank card management

## Technical Architecture

### Frontend
- **Framework**: Angular 19
- **UI Libraries**:
  - Angular Material
  - Bootstrap
- **Styling**: SCSS
- **Authentication**: JWT
- **State Management**: NgRx
- **Build Tool**: Angular CLI

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: JWT
- **API Documentation**: Swagger
- **Testing**: Jest
- **Logging**: Winston
- **Validation**: Joi

### Hardware Integration
- **Controller**: ESP32 Microcontroller
- **Sensor**: Adafruit Fingerprint Sensor (R307)
- **Programming**: Arduino IDE
- **Communication**: WiFi
- **Security**: Local encryption

## Project Structure

```
securebank/
├── Angular/                 # Frontend application
│   ├── src/                 # Source code
│   │   ├── app/             # Application modules
│   │   ├── assets/          # Static assets
│   │   ├── environments/    # Environment configs
│   │   └── styles/          # Global styles
│   ├── public/              # Public assets
│   └── package.json         # Frontend dependencies
│
├── Back-end/                # Backend application
│   ├── controllers/         # Business logic
│   ├── Models/              # Database schemas
│   ├── Routes/              # API endpoints
│   ├── Utils/               # Helper functions
│   ├── Interfaces/          # TypeScript interfaces
│   ├── validators/          # Input validation
│   ├── DB_config/           # Database configuration
│   ├── tests/               # Test files
│   └── docs/                # API documentation
│
└── docs/                    # Project documentation
    ├── api/                 # API documentation
    ├── setup/               # Setup guides
    └── architecture/        # Architecture diagrams
```

## API Documentation

### Authentication
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword",
  "name": "John Doe"
}

POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword"
}

POST /api/v1/auth/loginWithFinger
Content-Type: application/json

{
  "fingerprintId": "user_fingerprint_id"
}

POST /api/v1/auth/verifyOTP
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

### Accounts
```http
POST /api/v1/accounts/create
Content-Type: application/json

{
  "type": "savings",
  "currency": "USD"
}

GET /api/v1/accounts/myAccount
Authorization: Bearer <token>

GET /api/v1/accounts/:id
Authorization: Bearer <token>
```

### Transactions
```http
POST /api/v1/transactions/deposit
Content-Type: application/json

{
  "accountId": "account_id",
  "amount": 1000,
  "currency": "USD"
}

POST /api/v1/transactions/withdraw
Content-Type: application/json

{
  "accountId": "account_id",
  "amount": 500,
  "currency": "USD"
}

POST /api/v1/transactions/transfer
Content-Type: application/json

{
  "fromAccount": "account_id_1",
  "toAccount": "account_id_2",
  "amount": 100,
  "currency": "USD"
}

GET /api/v1/transactions/history
Authorization: Bearer <token>
```

## Setup Guide

### Prerequisites
- Node.js (v14 or higher)
- Angular CLI (v19 or higher)
- MongoDB (v4.4 or higher)
- Arduino IDE
- ESP32 microcontroller
- fingerprint sensor (R307)
- Git

### Environment Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/SecureBANK2025/securebank.git
   cd securebank
   ```

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd Back-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Database Configuration
   DB=mongodb://localhost:27017/securebank
   
   # JWT Configuration
   JWT_SECRET_KEY=your_secret_key
   JWT_EXPIRES_IN=24h
   
   # Email Configuration
   EMAIL_USERNAME=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   
   # ESP32 Configuration
   ESP_IP=192.168.x.x
   ESP_PORT=80
   
   # Security Configuration
   RATE_LIMIT_WINDOW=15m
   RATE_LIMIT_MAX=100
   ```

4. Start server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

### Frontend Setup
1. Navigate to Angular directory:
   ```bash
   cd Angular
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   # Development
   ng serve
   
   # Production
   ng build --prod
   ```

4. Access application at `http://localhost:4200`

### ESP32 Setup
1. Install required libraries in Arduino IDE:
   - Adafruit Fingerprint Sensor Library
   - ESP32 WebServer
   - ArduinoJson
   - WiFiManager

2. Configure ESP32:
   ```cpp
   // WiFi Configuration
   const char* ssid = "YourWiFiSSID";
   const char* password = "YourWiFiPassword";
   
   // Server Configuration
   const int serverPort = 80;
   ```

3. Upload `main.ino` to ESP32
4. Connect fingerprint sensor
5. Power on ESP32 and connect to WiFi

## Development Guide

### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Follow ESLint rules
- Write meaningful commit messages

### Git Workflow
1. Create feature branch
2. Make changes
3. Write tests
4. Submit pull request
5. Code review
6. Merge to main

### Testing
```bash
# Backend Tests
cd Back-end
npm test

# Frontend Tests
cd Angular
ng test
```

## Security Features
- JWT authentication for all protected endpoints
- Secure PIN hashing using bcrypt
- Local fingerprint data storage on the R307 sensor
- Email OTP verification
- CORS protection
- Rate limiting
- Input validation
- XSS protection
- SQL injection prevention
- Secure session management
- Regular security audits

## Deployment

### Backend Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Set up PM2:
   ```bash
   npm install -g pm2
   pm2 start dist/main.js
   ```

### Frontend Deployment
1. Build for production:
   ```bash
   ng build --prod
   ```

2. Deploy to hosting service (e.g., Netlify, Vercel)

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## Contributors
- [Baher Hossam](https://github.com/baher1088)
- [Bahy Adel](https://github.com/bahy-adell)
- [Yasseen L Maghraby](https://github.com/YasseenLMaghraby)
