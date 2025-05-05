import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-success',
  imports: [],
  templateUrl: './auth-success.component.html',
  styleUrl: './auth-success.component.scss'
})
export class AuthSuccessComponent {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/mainOptions'])
    }, 5000)
  }

}
