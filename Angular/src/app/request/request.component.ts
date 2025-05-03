import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardService } from '../services/card.service';
import { ErrorService } from '../services/errorMessage.service';


@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent implements OnInit {
 
  // ينعل ميتين ام cursor 

  errorMessage: string = '';

  constructor(
    private _router: Router,
    private _AuthService: AuthService,
    private _CardService: CardService,
    private _ErrorService: ErrorService,

  ) {}

  cardForm = new FormGroup({
    password: new FormControl(null, [Validators.required ,Validators.min(6)]),
    confirmPassword: new FormControl(null, [Validators.required,Validators.min(6)])
  })

  ngOnInit(): void {
    this._AuthService.checkToken();
  }
  back() {
    // this.location.back(); بطلناها يمعلم 
    this._router.navigate(['/card-services']);
  }

  confirm() {
    this._router.navigate(['/finger']);
    this._CardService.requestNewCard(this.cardForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['/request-done']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error?.message || 'Something went wrong';
        console.log(this.errorMessage);
        //error service==> i set error message and we will show the error message in auth-failed
        this._ErrorService.setError(this.errorMessage);
        this._router.navigate(['/authFailed']);
      }
    })
  }

}
