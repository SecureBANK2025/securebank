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
export class TransferService {

  hostName: string = '';
  transferData: any;
  
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
  }




  transfer(){
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode<DecodedToken>(token);
    this.transferData = {
      accountNum: localStorage.getItem('accountNum'),
      amount: localStorage.getItem('transferAmount'),
      accountNId: decodedToken._id
    }
    console.log(this.transferData + "000000000000000000");
    this._HttpClient.post(`${this.hostName}/api/v1/transactions/transfer/${decodedToken._id}`, this.transferData).subscribe({
      next: (res: any) => {
        console.log("transfer success");
      },
      error: (err) => {
        console.error('Error depositing:', err);
      }
    });;
  }

}
