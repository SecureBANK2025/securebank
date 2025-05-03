import { Component } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-certificate-done',
  imports: [],
  templateUrl: './activate-done.component.html',
  styleUrl: './activate-done.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

})
export class ActivateDoneComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 3000);
  }
}

