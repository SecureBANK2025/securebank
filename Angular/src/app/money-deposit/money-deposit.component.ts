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
  amount: number = 0;
  userData: any;

  constructor(private router: Router,private _AuthService: AuthService,private _dataService:DataService) {
    
  }

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }
  sendAmount() {
    this._dataService.setAmount(this.amount);
  }
  

  selectAmount(value: number) {
    this.amount = value;
  }

  cancel() {
    this.router.navigate(['/mainOptions']);
  }

  confirm() {
  this.sendAmount()
  this.router.navigate(['/deposit-sure']);
  }
}
