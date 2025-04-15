import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-finger',
  imports: [],
  templateUrl: './signin-finger.component.html',
  styleUrl: './signin-finger.component.scss'
})
export class SigninFingerComponent {

  constructor(private _AuthService: AuthService, private _router: Router) { }
  navToHome() {
    this._router.navigate(['/home']);
  }
}
