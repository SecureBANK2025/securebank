import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { CardService } from '../services/card.service';


@Component({
  selector: 'app-view-available',
  imports: [CommonModule],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.scss'
})



export class CardComponent {

  


  activated: boolean = false;
  freezed: boolean = false;
  cardData: any;


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
        console.log(this.activated);
        this.freezed = this.cardData.isFrozen;
        console.log(this.freezed);
      },
      error: (err) => {
        console.log(err);
      }
    })
    // this._DataService.refreshAllData();
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
