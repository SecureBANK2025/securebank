import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';

@Component({
  selector: 'app-money-transfer1',
  imports: [numPadComponent],
  templateUrl: './money-transfer1.component.html',
  styleUrl: './money-transfer1.component.scss'
})
export class MoneyTransfer1Component {
  constructor(private _AuthService: AuthService, private router: Router) {}
  Back() {
    this.router.navigate(['/mainOptions']);
  }

  logout() {
    this._AuthService.logout();
  }
}



 


