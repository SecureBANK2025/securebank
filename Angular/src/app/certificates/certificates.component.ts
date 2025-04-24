import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificates',
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent implements OnInit {
  userData: any;

  constructor(
    private _AuthService: AuthService,
    private _router: Router) { }
    
  ngOnInit(): void {
    this._AuthService.checkToken();
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