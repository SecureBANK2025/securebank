import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-options',
  imports: [CommonModule],
  templateUrl: './main-options.component.html',
  styleUrl: './main-options.component.scss'
})
export class MainOptionsComponent implements OnInit {
  userData: any;

  constructor(
    private _AuthService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();
    console.log('Current user from service:', this._AuthService.currentUser.getValue());
    this._AuthService.currentUser.subscribe(user => {
      console.log('User data received:', user);
      this.userData = user;
    });
  }

  navigateTo(route: string) {
    this._router.navigate([`/${route}`]);
  }
  
  logout() {
    this._AuthService.logout();
  }
}