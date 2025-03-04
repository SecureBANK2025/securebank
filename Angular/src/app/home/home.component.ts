import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private _router: Router) {}

  navToSignup() {
    this._router.navigate(['/signup/form1']);
    // const atForm1:Boolean = true;
  }
}