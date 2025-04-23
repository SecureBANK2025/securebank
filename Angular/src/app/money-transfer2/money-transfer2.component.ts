import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-money-transfer2',
  imports: [CommonModule],
  templateUrl: './money-transfer2.component.html',
  styleUrl: './money-transfer2.component.scss'
})
export class MoneyTransfer2Component implements OnInit {
  userData: any;

  constructor(
    private _AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  back() {
    this.router.navigate(['/moneyTransfer1']);
  }

}
