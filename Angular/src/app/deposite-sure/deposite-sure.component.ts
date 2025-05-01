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
    
    // this._AuthService.currentUser.subscribe(user => {
    //   this.userData = user;
    // });

    // this._AuthService.currentAccountData.subscribe(account => {
    //   this.accountData = account;
    // });

    this._dataService.currentAmount.subscribe(amount => {
      this.amount = amount;
    });

    this._dataService.currentId.subscribe(id => {
      this.accountId = id;
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
      next: (res) => {
        this.router.navigate(['/deposite-insert']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    
  }
}
