import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { ErrorService } from '../services/errorMessage.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-auth-failed',
  imports: [],
  templateUrl: './auth-failed.component.html',
  styleUrl: './auth-failed.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthFailedComponent implements OnInit {
  errorMessages: string[] = [];
  constructor(
    private _router: Router,
    private _Error: ErrorService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      const messages = params['messages'];
      if (messages) {
        try {
          this.errorMessages = JSON.parse(messages); // ✅ Correct way to handle JSON array
        } catch (e) {
          this.errorMessages = [messages]; // fallback in case parsing fails
        }
      }
    });
    
  }

  ngOnInit(): void {
      this._Error.currentError.subscribe(error => {
      // this.errorMessage = error;
    });
  }

  back(){
    this.location.back();
  }

  
}