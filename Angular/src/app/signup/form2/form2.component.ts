import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { numPadComponent } from '../../num-pad/num-pad.component';

@Component({
  selector: 'app-form2',
  imports: [FormsModule, ReactiveFormsModule, numPadComponent],
  templateUrl: './form2.component.html',
  styleUrl: './form2.component.scss'
})
export class Form2Component {

  signupForm2 = new FormGroup({
    phoneNum: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    nationalId: new FormControl(null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    PIN: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    confirmPIN: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    birthDate: new FormControl(null, [Validators.required]),
  });

  formData = {
    phoneNum: '',
    nationalId: '',
    PIN: '',
    confirmPIN: '',
    birthDate: ''
  }

  // This method checks if the entered PINs match
  matchPINs(): boolean {
    return (
      this.signupForm2.get('PIN')?.value === this.signupForm2.get('confirmPIN')?.value
    );
  }

  isValid(): boolean {
    if (this.matchPINs()) {
      return (
        this.signupForm2.valid
      )
    }
    else {
      return false;
    };
  }

  // This method returns the current form data
  getData(): any {
    return this.formData;
  }
  maxDate: string;

  constructor() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits
    this.maxDate = `${year - 18}-${month}-${day}`;
  }
}
