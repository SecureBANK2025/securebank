import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-money-transfer2',
  imports: [],
  templateUrl: './money-transfer2.component.html',
  styleUrl: './money-transfer2.component.scss'
})
export class MoneyTransfer2Component {
  constructor( private router: Router) {}
  Back() {
    this.router.navigate(['/moneyTransfer1']);
  }
  Ok() {
    this.router.navigate(['/moneyTransfer3']);
  }
}
