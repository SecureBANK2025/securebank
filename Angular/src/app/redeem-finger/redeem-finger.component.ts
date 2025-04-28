import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

@Component({
  selector: 'app-buy-finger',
  imports: [],
  templateUrl: './redeem-finger.component.html',
  styleUrl: './redeem-finger.component.scss',
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
  
})
export class RedeemFingerComponent {
  constructor(
    private router: Router,
    private _AuthService: AuthService
  ) {}
    back() {
    this.router.navigate(['/my-certificates']);
  }
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/redeem-done']);
    }, 5500);
  }
}
