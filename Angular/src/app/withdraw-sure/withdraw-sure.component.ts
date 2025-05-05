import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { transactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-withdraw-sure',
  imports: [CommonModule],
  templateUrl: './withdraw-sure.component.html',
  styleUrl: './withdraw-sure.component.scss'
})
export class WithdrawSureComponent implements OnInit {
  amount: number = 0;
  userData: any;
  accountId: string = '';
  data: any;
  userName: string = '';
  accountNumber: string = '';

  constructor(
    private router: Router,
    private _AuthService: AuthService,
    private _DataService: DataService,
    private _transactionsService: transactionsService
  ) {}

  ngOnInit(): void {
    // Get the withdraw amount from DataService
    this._DataService.currentAmount.subscribe(amount => {
      this.amount = amount;
    });

    // Get account ID
    this._DataService.currentId.subscribe(id => {
      this.accountId = id;
    });

    // Subscribe to user data from DataService
    this._DataService.currentUserName.subscribe(name => {
      this.userName = name;
    });

    // Subscribe to account data from DataService
    this._DataService.currentAccountNumber.subscribe(accountNum => {
      this.accountNumber = accountNum;
    });

    // For backward compatibility
    this._AuthService.currentUser.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
  }

  back() {
    this.router.navigate(['/moneyWithdraw']);
  }

  confirm() {
    this.data = {
      amount: this.amount,
      accountId: this.accountId
    }

    this._transactionsService.withdraw(this.data).subscribe({
      next: () => {
        this.router.navigate(['/withdraw-collect']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

