import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-certificates',
  imports: [],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent {
  constructor(
    private _AuthService: AuthService,
    private _router: Router) { }
    ngOnInit(): void {
      this._AuthService.checkToken();
    }

    navigateTo(route: string) {
      this._router.navigate([`/${route}`]);
      console.log(route);
      console.log(this._router);

    }
    
    logout() {
      this._AuthService.logout();
    }
    back() {
      this._router.navigate(['/more']); //مش شغاله حاططها بس عشان تعملها 
    }
}