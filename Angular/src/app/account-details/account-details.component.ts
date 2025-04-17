import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  imports: [],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent {
  constructor(private _AuthService: AuthService, private router: Router) {}

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.router.navigate(['/mainOptions']);
  }
}
