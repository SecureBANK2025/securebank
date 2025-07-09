import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSource = new BehaviorSubject<string>('');
  private errorsSource = new BehaviorSubject<string[]>([]);
  
  currentError = this.errorSource.asObservable();
  currentErrors = this.errorsSource.asObservable();

  setError(error: string) {
    if (error && error.trim()) {
      this.errorSource.next(error.trim());
    }
  }

  setErrors(errors: string[]) {
    if (errors && Array.isArray(errors)) {
      const validErrors = errors
        .map(error => String(error).trim())
        .filter(error => error.length > 0);
      this.errorsSource.next(validErrors);
    }
  }

  addError(error: string) {
    if (error && error.trim()) {
      const currentErrors = this.errorsSource.value;
      if (!currentErrors.includes(error.trim())) {
        this.errorsSource.next([...currentErrors, error.trim()]);
      }
    }
  }

  clearErrors() {
    this.errorSource.next('');
    this.errorsSource.next([]);
  }

  clearSingleError() {
    this.errorSource.next('');
  }

  getCurrentErrors(): string[] {
    return this.errorsSource.value;
  }

  getCurrentError(): string {
    return this.errorSource.value;
  }
}