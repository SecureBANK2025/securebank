import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

@Component({
  selector: 'app-buy-finger',
  imports: [],
  templateUrl: './buy-finger.component.html',
  styleUrl: './buy-finger.component.scss',
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
  
})
export class BuyFingerComponent {
  constructor(
    private router: Router,
    private _AuthService: AuthService
  ) {}
    back() {
    this.router.navigate(['/buy-certificate']);
  }
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/buy-done']);
    }, 5500);
  }
}
