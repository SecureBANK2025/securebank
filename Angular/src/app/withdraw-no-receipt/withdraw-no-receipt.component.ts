import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-withdraw-no-receipt',
  imports: [CommonModule],
  templateUrl: './withdraw-no-receipt.component.html',
  styleUrl: './withdraw-no-receipt.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WithdrawNoReceiptComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 5000);
  }
}
