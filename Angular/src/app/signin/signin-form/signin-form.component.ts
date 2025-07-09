import { Component, ViewChild, OnInit } from '@angular/core';
import { numPadComponent } from '../../num-pad/num-pad.component';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SigninComponent } from '../signin.component';
import { EmailService } from '../../services/user-email.service';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-signin-form',
  imports: [numPadComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss'
})
export class SigninFormComponent {

  constructor(
    private _router: Router, 
    private _AuthService: AuthService, 
    private emailService: EmailService,
    private _AccountService: AccountService
  ) { }

  email: string = '';
  otp: string = '';
  data: object = {};
  errorMessage: string = '';
  showError: boolean = false;
  isLoading: boolean = false;


  @ViewChild(SigninComponent) formComponent!: SigninComponent;
  // data: any = new SigninComponent();

  navToHome() {
    this._router.navigate(['/home']);
  }
  
  ngOnInit(): void {
    this.emailService.currentEmail.subscribe(email => {
      this.email = email;
      console.log('Received email:', this.email);
    })
  }
  
  verify_OTP() {
    // Clear previous error messages
    this.showError = false;
    this.errorMessage = '';
    this.isLoading = true;

    this.data = {
      email: this.email,
      otp: this.otp
    }
    console.log(this.data);
    this._AuthService.verifyOTP(this.data).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        if (res.token) {
          localStorage.setItem('user', res.token);
          console.log(res.token);
          this._AuthService.saveCurrentUser();
          // Check if user has any accounts
          this.checkUserAccounts();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        
        // Display error message instead of redirecting
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.error && err.error.errors && err.error.errors.length > 0) {
          this.errorMessage = err.error.errors[0];
        } else {
          this.errorMessage = 'Invalid OTP. Please try again.';
        }
        
        this.showError = true;
        this.otp = ''; // Clear the OTP field
      }
    })
  }

  checkUserAccounts() {
    this._AccountService.getUserAccounts().subscribe({
      next: (res) => {
        const userAccounts = res.data || [];
        console.log('User accounts:', userAccounts);
        
        if (userAccounts.length === 0) {
          // User has no accounts, redirect to new-account
          this._router.navigate(['/newAccount']);
        } else {
          // User has accounts, redirect to choose account
          this._router.navigate(['/chooseAccount']);
        }
      },
      error: (err) => {
        console.error('Error checking user accounts:', err);
        // If there's an error checking accounts, default to choose account
        this._router.navigate(['/chooseAccount']);
      }
    });
  }

  clearError() {
    this.showError = false;
    this.errorMessage = '';
  }
}