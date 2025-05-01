import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-money-transfer3',
  imports: [CommonModule],
  templateUrl: './money-transfer3.component.html',
  styleUrl: './money-transfer3.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoneyTransfer3Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Clear localStorage items used for transfer
    localStorage.removeItem('recipientAccountNum');
    localStorage.removeItem('recipientBank');

    // Redirect to main options after a delay
    setTimeout(() => {
      this.router.navigate(['/mainOptions']);
    }, 5500);
  }
}
