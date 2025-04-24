import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-money-transfer2',
  imports: [CommonModule],
  templateUrl: './money-transfer2.component.html',
  styleUrl: './money-transfer2.component.scss'
})
export class MoneyTransfer2Component implements OnInit {
  userData: any;
  transferData: any;

  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
    this.transferData = this.transferService.getTransferData();
  }

  back() {
    this.router.navigate(['/moneyTransfer1']);
  }

  confirm() {
    // TODO: Implement confirmation logic
    console.log('Transfer confirmed');
    this.router.navigate(['/moneyTransfer3']);
  }
}
