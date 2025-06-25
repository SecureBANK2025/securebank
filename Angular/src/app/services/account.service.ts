import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {hostName: string = '';
  routeName: string = "";
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.accountRoute;
  }
  addNewAccount(data: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/create`, data, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
