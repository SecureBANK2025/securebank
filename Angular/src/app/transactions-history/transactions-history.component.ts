import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-account-details',
  imports: [CommonModule],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.scss'
})
export class TransactionsHistoryComponent implements OnInit {
  userData: any;
  accountData: any;

  // Properties for dynamic data
  userName: string = '';
  accountNumber: string = '';

  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private _DataService: DataService
  ) {}

  ngOnInit(): void {
    this._AuthService.checkToken();

    // Refresh all data from the backend
    this._DataService.refreshAllData();

    // Subscribe to user data from DataService
    this._DataService.currentUserName.subscribe(name => {
      this.userName = name;
      console.log('Transactions History - User name updated:', name);
    });

    // Subscribe to account data from DataService
    this._DataService.currentAccountNumber.subscribe(accountNum => {
      this.accountNumber = accountNum;
    });

    // For backward compatibility
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.router.navigate(['/mainOptions']);
  }
}
