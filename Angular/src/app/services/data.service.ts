import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private amountSource = new BehaviorSubject<number>(0); 
  currentAmount = this.amountSource.asObservable(); 

  setAmount(amount: number) {
    this.amountSource.next(amount);
    console.log('Updated amount:', amount);
  }
// ------------------------------------------------------------------
  private AccountIdSource = new BehaviorSubject<string>("");
  currentId = this.AccountIdSource.asObservable(); 

  setAccountID(id: string) {
    this.AccountIdSource.next(id);
    console.log('Updated id:', id);
  }



}
