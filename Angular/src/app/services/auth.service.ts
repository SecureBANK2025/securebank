import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Signup } from '../interfaces/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  hostName: string = '';
  routeName: string = '';
  constructor(private _HttpClient: HttpClient, private _Router: Router, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.authRoute;
    if (localStorage.getItem('user') !== null) {
      this.saveCurrentUser()
    }
  }

  currentUser = new BehaviorSubject(null);


  saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    this.currentUser.next(jwtDecode(token));
  }
  singUp(myData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/signup`, myData)
  }

  login(): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/loginWithFinger`, null)
  }

  verifyOTP(data: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/verifyOTP`, data)
  }


  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout()
      this._Router.navigate(['/home'])
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}