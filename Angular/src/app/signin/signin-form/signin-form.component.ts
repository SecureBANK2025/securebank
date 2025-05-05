import { Component, ViewChild, OnInit } from '@angular/core';
import { numPadComponent } from '../../num-pad/num-pad.component';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SigninComponent } from '../signin.component';
import { EmailService } from '../../services/user-email.service';
// import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-signin-form',
  imports: [numPadComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss'
})
export class SigninFormComponent {

  constructor(private _router: Router, private _AuthService: AuthService, private emailService: EmailService) { }

  email: string = '';
  otp: string = '';
  data: object = {};


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
    this.data = {
      email: this.email,
      otp: this.otp
    }
    console.log(this.data);
    this._AuthService.verifyOTP(this.data).subscribe({
      next: (res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('user', res.token);
          console.log(res.token);
          this._AuthService.saveCurrentUser();
          // this._AuthService.saveCurrentAccountID();
          // this._AuthService.saveCurrentAccountData();
          this._router.navigate(['/mainOptions']);
        }
      },
      error: (err) => {
        err.error.errors.map((error: any) => {
          this._router.navigate(['/login/loginFinger']);
          console.log(err);
        })
      }
    })
  }
}