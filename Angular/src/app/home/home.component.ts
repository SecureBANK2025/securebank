import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor( private _router: Router) { }

  navToSignup() {
    this._router.navigate(['/signup/form1']);
  }

  navToLogin() {
    this._router.navigate(['/login/loginFinger']);
  }

  navToManualSignin() {
    this._router.navigate(['/manualSignin']);
  }
}