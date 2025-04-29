import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-withdraw-sure',
  imports: [CommonModule],
  templateUrl: './withdraw-sure.component.html',
  styleUrl: './withdraw-sure.component.scss'
})
export class WithdrawSureComponent implements OnInit {
  withdrawAmount: string = '';
  userData: any;
  accountData: any;


  constructor(
    private router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the withdraw amount from localStorage
    this.withdrawAmount = localStorage.getItem('withdrawAmount') || '';
    
    // Get user data
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
    this._AuthService.currentAccountData.subscribe(account => {
      this.accountData = account;
    });
  }

  back() {
    this.router.navigate(['/moneyWithdraw']);
  }

  confirm() {
    this.router.navigate(['/withdraw-collect']);
  }
} 

