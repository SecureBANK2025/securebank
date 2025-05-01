import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';



@Injectable({
  providedIn: 'root'
})
export class transactionsService {

  hostName: string = '';
  routeName:string = "";
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.transactionsRoute
  }


  deposite(depositeData:any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/deposit`, depositeData , { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
  }

  withdraw(depositeData:any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/withdraw`, depositeData , { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
  }

  transfer(depositeData:any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/transfer`, depositeData , { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
  }
}
