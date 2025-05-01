import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Transaction amount
  private amountSource = new BehaviorSubject<number>(0);
  currentAmount = this.amountSource.asObservable();

  // Account ID
  private accountIdSource = new BehaviorSubject<string>("");
  currentId = this.accountIdSource.asObservable();

  // User data
  private userIdSource = new BehaviorSubject<string>("");
  currentUserId = this.userIdSource.asObservable();

  private userNameSource = new BehaviorSubject<string>("");
  currentUserName = this.userNameSource.asObservable();

  private userEmailSource = new BehaviorSubject<string>("");
  currentUserEmail = this.userEmailSource.asObservable();

  private userRoleSource = new BehaviorSubject<string>("");
  currentUserRole = this.userRoleSource.asObservable();

  private userPhoneSource = new BehaviorSubject<string>("");
  currentUserPhone = this.userPhoneSource.asObservable();

  private userNationalIdSource = new BehaviorSubject<string>("");
  currentUserNationalId = this.userNationalIdSource.asObservable();

  private userBirthDateSource = new BehaviorSubject<Date | null>(null);
  currentUserBirthDate = this.userBirthDateSource.asObservable();

  private userAddressSource = new BehaviorSubject<any>(null);
  currentUserAddress = this.userAddressSource.asObservable();

  // Account data
  private accountNumberSource = new BehaviorSubject<string>("");
  currentAccountNumber = this.accountNumberSource.asObservable();

  private accountTypeSource = new BehaviorSubject<string>("");
  currentAccountType = this.accountTypeSource.asObservable();

  private accountBalanceSource = new BehaviorSubject<number>(0);
  currentAccountBalance = this.accountBalanceSource.asObservable();

  private accountCurrencySource = new BehaviorSubject<string>("EGP");
  currentAccountCurrency = this.accountCurrencySource.asObservable();

  private accountIBANSource = new BehaviorSubject<string>("");
  currentAccountIBAN = this.accountIBANSource.asObservable();

  private accountCreatedAtSource = new BehaviorSubject<Date | null>(null);
  currentAccountCreatedAt = this.accountCreatedAtSource.asObservable();

  constructor(private authService: AuthService) {
    // Subscribe to user data changes from AuthService
    this.authService.currentUser.subscribe((user: any) => {
      if (user) {
        // The JWT token only contains the user ID, so we need to fetch the complete user data
        this.fetchUserData(user._id);
      }
    });

    // We'll implement a method to fetch account data directly
    this.fetchAccountData();
  }

  // Method to fetch user data from the backend
  fetchUserData(userId: string) {
    if (!userId) return;

    const token: any = localStorage.getItem('user');
    if (!token) return;

    // Get the base URL from AuthService
    const baseUrl = this.authService['hostName'] || '';

    // Use HttpClient from AuthService to make the request
    this.authService['_HttpClient'].get(`${baseUrl}/api/v1/users/${userId}`, {
      headers: { authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.setUserData(res.data);
          console.log('User data loaded in DataService:', res.data);
        } else {
          console.log('No user data found');
        }
      },
      error: (err: any) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  // Method to fetch account data from the backend
  fetchAccountData() {
    const token: any = localStorage.getItem('user');
    if (!token) return;

    // Get the base URL from AuthService
    const baseUrl = this.authService['hostName'] || '';

    // Use HttpClient from AuthService to make the request
    this.authService['_HttpClient'].get(`${baseUrl}/api/v1/accounts/myAccount`, {
      headers: { authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        if (res.data && res.data.length > 0) {
          // Get the current account ID
          const currentAccountId = this.accountIdSource.getValue();

          if (currentAccountId) {
            // Find the account with the matching ID
            const selectedAccount = res.data.find((account: any) => account._id === currentAccountId);

            if (selectedAccount) {
              this.setAccountData(selectedAccount);
              console.log('Selected account data loaded in DataService:', selectedAccount);
            } else {
              // If the account with the specified ID is not found, use the first account
              this.setAccountData(res.data[0]);
              console.log('Selected account not found, using first account:', res.data[0]);
            }
          } else {
            // If no account ID is set, use the first account
            this.setAccountData(res.data[0]);
            console.log('No account ID set, using first account:', res.data[0]);
          }
        } else {
          console.log('No account data found');
        }
      },
      error: (err: any) => {
        console.error('Error fetching account data:', err);
      }
    });
  }

  // Transaction amount methods
  setAmount(amount: number) {
    this.amountSource.next(amount);
    console.log('Updated amount:', amount);
  }

  // Account ID methods
  setAccountID(id: string) {
    this.accountIdSource.next(id);
    console.log('Updated account ID:', id);
  }

  // User data methods
  setUserData(userData: any) {
    if (!userData) return;

    this.setUserId(userData._id || "");
    this.setUserName(userData.name || "");
    this.setUserEmail(userData.email || "");
    this.setUserRole(userData.role || "");
    this.setUserPhone(userData.phoneNum || "");
    this.setUserNationalId(userData.nationalId || "");
    this.setUserBirthDate(userData.birthDate ? new Date(userData.birthDate) : null);
    this.setUserAddress(userData.address || null);
  }

  setUserId(id: string) {
    this.userIdSource.next(id);
  }

  setUserName(name: string) {
    this.userNameSource.next(name);
  }

  setUserEmail(email: string) {
    this.userEmailSource.next(email);
  }

  setUserRole(role: string) {
    this.userRoleSource.next(role);
  }

  setUserPhone(phone: string) {
    this.userPhoneSource.next(phone);
  }

  setUserNationalId(nationalId: string) {
    this.userNationalIdSource.next(nationalId);
  }

  setUserBirthDate(birthDate: Date | null) {
    this.userBirthDateSource.next(birthDate);
  }

  setUserAddress(address: any) {
    this.userAddressSource.next(address);
  }

  // Account data methods
  setAccountData(accountData: any) {
    if (!accountData) return;

    this.setAccountID(accountData._id || "");
    this.setAccountNumber(accountData.accountNum || "");
    this.setAccountType(accountData.type || "");
    this.setAccountBalance(accountData.balance || 0);
    this.setAccountCurrency(accountData.currency || "EGP");
    this.setAccountIBAN(accountData.IBAN || "");
    this.setAccountCreatedAt(accountData.createdAt ? new Date(accountData.createdAt) : null);
  }

  setAccountNumber(accountNumber: string) {
    this.accountNumberSource.next(accountNumber);
  }

  setAccountType(type: string) {
    this.accountTypeSource.next(type);
  }

  setAccountBalance(balance: number) {
    this.accountBalanceSource.next(balance);
  }

  setAccountCurrency(currency: string) {
    this.accountCurrencySource.next(currency);
  }

  setAccountIBAN(iban: string) {
    this.accountIBANSource.next(iban);
  }

  setAccountCreatedAt(createdAt: Date | null) {
    this.accountCreatedAtSource.next(createdAt);
  }

  // Helper method to get formatted account balance with currency
  getFormattedBalance(): string {
    const balance = this.accountBalanceSource.getValue();
    const currency = this.accountCurrencySource.getValue();
    return `${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
  }

  // Helper method to get formatted user address
  getFormattedAddress(): string {
    const address = this.userAddressSource.getValue();
    if (!address) return "No address available";

    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.governorate) parts.push(address.governorate);

    return parts.join(', ');
  }

  // Method to refresh all data
  refreshAllData() {
    const token: any = localStorage.getItem('user');
    if (!token) return;

    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken._id) {
        this.fetchUserData(decodedToken._id);
        this.fetchAccountData();
        console.log('Refreshing all data...');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}