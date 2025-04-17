import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposite-completed',
  imports: [],
  templateUrl: './deposite-completed.component.html',
  styleUrl: './deposite-completed.component.scss'
})
export class DepositeCompletedComponent {
  constructor(private router: Router) {}

  noReceipt() {
    this.router.navigate(['/deposite-no-reciept']);
  }

  printReceipt() {
    this.router.navigate(['/deposite-reciept']);
  }
}
