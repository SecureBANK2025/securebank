import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-money-withdraw',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './money-withdraw.component.html',
  styleUrl: './money-withdraw.component.scss'
})
export class MoneyWithdrawComponent implements OnInit {
  amount: number = 0;
  userData: any;
  accountId: string = '';

  constructor(
    private router: Router,
    private _AuthService: AuthService,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    // Get user data
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });

    // Get account ID
    this._dataService.currentId.subscribe(id => {
      this.accountId = id;
    });

    // Refresh all data from the backend
    this._dataService.refreshAllData();
  }

  sendAmount() {
    this._dataService.setAmount(this.amount);
  }

  cancel() {
    this.router.navigate(['/mainOptions']);
  }

  selectAmount(value: number) {
    this.amount = value;
  }

  confirm() {
    if (this.amount) {
      this.sendAmount();
      this.router.navigate(['/withdraw-sure']);
    }
  }
}
