import { Component } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-money-transfer3',
  imports: [],
  templateUrl: './money-transfer3.component.html',
  styleUrl: './money-transfer3.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

})
export class MoneyTransfer3Component {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 5000);
  }
}
