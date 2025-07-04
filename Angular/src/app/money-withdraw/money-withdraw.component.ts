import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-money-withdraw',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './money-withdraw.component.html',
  styleUrl: './money-withdraw.component.scss'
})
export class MoneyWithdrawComponent implements OnInit, OnDestroy {
  amount: number | null = null;
  userData: any;
  accountId: string = '';
  currentBalance: number = 0;
  error: boolean = false;
  errorMessage: string = '';
  private balanceSubscription?: Subscription;

  constructor(
    private router: Router,
    private _AuthService: AuthService,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    // Get user data
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
      console.log(this.userData + 'userData000000000000000000000000000000000');
    });
    
    // Get account ID
    this._dataService.currentId.subscribe(id => {
      this.accountId = id;
      console.log(this.accountId + 'accountId000000000000000000000000000000000');
    });

    // Get current balance
    this.balanceSubscription = this._dataService.currentAccountBalance.subscribe(
      balance => {
        this.currentBalance = balance;
        console.log('Current account balance:', balance);
      }
    );
    
    // Refresh all data from the backend
    this._dataService.refreshAllData();
  }

  ngOnDestroy() {
    if (this.balanceSubscription) {
      this.balanceSubscription.unsubscribe();
    }
  }

  selectAmount(value: number) {
    this.amount = value;
  }

  sendAmount() {
    this._dataService.setAmount(this.amount || 0);
  }

  cancel() {
    this.router.navigate(['/mainOptions']);
  }


  onKeyPress(event: KeyboardEvent): boolean {
    // Allow only numbers (0-9), backspace, delete, tab, escape, enter
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  confirm() {
    if (this.amount !== 0 && this.amount !== null) {
      if (this.amount < 50) {
        this.error = true;
        this.errorMessage = 'The amount must be greater than 50';
      } else {
        if (this.amount > this.currentBalance) {
          this.error = true;
          this.errorMessage = 'You Don\'t Have Enough Money';
        } else {
          this.error = false;
          this.errorMessage = '';
          this.sendAmount();
          this.router.navigate(['/withdraw-sure']);
        }
      }
    } else {
      this.error = true;
      this.errorMessage = 'Please enter the amount';
    }
  }
}
