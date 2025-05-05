import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  hostName: string = '';
  routeName: string = "";

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.certificatesRoute; }

    buyCertificate(data:any): Observable<any> {
      console.log(data);
      return this._HttpClient.post(`${this.hostName}${this.routeName}/buy`, data , { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
    }
    getCertificatesData(): Observable<any> {
      return this._HttpClient.get(`${this.hostName}${this.routeName}/getCertificates`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
    }
    redeem(data:any): Observable<any> {
      return this._HttpClient.post(`${this.hostName}${this.routeName}/redeem`, data , { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
    }
}