import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { transactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-money-transfer2',
  imports: [CommonModule],
  templateUrl: './money-transfer2.component.html',
  styleUrl: './money-transfer2.component.scss'
})
export class MoneyTransfer2Component implements OnInit {
  // userData: any;
  // transferData: any = {
  //   accountNum: localStorage.getItem('recipientAccountNum') || '',
  //   amount: 0,
  //   bank: localStorage.getItem('recipientBank') || ''
  // };
  
  // userName: string = '';
  

  // ---------------------------------------> bahy
  formData : any ;
  accountId: string = '';
  userAccountNumber: string = '';
  data: any;

  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private _DataService: DataService,
    private _transactionsService: transactionsService
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();

    // Refresh all data from the backend
    // this._DataService.refreshAllData();

    // Get the transfer amount from DataService
    // this._DataService.currentAmount.subscribe(amount => {
    //   this.transferData.amount = amount;
    // });

    // Get account ID
   

    // Subscribe to user data from DataService
    // this._DataService.currentUserName.subscribe(name => {
    //   this.userName = name;
    // });

    // Subscribe to account data from DataService
    
    // For backward compatibility
    // this._AuthService.currentUser.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //   }
    // });

    this._DataService.currentAccountNumber.subscribe(accountNum => {
      this.userAccountNumber = accountNum;
    });

    this._DataService.currentId.subscribe(id => {
      this.accountId = id;
    });

    this._DataService.currentFormdata.subscribe(data =>{
      this.formData = data
    });
    
  }

  back() {
    this.router.navigate(['/moneyTransfer1']);
  }

  confirm() {
    this.data = {
      amount: parseInt(this.formData.amount),
      accountId: this.accountId,
      accountNum: this.formData.accountNum
    };
    this._transactionsService.transfer(this.data).subscribe({
      next: () => {
        console.log('Transfer successful');
        this.router.navigate(['/moneyTransfer3']);
      },
      error: (err) => {
        console.error('Transfer failed:', err);

        // Extract error messages from the backend response
        let errorMessages: string[] = [];
        
        if (err?.error?.errors) {
          // Handle validation errors from backend
          errorMessages = err.error.errors.map((e: any) => e.msg);
        } else if (err?.error?.message) {
          // Handle single error message
          errorMessages = [err.error.message];
        } else if (err?.status === 404) {
          // Handle non-existing account error
          errorMessages = ['The recipient account does not exist. Please check the account number and try again.'];
        } else if (err?.status === 400) {
          // Handle bad request errors
          errorMessages = ['Invalid transfer request. Please check your input and try again.'];
        } else if (err?.status === 403) {
          // Handle insufficient funds
          errorMessages = ['Insufficient funds for this transfer. Please check your account balance.'];
        } else {
          // Handle other errors
          errorMessages = ['Transfer failed. Please try again later.'];
        }

        console.log('Error messages:', errorMessages);

        // Navigate to auth-failed with query parameters
        this.router.navigate(['/authFailed'], {
          queryParams: {
            from: 'moneyTransfer',
            messages: JSON.stringify(errorMessages)  // Send as JSON string
          }
        });
      }
    });
  }
}
