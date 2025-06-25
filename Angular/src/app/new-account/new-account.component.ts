import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-new-account',
  imports: [],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss'
})
export class NewAccountComponent implements OnInit {
  type: string = '';
  data: object = {
    currency: 'EGP'
  };

  constructor(
    private router: Router,
    private _AuthService: AuthService,
    private _DataService: DataService,
    private _AccountService: AccountService
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }

  savings() {
    this.type = "savings";
    this.confirm();
  }

  current() {
    this.type = "current";
    this.confirm();
  }

  confirm() {
    // Add the account type to the data object
    this.data = {
      ...this.data,
      type: this.type
    };

    console.log(`Selecting account type: ${this.data}`);
    console.log(this.data);
    this._AccountService.addNewAccount(this.data).subscribe({
      next: (res) => {
        console.log('Response from addNewAccount:', res);
        this.router.navigate(['/mainOptions']);
      },
      error: (err) => {
        console.error('Error selecting account:', err);
      }
    });
  }
}