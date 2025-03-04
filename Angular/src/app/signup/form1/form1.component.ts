import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { Form2Component } from "../form2/form2.component";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// import { JsonPipe } from '@angular/common';
// import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-form1',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form1.component.html',
  styleUrl: './form1.component.scss'
})

export class Form1Component {

  signupForm1 = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    governorate: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    city: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    street: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
  });

  constructor(private _router: Router) { }

  formData = {
    name: '',
    email: '',
    city: '',
    governorate: '',
    street: ''
  }


  // This method returns the current form data
  getData(): any {
    return this.formData;
  }

  isValid(): boolean {
    return (
      this.signupForm1.valid
    );
  }

  navToForm2() {
    this._router.navigate(['/signup/form2']);
    const atForm2: Boolean = true;
  }
}