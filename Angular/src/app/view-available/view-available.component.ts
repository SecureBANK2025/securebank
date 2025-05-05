import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-available',
  imports: [CommonModule],
  templateUrl: './view-available.component.html',
  styleUrl: './view-available.component.scss'
})
export class ViewAvailableComponent {
  constructor(
    private _AuthService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this._router.navigate(['/certificates']);
  }
  buy() {
    this._router.navigate(['/buy-certificate'])
  }
}
