import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './money-deposit.component.html',
  styleUrl: './money-deposit.component.scss'
})
export class MoneyDepositComponent implements OnInit {
  amount: number | null = null;
  userData: any;
  error: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private _AuthService: AuthService, private _dataService: DataService) {

  }

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }
  sendAmount() {
    this._dataService.setAmount(this.amount || 0);
  }


  selectAmount(value: number) {
    this.amount = value;
  }

  onKeyPress(event: KeyboardEvent): boolean {
    // Allow only numbers (0-9), backspace, delete, tab, escape, enter
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  cancel() {
    this.router.navigate(['/mainOptions']);
  }

  confirm() {
    if (this.amount !== 0 && this.amount !== null) {
      if (this.amount < 50) {
        this.error = true;
        this.errorMessage = 'The amount must be greater than 50';
      } else {
        this.error = false;
        this.errorMessage = '';
        this.sendAmount()
        this.router.navigate(['/deposit-sure']);
      }
    } else {
      this.error = true;
      this.errorMessage = 'Please enter the amount';
    }
  }
}
