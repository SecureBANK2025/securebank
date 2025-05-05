import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-withdraw-completed',
  imports: [CommonModule],
  templateUrl: './withdraw-completed.component.html',
  styleUrl: './withdraw-completed.component.scss'
})
export class WithdrawCompletedComponent {
  constructor(private router: Router) {}

  noReceipt() {
    // Navigate to the withdraw-no-receipt component
    this.router.navigate(['/deposite-no-reciept']);
  }

  printReceipt() {
    // Navigate to the withdraw-receipt component
    this.router.navigate(['/deposite-reciept']);
  }
}
