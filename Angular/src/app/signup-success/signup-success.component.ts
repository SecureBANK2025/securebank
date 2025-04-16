import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-success',
  imports: [],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.scss'
})
export class SignupSuccessComponent {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/login'])
    }, 3000)
  }
}
