import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailSource = new BehaviorSubject<string>(''); // Default value
  currentEmail = this.emailSource.asObservable(); // Observable for other components to subscribe to

  setEmail(email: string) {
    this.emailSource.next(email); // Update email value
  }
}