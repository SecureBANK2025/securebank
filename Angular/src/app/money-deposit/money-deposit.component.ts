import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';

@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent],
  templateUrl: './money-deposit.component.html',
  styleUrl: './money-deposit.component.scss'
})
export class MoneyDepositComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/mainOptions']);
  }

  confirm() {
    this.router.navigate(['/deposit-sure']);
  }
}
