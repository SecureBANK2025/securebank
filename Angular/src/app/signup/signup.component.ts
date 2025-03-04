// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { ScanFingerComponent } from './scan-finger/scan-finger.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  imports: [Form1Component, Form2Component, KeyboardComponent, ScanFingerComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit {
  myData: any;
  form2Data: any;
  form1Data: any;
  atForm1: Boolean = true;
  atForm2: boolean = false;
  atScanFinger: boolean = false;

  constructor(private _AuthService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.myData = {};
  }

  @ViewChild(Form1Component) form1Component!: Form1Component;
  @ViewChild(Form2Component) form2Component!: Form2Component;
  @ViewChild(Form2Component) ScanFingerComponent!: Form2Component;
  navToForm1() {
    this._router.navigate(['/signup/form1']);
    this.atForm1 = true;
    this.atForm2 = false;
    this.atScanFinger = false;
  }



  isForm1Valid(): boolean {
    return this.form1Component ? this.form1Component.isValid() : false;
  }
  isForm2Valid(): boolean {
    return this.form2Component ? this.form2Component.isValid() : false;
  }

  navToForm2() {

    this.form1Data = this.form1Component ? this.form1Component.getData() : {};
    this.myData = {
      ...this.myData, ...this.form1Data
    };

    this._router.navigate(['/signup/form2']);
    this.atForm1 = false;
    this.atForm2 = true;
    this.atScanFinger = false;

  }
  navToHome() {
    this._router.navigate(['/home']);
    this.atForm1 = false;
    this.atForm2 = false;
    this.atScanFinger = false;
  } submit(): void {
    console.log('Submitting Data:', this.myData);
    this.atForm1 = false;
    this.atForm2 = false;
    // this.atScanFinger = false;
  }

  navToScanFinger() {
    this.form2Data = this.form2Component ? this.form2Component.getData() : {};
    this.myData = {
      ...this.myData, ...this.form2Data
    };
    this._router.navigate(['/signup/scanFinger']);
    this.atForm1 = false;
    this.atForm2 = false;
    this.atScanFinger = true;
  }



  signup(myData: object) {
    this._AuthService.singUp(myData).subscribe({
      next: (res) => {
        this._router.navigate(['/welcome'])
      }, error: (err) => {
        err.error.errors.map((error: any) => {
          // this.signup(this.myData);
          console.log(err)
        })
      }
    })
  }
}