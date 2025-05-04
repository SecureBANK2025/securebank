import { Component } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw-collect',
  imports: [],
  templateUrl: './withdraw-collect.component.html',
  styleUrl: './withdraw-collect.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  
})
export class WithdrawCollectComponent {
 constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/withdraw-completed']);
    }, 3500);
  }
}

