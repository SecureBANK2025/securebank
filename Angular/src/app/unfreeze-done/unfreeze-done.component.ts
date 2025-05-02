import { Component } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-certificate-done',
  imports: [],
  templateUrl: './unfreeze-done.component.html',
  styleUrl: './unfreeze-done.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

})
export class UnreezeDoneComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/another-operation']);
    }, 5500);
  }
}

