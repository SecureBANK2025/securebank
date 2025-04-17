import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-failed',
  imports: [],
  templateUrl: './auth-failed.component.html',
  styleUrl: './auth-failed.component.scss'
})
export class AuthFailedComponent {

constructor(private _router: Router) {}

ngOnInit(): void {
  setTimeout(() => {
    this._router.navigate(['/login/loginFinger'])
  }, 5000)
}

}
