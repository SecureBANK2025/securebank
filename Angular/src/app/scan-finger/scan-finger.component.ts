import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scan-finger',
  imports: [],
  templateUrl: './scan-finger.component.html',
  styleUrl: './scan-finger.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class fingerComponent {
  constructor(private _AuthService: AuthService, private _router: Router, private location: Location) { }
    back() {
      this.location.back();
    }

}