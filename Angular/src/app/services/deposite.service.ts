import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  _id: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class DepositeService {

  hostName: string = '';
  depositeData: any;
  
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
  }
  deposite(){
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode<DecodedToken>(token);
    // console.log("0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
    // console.log("depositing");
    // console.log(decodedToken._id);
    // console.log(`${this.hostName}/api/v1/transactions/deposit/${decodedToken._id}`);
    this.depositeData = {
      amount: Number(localStorage.getItem('depositAmount')),
      accountId: localStorage.getItem('accountID')
    }
    console.log(this.depositeData);
    this._HttpClient.post(`${this.hostName}/api/v1/transactions/deposit/${decodedToken._id}`, this.depositeData).subscribe({
      next: (res: any) => {
        // this.currentAccountData.next(res.data[0]);
        console.log("deposite success");
      },
      error: (err) => {
        console.error('Error depositing:', err);
        // this.logout();
      }
    });;
  }

}
