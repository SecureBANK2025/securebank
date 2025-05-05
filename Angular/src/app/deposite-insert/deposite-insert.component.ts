import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 


@Component({
  selector: 'app-deposite-insert',
  imports: [],
  templateUrl: './deposite-insert.component.html',
  styleUrl: './deposite-insert.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

})
export class DepositeInsertComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/deposite-completed']);
    }, 5000);
  }
}

