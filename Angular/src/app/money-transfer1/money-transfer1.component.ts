import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
// import { TransferService } from '../services/transfer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-money-transfer1',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './money-transfer1.component.html',
  styleUrl: './money-transfer1.component.scss'
})
export class MoneyTransfer1Component implements OnInit {
  userData: any;
  bank: string = '';
  iban: string = '';
  amount: string = '';
  accountData: any;


  constructor(
    private _AuthService: AuthService,
    private router: Router,
    // private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
    this._AuthService.currentAccountData.subscribe(account => {
      this.accountData = account;
    });
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.router.navigate(['/mainOptions']);
  }

  transfer() {
    const transferData = {
      amount: this.amount,
      bank: this.bank,
      iban: this.iban
    };
    localStorage.setItem('accountNum', transferData.iban);
    localStorage.setItem('transferAmount', transferData.amount);
    localStorage.setItem('bank', transferData.bank);
    // this.transferService.setTransferData(transferData);
    this.router.navigate(['/moneyTransfer2']);
  }
}