import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-money-transfer1',
  imports: [numPadComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './money-transfer1.component.html',
  styleUrl: './money-transfer1.component.scss'
})
export class MoneyTransfer1Component implements OnInit {
  transferForm = new FormGroup({
    bank: new FormControl(null, [Validators.required]),
    accountNum: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
  })
  userData: any;
  bank: string = '';
  accountNum: string = '';
  amount: number = 0;
  accountData: any;
  accountId: string = '';
  userName: string = '';
  userAccountNumber: string = '';
  formValid: boolean = true;

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

    // For backward compatibility
    this._AuthService.currentUser.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
  }

  validateForm(): boolean {
    return this.bank !== '' &&
      this.accountNum !== '' &&
      this.amount > 0 &&
      this.accountId !== '';
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.router.navigate(['/mainOptions']);
  }

  transfer() {
    if (this.userAccountNumber !== this.transferForm.value.accountNum!) {
      // if (!this.validateForm()) 
      //   console.log('Form validation failed');
      //   return;
      // }

      console.log(this.accountNum);
      console.log(this.userAccountNumber);
      console.log(this.transferForm.value);
      // Store transfer data in DataService
      this._DataService.setAmount(this.amount);
      // -----------------------------------------------------------> bahy
      this._DataService.setFormdata(this.transferForm.value)
      // console.log(this.transferForm.value)

      // Store additional transfer data in localStorage for now
      // In a real implementation, you would add these to DataService
      // localStorage.setItem('recipientAccountNum', this.accountNum);
      // localStorage.setItem('recipientBank', this.bank);
      this.formValid = true;
      this.router.navigate(['/moneyTransfer2']);
    }
    else {
      this.formValid = false;
      // alert('You cannot transfer to your own account');
    }
  }
}