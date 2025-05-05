import { Component, OnInit, ViewChild } from '@angular/core';
import { SigninFingerComponent } from './signin-finger/signin-finger.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { EmailService } from '../services/user-email.service';


@Component({
  selector: 'app-signin',
  imports: [SigninFingerComponent, SigninFormComponent, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  atFinger: boolean = true;
  atForm: boolean = false;
  email: string = '';


  constructor(private _AuthService: AuthService, private _router: Router, private emailService: EmailService) {
    this.log_in();
  }


  ngOnInit(): void {
  }


  @ViewChild(SigninFingerComponent) fingerComponent!: SigninFingerComponent;
  @ViewChild(SigninFormComponent) formComponent!: SigninFormComponent;



  log_in() {
    // this._router.navigate(['/finger']);
    // console.log("login works");
    this._AuthService.login().subscribe({

      next: (res) => {

        this.email = res.email;
        // Send the email to the UserEmailService
        this.emailService.setEmail(this.email);
        console.log(this.email);
        // this._router.navigate(['/authSuccess']);
        this.toggleAtFingerToValue(false);
      }, error: (err) => {
        if (this._router.url === '/login/loginFinger') {
          console.log(err);
          this._router.navigate(['/authFailed']);
        }
      }
    })
  }

  setEmail(email: string) {
    this.email = email;
    this.emailService.setEmail(email); // Save email in the service
  }

  toggleAtFingerToValue(value: boolean) {
    this.atFinger = value;
    this.atForm = !value;
    this._router.navigate(['/login/loginForm']);
    console.log("toggleAtFingerToValue works");
    console.log("atFinger is " + value);
    console.log("atForm is " + !value);
  }

}