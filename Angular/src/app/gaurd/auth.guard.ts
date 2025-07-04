import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  
  // Check if token exists in localStorage
  const token = localStorage.getItem('user');
  if (!token) {
    _Router.navigate(['/home']);
    return false;
  }
  
  // Validate token and check expiration
  _AuthService.checkToken();
  
  // Check if user is authenticated
  if (_AuthService.currentUser.getValue() !== null) { 
    return true;
  } else {
    _Router.navigate(['/home']);
    return false;
  }
};