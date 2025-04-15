import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-main-options',
  imports: [],
  templateUrl: './main-options.component.html',
  styleUrl: './main-options.component.scss'
})
export class MainOptionsComponent {
  constructor(private _AuthService: AuthService) { }
    ngOnInit(): void {
      this._AuthService.checkToken();
    }
}
