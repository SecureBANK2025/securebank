import { Component } from '@angular/core';
import { Router } from '@angular/router';import { DepositeService } from '../services/deposite.service';
'../services/auth.service';

@Component({
  selector: 'app-deposite-completed',
  imports: [],
  templateUrl: './deposite-completed.component.html',
  styleUrl: './deposite-completed.component.scss'
})
export class DepositeCompletedComponent {
  constructor(private _DepositeService: DepositeService,private router: Router) {}

  ngOnInit(): void {
    this._DepositeService.deposite();
  }

  noReceipt() {
    this.router.navigate(['/deposite-no-reciept']);
  }

  printReceipt() {
    this.router.navigate(['/deposite-reciept']);
  }
}
