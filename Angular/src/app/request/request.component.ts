import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent implements OnInit {
  cardForm: FormGroup;
  userData: any;
  cardData: any = {};

  constructor(
    private _router: Router,
    private _AuthService: AuthService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.cardForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    }

    return { passwordMismatch: true };
  }

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
      console.log('User data loaded:', this.userData);
    });
  }



  back() {
    this.location.back();
  }

  confirm() {
    if (this.cardForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.cardForm.markAllAsTouched();
      return;
    }

    // Update cardData with form values
    // The userId will be extracted from the JWT token on the server side
    this.cardData = {
      password: this.cardForm.value.password,
      confirmPassword: this.cardForm.value.confirmPassword,
      userId: this.userData._id
    };
    console.log(this.cardData);

    this._router.navigate(['/finger']);

    this._AuthService.requestNewCard(this.cardData).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['/request-done']);
      },
      error: (err) => {
        console.log(err);
        this._router.navigate(['/auth-failed']);
      }
    })
  }

}
