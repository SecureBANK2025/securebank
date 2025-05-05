import { Component } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-certificate-done',
  imports: [],
  templateUrl: './freeze-done.component.html',
  styleUrl: './freeze-done.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

})
export class FreezeDoneComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 3500);
  }
}

