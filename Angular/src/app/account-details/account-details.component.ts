import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../services/global.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-account-details',
  imports: [CommonModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent implements OnInit {
  userData: any;
  accountData: any;
  hostName: string = '';
  selectedAccountId: string = '';
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService,
    private _DataService: DataService
  ) {
    this.hostName = this._GlobalService.hostName;
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loading = true;

    // Get user data
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });

    // Get the selected account ID from DataService
    this._DataService.currentId.subscribe(id => {
      this.selectedAccountId = id;
      console.log('Selected account ID:', id);

      // Fetch account data whenever the selected account ID changes
      if (id) {
        this.fetchAccountData();
      }
    });

    // Subscribe to account data from DataService
    this._DataService.currentAccountType.subscribe(type => {
      console.log('Current account type:', type);
    });

    // If no account ID is set, fetch all accounts
    if (!this.selectedAccountId) {
      this.fetchAccountData();
    }
  }

  fetchAccountData() {
    this.loading = true;
    this.errorMessage = '';

    const token: any = localStorage.getItem('user');
    if (!token) {
      this.router.navigate(['/home']);
      return;
    }

    this._HttpClient.get(`${this.hostName}/api/v1/accounts/myAccount`, {
      headers: { authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.data && res.data.length > 0) {
          if (this.selectedAccountId) {
            // Find the account with the matching ID
            const selectedAccount = res.data.find((account: any) => account._id === this.selectedAccountId);

            if (selectedAccount) {
              this.accountData = selectedAccount;
              console.log('Selected account data loaded:', selectedAccount);
            } else {
              // If the account with the specified ID is not found, use the first account
              this.accountData = res.data[0];
              console.log('Selected account not found, using first account:', res.data[0]);
              this.errorMessage = 'Selected account not found, showing default account';
            }
          } else {
            // If no account ID is set, use the first account
            this.accountData = res.data[0];
            console.log('No account ID set, using first account:', res.data[0]);
          }
        } else {
          console.log('No account data found');
          this.errorMessage = 'No account data found';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching account data:', err);
        this.errorMessage = 'Error loading account data';
      }
    });
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.router.navigate(['/mainOptions']);
  }

  createAccount() {
    this.router.navigate(['/newAccount']);
  }
}