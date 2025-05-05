import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { transactionsService } from '../services/transactions.service';
import { EgyptTimePipe } from '../pipes/egypt-time.pipe';
import { EgyptcurrencyPipe } from '../pipes/egyptcurrency.pipe';

@Component({
  selector: 'app-account-details',
  imports: [CommonModule,EgyptTimePipe,EgyptcurrencyPipe],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.scss'
})
export class TransactionsHistoryComponent implements OnInit {
  
  userName :any;
  accountNumber:any;
  recipientAccountNum:any;

  transactions:any;

  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private _DataService: DataService,
    private _transactionsService: transactionsService
  ) {}

  ngOnInit(): void {
    this._AuthService.checkToken();

    // Refresh all data from the backend
    this._DataService.refreshAllData();

    // Subscribe to user data from DataService
    this._DataService.currentUserName.subscribe(name => {
      this.userName = name;
    });

    // Subscribe to account data from DataService
    this._DataService.currentAccountNumber.subscribe(accountNum => {
      this.accountNumber = accountNum;
    });

    // For backward compatibility
    // this._AuthService.currentUser.subscribe(user => {
    //   this.userData = user;
    // });

    this.getAll();
   

  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.router.navigate(['/mainOptions']);
  }

  getAll(){
    this._transactionsService.getAllTransacions().subscribe({
      next: (res) => {
        this.transactions = res.data
      },
      error: (err) => {
        console.log('Transfer error:', err);
      }
    })
  }
}
