import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private transferData = {
    amount: '',
    bank: '',
    iban: ''
  };

  setTransferData(data: any) {
    this.transferData = data;
  }

  getTransferData() {
    return this.transferData;
  }
} 