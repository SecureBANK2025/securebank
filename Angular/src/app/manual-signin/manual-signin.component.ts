import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { KeyboardComponent } from '../keyboard/keyboard.component';

@Component({
  selector: 'app-manual-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, KeyboardComponent],
  templateUrl: './manual-signin.component.html',
  styleUrls: ['./manual-signin.component.scss']
})
export class ManualSigninComponent implements OnInit {
  signinForm: FormGroup;
  myData: any;
  navToHome() {
    this._router.navigate(['/home']);
  }
  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private _router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      PIN: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.myData = {};
  }


  onSubmit() {
    if (this.signinForm.valid) {
      console.log('Form submitted:', this.signinForm.value);
      this.myData = this.signinForm.value;
    }
    this.ManualLogin();
  }


  ManualLogin() {
    this._AuthService.manualLogin(this.myData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('user', res.token);
          console.log(res.token);
          this._AuthService.currentUser.subscribe(user => {
            if (user) {
              this._router.navigate(['/mainOptions']);
            }
          });
          this._AuthService.saveCurrentUser();
        } else {
          console.error('No token received from server');
          alert('Login failed. Please try again.');
        }
      }, 
      error: (err) => {
        console.error('Login failed:', err);
        if (err.error?.message) {
          alert(err.error.message);
        } else {
          alert('Invalid email or PIN. Please try again.');
        }
      }
    })
  }
}










