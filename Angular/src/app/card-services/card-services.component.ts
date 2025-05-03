import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-available',
  imports: [CommonModule],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.scss'
})
export class CardServicesComponent {
  constructor(
    private _AuthService: AuthService,
    private _router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.location.back();
  }
  activate() {
    this._router.navigate(['/activate'])
  }
  request() {
    this._router.navigate(['/request'])
  }
  freeze() {
    this._router.navigate(['/freeze'])
  }
  Unfreeze() {
    this._router.navigate(['/unfreeze'])
  }
}
