import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  hostName: string = 'http://localhost:3000';
  authRoute: string = '/api/v1/auth';
  transactionsRoute:string= '/api/v1/transactions'
  constructor() { }

}