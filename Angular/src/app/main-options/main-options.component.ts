import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main-options',
  imports: [CommonModule],
  templateUrl: './main-options.component.html',
  styleUrl: './main-options.component.scss'
})
export class MainOptionsComponent implements OnInit {
  userData: any;
  accountData: any;

  // Properties to store individual data pieces
  userName: string = '';
  accountNumber: string = '';
  accountBalance: number = 0;
  accountCurrency: string = '';
  formattedBalance: string = '';

  constructor(
    private _AuthService: AuthService,
    private _router: Router,
    private _DataService: DataService
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();

    // Refresh all data from the backend
    this._DataService.refreshAllData();

    // Subscribe to user data from DataService
    this._DataService.currentUserName.subscribe(name => {
      this.userName = name;
      console.log('User name updated:', name);
    });

    // Subscribe to account data from DataService
    this._DataService.currentAccountNumber.subscribe(accountNum => {
      this.accountNumber = accountNum;
    });

    this._DataService.currentAccountBalance.subscribe(balance => {
      this.accountBalance = balance;
    });

    this._DataService.currentAccountCurrency.subscribe(currency => {
      this.accountCurrency = currency;
    });

    // For backward compatibility, keep the old properties
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  navigateTo(route: string) {
    this._router.navigate([`/${route}`]);
  }

  // Get formatted balance with currency
  getFormattedBalance(): string {
    return this._DataService.getFormattedBalance();
  }

  // Get user's formatted address
  getFormattedAddress(): string {
    return this._DataService.getFormattedAddress();
  }

  logout() {
    this._AuthService.logout();
  }
}