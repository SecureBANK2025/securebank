import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit {
  amount: string = '';
  userData: any;

  constructor(
    private router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

 

  cancel() {
    this.router.navigate(['/card-services']);
  }

  confirm() {
    
      this.router.navigate(['/activate-done']);
    }

}
