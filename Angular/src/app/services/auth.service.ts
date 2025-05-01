import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Signup } from '../interfaces/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  _id: string;
  exp: number;
}

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
  currentAccountID = new BehaviorSubject(null);
  // currentAccountData = new BehaviorSubject(null);


saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    this.currentUser.next(jwtDecode(token));
  }


  // saveCurrentAccountData() {
  //   const token: any = localStorage.getItem('user');
  //   const decodedToken = jwtDecode<DecodedToken>(token);
  //   // Fetch complete user data using the ID from the token
  //   this._HttpClient.get(`${this.hostName}/api/v1/accounts/myAccount/${decodedToken._id}`,).subscribe({
  //     next: (res: any) => {
  //       this.currentAccountData.next(res.data[0]);
  //       console.log(res.data[0]);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching user data:', err);
  //       this.logout();
  //     }
  //   });
  // }

  singUp(myData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/signup`, myData)
  }

  login(): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/loginWithFinger`, null)
  }

  manualLogin(myData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/login`, myData)
  }

  verifyOTP(data: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/verifyOTP`, data)
  }


  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode<DecodedToken>(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout()
      this._Router.navigate(['/home'])
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this._Router.navigate(['/welcome']);
  }

  chooseAccount(type :any):Observable<any>{
    console.log(type);
    return this._HttpClient.post(`${this.hostName}${this.routeName}/chooseAccount`, {type} ,{ headers: { authorization: `Bearer ${localStorage.getItem('user')}` } } )
}
}