import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

@Component({
  selector: 'app-deposite-reciept',
  imports: [],
  templateUrl: './deposite-reciept.component.html',
  styleUrl: './deposite-reciept.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

})
export class DepositeRecieptComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 99999999);
  }
}
