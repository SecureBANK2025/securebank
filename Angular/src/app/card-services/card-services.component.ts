import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { CardService } from '../services/card.service';
import { CardNumberFormatPipe } from '../pipes/card-number-format.pipe';

@Component({
  selector: 'app-view-available',
  imports: [CommonModule, CardNumberFormatPipe],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.scss'
})

export class CardComponent {

  activated: boolean = false;
  freezed: boolean = false;
  cardData: any;
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';


  constructor(
    private _AuthService: AuthService,
    private _router: Router,
    private _DataService: DataService,
    private _CardService: CardService
  ) { }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this._CardService.getCardData().subscribe({
      next: (res) => {
        this.cardData = res.data[0];
        console.log(this.cardData);
        this.activated = this.cardData.isActive;
        this.freezed = this.cardData.isFrozen;
        this.cardNumber = this.cardData.cardNumber;
        this.expiryDate = this.cardData.expiryDate;
        this.cvv = this.cardData.cvv;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  logout() {
    this._AuthService.logout();
  }

  back() {
    this._router.navigate(['/more']) //remove location back
  }
  activate() {
    this._router.navigate(['/activate'])
  }
  request() {
    this._router.navigate(['/request-card'])
  }
  freeze() {
    this._router.navigate(['/freeze'])
  }
  Unfreeze() {
    this._router.navigate(['/unfreeze'])
  }
}