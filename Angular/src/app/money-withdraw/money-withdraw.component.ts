import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';

@Component({
  selector: 'app-money-withdraw',
  imports: [numPadComponent],
  templateUrl: './money-withdraw.component.html',
  styleUrl: './money-withdraw.component.scss'
})
export class MoneyWithdrawComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/mainOptions']);
  }
}
