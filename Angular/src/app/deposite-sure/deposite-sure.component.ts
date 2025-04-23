import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-deposite-sure',
  imports: [CommonModule],
  templateUrl: './deposite-sure.component.html',
  styleUrl: './deposite-sure.component.scss'
})
export class DepositeSureComponent implements OnInit {
  depositAmount: string = '';
  userData: any;

  constructor(
    private router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the deposit amount from localStorage
    this.depositAmount = localStorage.getItem('depositAmount') || '';
    
    // Get user data
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  back() {
    this.router.navigate(['/moneyDeposit']);
  }

  confirm() {
    this.router.navigate(['/deposite-insert']);
  }
}
