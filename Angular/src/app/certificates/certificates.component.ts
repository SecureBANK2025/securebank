import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-certificates',
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent implements OnInit {
  userData: any;

  // Properties for dynamic data
  userName: string = '';
  accountNumber: string = '';

  constructor(
    private _AuthService: AuthService,
    private _router: Router,
    private _DataService: DataService) { }

  ngOnInit(): void {
    this._AuthService.checkToken();

    // Refresh all data from the backend
    this._DataService.refreshAllData();

    // Subscribe to user data from DataService
    this._DataService.currentUserName.subscribe(name => {
      this.userName = name;
      console.log('Certificates - User name updated:', name);
    });

    // Subscribe to account data from DataService
    this._DataService.currentAccountNumber.subscribe(accountNum => {
      this.accountNumber = accountNum;
    });

    // For backward compatibility
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  navigateTo(route: string) {
    this._router.navigate([`/${route}`]);
    console.log(route);
    console.log(this._router);
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this._router.navigate(['/more']); //مش شغاله حاططها بس عشان تعملها
  }
}