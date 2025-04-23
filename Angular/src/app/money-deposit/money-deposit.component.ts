import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './money-deposit.component.html',
  styleUrl: './money-deposit.component.scss'
})
export class MoneyDepositComponent implements OnInit {
  amount: string = '';
  userData: any;

  constructor(
    private router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  setAmount(value: string) {
    this.amount = value;
  }

  selectAmount(value: number) {
    this.amount = value.toString();
  }

  cancel() {
    this.router.navigate(['/mainOptions']);
  }

  confirm() {
    if (this.amount) {
      // Store the amount in localStorage to pass it to the next component
      localStorage.setItem('depositAmount', this.amount);
      this.router.navigate(['/deposit-sure']);
    }
  }
}
