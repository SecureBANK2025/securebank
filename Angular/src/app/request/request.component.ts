import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numPadComponent } from '../num-pad/num-pad.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-money-deposit',
  imports: [numPadComponent, CommonModule, FormsModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent implements OnInit {
  amount1: string = '';
  amount2: string = '';

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
    
      this.router.navigate(['/request-finger']);
    }

}
