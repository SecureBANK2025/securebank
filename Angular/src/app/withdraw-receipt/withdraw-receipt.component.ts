import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-withdraw-receipt',
  imports: [CommonModule],
  templateUrl: './withdraw-receipt.component.html',
  styleUrl: './withdraw-receipt.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WithdrawReceiptComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 6000);
  }
}
