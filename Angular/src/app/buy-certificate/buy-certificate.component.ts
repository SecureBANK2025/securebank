import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorService } from '../services/errorMessage.service';
import { FormBuilder } from '@angular/forms';
import { CertificatesService } from '../services/certificates.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './buy-certificate.component.html',
  styleUrl: './buy-certificate.component.scss'
})
export class BuyCertificateComponent implements OnInit {
  purchaseAmount: string = '';
  userData: any;
  errorMessage: string = '';
  certificateForm: FormGroup;
  accountId: string = '';
  certificateData: any;

  constructor(
    private router: Router,
    private _AuthService: AuthService,
    private _ErrorService: ErrorService,
    private fb: FormBuilder,
    private _CertificatesService: CertificatesService,
    private _DataService: DataService
  ) {
    this.certificateForm = this.fb.group({
      purchaseAmount: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._DataService.currentId.subscribe(id => {
      this.accountId = id;
    });
    console.log(this.accountId);

  }

  setAmount(value: string) {
    this.purchaseAmount = value;
  }

  selectAmount(value: number) {
    this.purchaseAmount = value.toString();
  }

  cancel() {
    this.router.navigate(['/view-available']);
  }

  confirm() {

    if (this.certificateForm.valid) {
      
      this.certificateData = {
        purchaseAmount: parseInt(this.certificateForm.value.purchaseAmount),
        accountId: this.accountId
      }
      console.log(this.certificateData);


      this.router.navigate(['/finger']);
      this._CertificatesService.buyCertificate(this.certificateData).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/buy-done']);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error?.message || 'Something went wrong';
          console.log(this.errorMessage);
          this._ErrorService.setError(this.errorMessage);
          this.router.navigate(['/authFailed']);
        }
      });
    }
  }
}