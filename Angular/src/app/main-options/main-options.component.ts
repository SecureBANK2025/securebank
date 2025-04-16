import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-options',
  imports: [],
  templateUrl: './main-options.component.html',
  styleUrl: './main-options.component.scss'
})
export class MainOptionsComponent {
  constructor(
    private _AuthService: AuthService,
    private _router: Router  ) { }
    ngOnInit(): void {
      this._AuthService.checkToken();
    }

    // navigateTo(route: string) {
    //   this._router.navigate([`/${route}`]);
    // }

    navigateTo() {
      this._router.navigate(['/moneyDeposit']);
    }
    
}