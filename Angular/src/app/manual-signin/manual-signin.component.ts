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
          this._AuthService.saveCurrentUser();
        }
        this._router.navigate(['/mainOptions'])
      }, error: (err) => {
        console.log(err);
        // err.error.errors.map((error: any) => {
        //   console.log(err)
        // })
      }
    })
  }
}










