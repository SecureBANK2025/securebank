import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { transactionsService } from '../services/transactions.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-deposite-sure',
  imports: [CommonModule],
  templateUrl: './deposite-sure.component.html',
  styleUrl: './deposite-sure.component.scss'
})
export class DepositeSureComponent implements OnInit {
  depositAmount: string = '';
  userData: any;
  accountData: any;

  //new
  amount: number = 0;
  accountId: string = '';
  data: object = {};

  constructor(
    private router: Router,
    private _AuthService: AuthService,
    private _transactionsService :transactionsService,
    private _dataService:DataService
  ) {}

  ngOnInit(): void {
    this._AuthService.checkToken();

    // Refresh all data from the backend
    this._dataService.refreshAllData();

    // Subscribe to user data from DataService
    this._dataService.currentUserName.subscribe(name => {
      if (name) {
        this.userData = { ...this.userData, name };
        console.log('Deposite - User name updated:', name);
      }
    });

    // Subscribe to account data from DataService
    this._dataService.currentAccountNumber.subscribe(accountNum => {
      if (accountNum) {
        this.accountData = { ...this.accountData, accountNum };
      }
    });

    // For transaction data
    this._dataService.currentAmount.subscribe(amount => {
      this.amount = amount;
    });

    this._dataService.currentId.subscribe(id => {
      this.accountId = id;
    });

    // For backward compatibility
    this._AuthService.currentUser.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
  }

  back() {
    this.router.navigate(['/moneyDeposit']);
  }

  confirm() {
    this.data = {
      amount : this.amount,
      accountId: this.accountId
    }
    this._transactionsService.deposite(this.data).subscribe({
      next: () => {
        this.router.navigate(['/deposite-insert']);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
}
