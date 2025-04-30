import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

@Component({
  selector: 'app-auth-failed',
  imports: [],
  templateUrl: './auth-failed.component.html',
  styleUrl: './auth-failed.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthFailedComponent implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the 'from' query parameter to determine where to navigate back to
    this._route.queryParams.subscribe(params => {
      const from = params['from'];
      
      setTimeout(() => {
        // Check if the current route is still 'auth-failed'
        if (this._router.url === '/auth-failed') {
          if (from === 'signup') {
            // If we came from signup, go back to scan finger
            this._router.navigate(['/signup/scanFinger']);
          } else {
            // Default behavior: go back to login
            this._router.navigate(['/login/loginFinger']);
          }
        }
      }, 3500);
    });
  }
}
