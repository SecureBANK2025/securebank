import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

@Component({
  selector: 'app-buy-finger',
  imports: [],
  templateUrl: './request-finger.component.html',
  styleUrl: './request-finger.component.scss',
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
  
})
export class RequestFingerComponent {
  constructor(
    private router: Router,
    private _AuthService: AuthService
  ) {}
    back() {
    this.router.navigate(['/request']);
  }
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/request-done']);
    }, 5500);
  }
}
