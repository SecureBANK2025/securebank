import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-another-operation',
  imports: [],
  templateUrl: './another-operation.component.html',
  styleUrl: './another-operation.component.scss'
})
export class AnotherOperationComponent {
  constructor(private router: Router, private authService: AuthService) {}

  yes() {
    this.router.navigate(['/mainOptions']);
  }

  no() {
    this.authService.logout();
  }
}
