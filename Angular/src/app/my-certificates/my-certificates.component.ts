import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-details',
  imports: [CommonModule],
  templateUrl: './my-certificates.component.html',
  styleUrl: './my-certificates.component.scss'
})
export class MyCertificatesComponent implements OnInit {
  userData: any;

  constructor(private _AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.router.navigate(['/certificates']);
  }
  redeem(){
    this.router.navigate(['/redeem-finger']);

  }
}
