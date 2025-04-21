import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 


@Component({
  selector: 'app-auth-failed',
  imports: [],
  templateUrl: './auth-failed.component.html',
  styleUrl: './auth-failed.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

})
export class AuthFailedComponent {

constructor(private _router: Router) {}

ngOnInit(): void {
  setTimeout(() => {
    this._router.navigate(['/login/loginFinger'])
  }, 3500)
}

}
