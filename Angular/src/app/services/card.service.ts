import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  hostName: string = '';
  routeName: string = "";
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.cardRoute;
  }
  requestNewCard(type: any): Observable<any> {
    console.log(type);
    return this._HttpClient.post(`${this.hostName}${this.routeName}/requestNew`, type, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
  activateCard(type: any): Observable<any> {
    console.log(type);
    return this._HttpClient.patch(`${this.hostName}${this.routeName}/activate`, type, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
  toggleCardStatus(type: any): Observable<any> {
    console.log(type);
    return this._HttpClient.patch(`${this.hostName}${this.routeName}/toggleCardStatus`, type, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
  getCardData(): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/getCard`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}