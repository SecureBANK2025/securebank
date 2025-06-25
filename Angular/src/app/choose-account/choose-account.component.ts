import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-choose-account',
  imports: [CommonModule],
  templateUrl: './choose-account.component.html',
  styleUrl: './choose-account.component.scss'
})
export class ChooseAccountComponent implements OnInit {
  type: string = '';
  data: object = {};
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private _AuthService: AuthService,
    private _DataService: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Check if user is authenticated
    this._AuthService.checkToken();
    
    // Clear any error message on component initialization
    this.errorMessage = '';
  }

  savings() {
    this.type = "savings";
    this.confirm();
  }

  current() {
    this.type = "current";
    this.confirm();
  }

  foreignCurrency() {
    this.type = "foreign_currency";
    this.confirm();
    console.log(this.location.back());
    
    // this.router.navigate(['/finger']);
  }

  confirm() {
    this.loading = true;
    this.errorMessage = '';

    console.log(`Selecting account type: ${this.type}`);

    this._AuthService.chooseAccount(this.type).subscribe({
      next: (res) => {
        console.log('Response from chooseAccount:', res);

        if (res && res.success && res.message) {
          // Store the account ID in the DataService
          const accountId = res.message;
          this._DataService.setAccountID(accountId);

          // Fetch the updated account data
          this._DataService.refreshAllData();

          // Navigate to main options
          this.router.navigate(['/mainOptions']);
        } else {
          this.errorMessage = 'Invalid response from server';
          console.error('Invalid response:', res);
        }

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'An error occurred';
        console.error('Error selecting account:', err);
      }
    });
  }
}