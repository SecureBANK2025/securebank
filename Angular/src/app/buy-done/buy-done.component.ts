import { Component } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-certificate-done',
  imports: [],
  templateUrl: './buy-done.component.html',
  styleUrl: './buy-done.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

})
export class BuyDoneComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 4700);
  }
}

