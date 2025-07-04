import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorService } from '../services/errorMessage.service';
import { FormBuilder } from '@angular/forms';
import { CertificatesService } from '../services/certificates.service';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './buy-certificate.component.html',
  styleUrl: './buy-certificate.component.scss'
})
export class BuyCertificateComponent implements OnInit, OnDestroy {
  purchaseAmount: string = '';
  amount: number | null = null;
  userData: any;
  errorMessage: string = '';
  certificateForm: FormGroup;
  accountId: string = '';
  certificateData: any;
  currentBalance: number = 0;
  error: boolean = false;
  private balanceSubscription?: Subscription;

  constructor(
    private router: Router,
    // private _AuthService: AuthService,
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

    // Get current balance
    this.balanceSubscription = this._DataService.currentAccountBalance.subscribe(
      balance => {
        this.currentBalance = balance;
        console.log('Current account balance:', balance);
      }
    );
  }

  ngOnDestroy() {
    if (this.balanceSubscription) {
      this.balanceSubscription.unsubscribe();
    }
  }

  setAmount(value: string) {
    this.purchaseAmount = value;
  }

  selectAmount(value: number) {
    this.amount = value;
    console.log(this.amount);
    console.log(value);
  }

  onKeyPress(event: KeyboardEvent): boolean {
    // Allow only numbers (0-9), backspace, delete, tab, escape, enter
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  cancel() {
    this.router.navigate(['/view-available']);
  }

  confirm() {
    // Reset error state
    this.error = false;
    this.errorMessage = '';

    // Get the amount from form or selected amount
    const formAmount = this.certificateForm.value.purchaseAmount;
    const finalAmount = this.amount || (formAmount ? parseInt(formAmount) : null);

    // Validation checks
    if (!finalAmount || finalAmount === null) {
      this.error = true;
      this.errorMessage = 'Please enter the certificate amount';
      return;
    }

    // Check minimum amount
    if (finalAmount < 1000) {
      this.error = true;
      this.errorMessage = 'The amount must be greater than 1000 EGP';
      return;
    }

    // Check if user has enough balance
    console.log(this.currentBalance);
    console.log(finalAmount);
    if (finalAmount > this.currentBalance) {
      this.error = true;
      this.errorMessage = 'You Don\'t Have Enough Money';
      return;
    }

    // All validations passed
    console.log('Certificate purchase details:', {
      amount: finalAmount,
      currentBalance: this.currentBalance
    });

    if (this.certificateForm.valid) {
      this.certificateData = {
        purchaseAmount: finalAmount,
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