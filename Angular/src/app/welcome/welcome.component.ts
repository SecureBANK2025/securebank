import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})

export class WelcomeComponent {

  constructor(private _router: Router) {}

  navToHome() {
    this._router.navigate(['/home']);
    // const atForm1:Boolean = true;
  }
}