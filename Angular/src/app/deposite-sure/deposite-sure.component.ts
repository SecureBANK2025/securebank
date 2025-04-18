import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposite-sure',
  imports: [],
  templateUrl: './deposite-sure.component.html',
  styleUrl: './deposite-sure.component.scss'
})
export class DepositeSureComponent {
  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/moneyDeposit']);
  }

  confirm() {
    this.router.navigate(['/deposite-insert']);
  }
}
