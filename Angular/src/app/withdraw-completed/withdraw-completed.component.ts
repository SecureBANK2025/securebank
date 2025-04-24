import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw-completed',
  imports: [],
  templateUrl: './withdraw-completed.component.html',
  styleUrl: './withdraw-completed.component.scss'
})
export class WithdrawCompletedComponent {
 constructor(private router: Router) {}

  noReceipt() {
    this.router.navigate(['/deposite-no-reciept']);
  }

  printReceipt() {
    this.router.navigate(['/deposite-reciept']);
  }
}
