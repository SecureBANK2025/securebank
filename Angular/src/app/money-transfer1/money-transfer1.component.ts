import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-money-transfer1',
  imports: [numPadComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './money-transfer1.component.html',
  styleUrl: './money-transfer1.component.scss'
})
export class MoneyTransfer1Component implements OnInit, OnDestroy {
  transferForm = new FormGroup({
    bank: new FormControl(null, [Validators.required]),
    accountNum: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
  })
  userData: any;
  bank: string = '';
  accountNum: string = '';
  amount: number | null = null;
  accountData: any;
  accountId: string = '';
  userName: string = '';
  userAccountNumber: string = '';
  currentBalance: number = 0;
  formValid: boolean = true;
  error: boolean = false;
  errorMessage: string = '';
  private balanceSubscription?: Subscription;
  
  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private _DataService: DataService
  ) { }

  ngOnInit(): void {
    this.formValid = true;

    this._AuthService.checkToken();

    // Refresh all data from the backend
    this._DataService.refreshAllData();

    // Subscribe to user data from DataService
    this._DataService.currentUserName.subscribe(name => {
      this.userName = name;
      console.log('Transfer1 - User name updated:', name);
    });

    // Subscribe to account data from DataService
    this._DataService.currentAccountNumber.subscribe(accountNum => {
      this.userAccountNumber = accountNum;
    });

    // Get account ID
    this._DataService.currentId.subscribe(id => {
      this.accountId = id;
    });

    // Get current balance
    this.balanceSubscription = this._DataService.currentAccountBalance.subscribe(
      balance => {
        this.currentBalance = balance;
        console.log('Current account balance:', balance);
      }
    );

    // For backward compatibility
    this._AuthService.currentUser.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
  }

  ngOnDestroy() {
    if (this.balanceSubscription) {
      this.balanceSubscription.unsubscribe();
    }
  }

  validateForm(): boolean {
    return this.accountNum !== '' &&
      this.amount !== null &&
      this.amount > 0 &&
      this.accountId !== '';
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
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

  transfer() {
    // Reset error state
    this.error = false;
    this.errorMessage = '';

    // Get form values
    const formValues = this.transferForm.value;
    // this.bank = formValues.bank || '';
    this.accountNum = formValues.accountNum || '';
    this.amount = formValues.amount || null;

    // Validation checks
    if (!this.accountNum || this.amount === null) {
      this.error = true;
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Check if transferring to own account
    if (this.accountNum === this.userAccountNumber) {
      this.error = true;
      this.errorMessage = 'You cannot transfer to your own account';
      return;
    }

    // Check minimum amount
    if (this.amount < 50) {
      this.error = true;
      this.errorMessage = 'The amount must be greater than 50';
      return;
    }

    // Check if user has enough balance
    if (this.amount > this.currentBalance) {
      this.error = true;
      this.errorMessage = 'You Don\'t Have Enough Money';
      return;
    }

    // All validations passed
    console.log('Transfer details:', {
      bank: this.bank,
      accountNum: this.accountNum,
      amount: this.amount,
      userAccountNumber: this.userAccountNumber,
      currentBalance: this.currentBalance
    });

    // Store transfer data in DataService
    this._DataService.setAmount(this.amount);
    this._DataService.setFormdata(this.transferForm.value);

    this.formValid = true;
    this.router.navigate(['/moneyTransfer2']);
  }
}