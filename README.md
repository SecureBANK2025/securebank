# SecureBank - Modern Banking Application

SecureBank is a comprehensive banking application that combines modern web technologies with biometric authentication to provide a secure and user-friendly banking experience.

## Project Overview

SecureBank is a full-stack banking application that allows users to:
- Register and authenticate using fingerprint biometrics
- Manage multiple account types (current, savings, foreign currency)
- Perform banking operations (deposits, withdrawals, transfers)
- View transaction history and account details
- Request and manage bank cards
- Purchase certificates of deposit

## Technology Stack

### Frontend
- **Angular 19**: Modern frontend framework for building responsive single-page applications
- **Angular Material**: UI component library for consistent design
- **SCSS**: Advanced styling with variables and mixins
- **Bootstrap**: For responsive grid layout and components
- **JWT**: For secure authentication

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express.js**: Web framework for building RESTful APIs
- **TypeScript**: Type-safe JavaScript for better code quality
- **MongoDB**: NoSQL database for storing user and transaction data
- **JWT**: For secure authentication and authorization

### Hardware Integration
- **ESP32**: Microcontroller for fingerprint sensor integration
- **Adafruit Fingerprint Sensor**: For biometric authentication
- **Arduino**: For programming the ESP32 microcontroller

## Key Features

### Authentication
- Traditional email/PIN login
- Biometric fingerprint authentication
- Two-factor authentication with email OTP

### Account Management
- Multiple account types (current, savings, foreign currency)
- Account details view with balance and IBAN
- Transaction history with filtering

### Banking Operations
- Money deposits
- Money withdrawals
- Money transfers between accounts
- Certificate of deposit purchase

### Security Features
- Fingerprint biometric authentication
- JWT token-based authentication
- Email OTP verification
- Card freezing functionality

## Project Structure

### Angular Frontend
The Angular application follows a modular structure with components for different banking operations:

- **Authentication**: Components for login, signup, and fingerprint scanning
- **Dashboard**: Main options and account overview
- **Transactions**: Components for deposits, withdrawals, and transfers
- **Account Management**: Account details and transaction history
- **Services**: Authentication, data, and transaction services

### Node.js Backend
The backend is organized into:

- **Routes**: API endpoints for different features
- **Controllers**: Business logic for handling requests
- **Models**: Database schemas for users, accounts, transactions, etc.
- **Middleware**: Authentication, validation, and error handling
- **Utils**: Helper functions and utilities

### ESP32 Fingerprint Integration
The hardware component includes:

- **ESP32 Controller**: Hosts a web server for fingerprint operations
- **API Endpoints**: For enrolling, verifying, and deleting fingerprints
- **WiFi Connectivity**: For communication with the backend

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Angular CLI (v19 or higher)
- MongoDB
- Arduino IDE (for ESP32 programming)
- ESP32 microcontroller with fingerprint sensor

### Installation

#### Backend Setup
1. Navigate to the backend directory:
   ```
   cd Back-end
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   DB=mongodb://localhost:27017/securebank
   JWT_SECRET_KEY=your_secret_key
   EMAIL_USERNAME=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   ESP_IP=192.168.x.x (IP address of your ESP32)
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

#### Frontend Setup
1. Navigate to the Angular directory:
   ```
   cd Angular
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Angular development server:
   ```
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

#### ESP32 Setup
1. Open the Arduino IDE
2. Install the required libraries:
   - Adafruit Fingerprint Sensor Library
   - ESP32 WebServer
3. Upload the `main.ino` sketch to your ESP32
4. Connect the fingerprint sensor to the ESP32 according to the pin configuration in the code
5. Power on the ESP32 and ensure it connects to your WiFi network

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup`: Register a new user
- `POST /api/v1/auth/login`: Login with email and PIN
- `POST /api/v1/auth/loginWithFinger`: Login with fingerprint
- `POST /api/v1/auth/verifyOTP`: Verify OTP sent to email

### Accounts
- `POST /api/v1/accounts/create`: Create a new account
- `GET /api/v1/accounts/myAccount`: Get user's accounts
- `GET /api/v1/accounts/:id`: Get specific account details

### Transactions
- `POST /api/v1/transactions/deposit`: Deposit money
- `POST /api/v1/transactions/withdraw`: Withdraw money
- `POST /api/v1/transactions/transfer`: Transfer money
- `GET /api/v1/transactions/history`: Get transaction history

### Cards
- `POST /api/v1/cards/requestNew`: Request a new card
- `PATCH /api/v1/cards/activate`: Activate a card
- `PATCH /api/v1/cards/toggleCardStatus`: Freeze/unfreeze a card
- `DELETE /api/v1/cards/delete`: Delete a card
- `GET /api/v1/cards/getCard`: Get user's card details

### Certificates
- `POST /api/v1/certificates/purchase`: Purchase a certificate of deposit
- `GET /api/v1/certificates/myCertificates`: Get user's certificates

## Security Considerations

- All API endpoints (except authentication) are protected with JWT authentication
- Sensitive data like PINs are hashed before storage
- Fingerprint data is stored securely on the ESP32 device
- OTP verification adds an extra layer of security
- CORS is configured to allow only specific origins

## Contributors

- [Your Name](https://github.com/yourusername)
- [Contributor 1](https://github.com/contributor1)
- [Contributor 2](https://github.com/contributor2)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
