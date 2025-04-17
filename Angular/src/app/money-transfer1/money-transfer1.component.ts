import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { numPadComponent } from '../num-pad/num-pad.component';

@Component({
  selector: 'app-money-transfer1',
  imports: [numPadComponent],
  templateUrl: './money-transfer1.component.html',
  styleUrl: './money-transfer1.component.scss'
})
export class MoneyTransfer1Component {
  constructor(private _AuthService: AuthService) {}

  logout() {
    this._AuthService.logout();
  }
}
