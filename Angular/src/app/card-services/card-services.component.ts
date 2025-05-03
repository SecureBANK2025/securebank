import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-view-available',
  imports: [CommonModule],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.scss'
})
export class CardComponent {
  constructor(
    private _AuthService: AuthService,
    private _router: Router ,
    private _DataService: DataService
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this._router.navigate(['/more']) //remove location back
  }
  activate() {
    this._router.navigate(['/activate'])
  }
  request() {
    this._router.navigate(['/request-card'])
  }
  freeze() {
    this._router.navigate(['/freeze'])
  }
  Unfreeze() {
    this._router.navigate(['/unfreeze'])
  }
}
