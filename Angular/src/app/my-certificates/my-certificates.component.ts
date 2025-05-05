import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
// import { transactionsService } from '../services/transactions.service';
import { EgyptTimePipe } from '../pipes/egypt-time.pipe';
import { EgyptcurrencyPipe } from '../pipes/egyptcurrency.pipe';
import { CertificatesService } from '../services/certificates.service';

@Component({
  selector: 'app-account-details',
  imports: [CommonModule, EgyptTimePipe, EgyptcurrencyPipe],
  templateUrl: './my-certificates.component.html',
  styleUrl: './my-certificates.component.scss'
})
export class MyCertificatesComponent implements OnInit {
  userData: any;
  userName: any;
  accountNumber: any;
  // recipientAccountNum:any;

  certificates: any;


  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private _DataService: DataService,
    private _certificatesService: CertificatesService
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();

    // Refresh all data from the backend
    this._DataService.refreshAllData();

    // Subscribe to user data from DataService
    this._DataService.currentUserName.subscribe(name => {
      this.userName = name;
    });

    // Subscribe to account data from DataService
    this._DataService.currentAccountNumber.subscribe(accountNum => {
      this.accountNumber = accountNum;
    });

    // For backward compatibility
    // this._AuthService.currentUser.subscribe(user => {
    //   this.userData = user;
    // });

    this.getAll();
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this.router.navigate(['/certificates']);
  }
  redeem() {
  }

  getAll(){
    this._certificatesService.getCertificatesData().subscribe({
      next: (res) => {
        this.certificates = res.data
      },
      error: (err) => {
        console.log('Transfer error:', err);
      }
    })
  }
}
