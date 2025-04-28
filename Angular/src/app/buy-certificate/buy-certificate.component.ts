import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './buy-certificate.component.html',
  styleUrl: './buy-certificate.component.scss'
})
export class BuyCertificateComponent implements OnInit{
  amount: string = '';
  userData: any;

  constructor(
    private router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  setAmount(value: string) {
    this.amount = value;
  }

  selectAmount(value: number) {
    this.amount = value.toString();
  }

  cancel() {
    this.router.navigate(['/view-available']);
  }

  confirm() {
    this.router.navigate(['/buy-finger']);
}}