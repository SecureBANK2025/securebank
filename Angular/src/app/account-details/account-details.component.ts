import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-details',
  imports: [],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent {
  constructor(private _AuthService: AuthService) {}

  logout() {
    this._AuthService.logout();
  }
}
