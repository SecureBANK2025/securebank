import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-money-withdraw',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './money-withdraw.component.html',
  styleUrl: './money-withdraw.component.scss'
})
export class MoneyWithdrawComponent {
  amount: string = '';

  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/mainOptions']);
  }

  selectAmount(value: number) {
    this.amount = value.toString();
  }

  confirm() {
    if (this.amount) {
      localStorage.setItem('withdrawAmount', this.amount);
      this.router.navigate(['/withdraw-sure']);
    }
  }
}
