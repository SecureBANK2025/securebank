import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSource = new BehaviorSubject<string>('');
  currentError = this.errorSource.asObservable();

  setError(error: string) {
    this.errorSource.next(error); // Update error value
  }
  // متكررش اى function 
  //هى واحدة بس هنكتب فيها اى مسيدج من اى كمبوننت 
}