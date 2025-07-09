import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { ErrorService } from '../services/errorMessage.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-failed',
  imports: [],
  templateUrl: './auth-failed.component.html',
  styleUrl: './auth-failed.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthFailedComponent implements OnInit, OnDestroy {
  errorMessages: string[] = [];
  private errorSubscription?: Subscription;
  private errorsSubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    private _router: Router,
    private _Error: ErrorService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.initializeErrorMessages();
  }

  ngOnInit(): void {
    // Subscribe to single error service for real-time error updates
    this.errorSubscription = this._Error.currentError.subscribe(error => {
      if (error && error.trim()) {
        // Add new error from service to existing messages
        if (!this.errorMessages.includes(error)) {
          this.errorMessages.push(error);
        }
      }
    });

    // Subscribe to multiple errors service
    this.errorsSubscription = this._Error.currentErrors.subscribe(errors => {
      if (errors && errors.length > 0) {
        // Merge new errors with existing ones, avoiding duplicates
        const newErrors = errors.filter(error => !this.errorMessages.includes(error));
        this.errorMessages = [...this.errorMessages, ...newErrors];
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
    if (this.errorsSubscription) {
      this.errorsSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private initializeErrorMessages(): void {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      const messages = params['messages'];
      const error = params['error'];
      
      if (messages) {
        try {
          // Handle both string and array formats
          if (typeof messages === 'string') {
            this.errorMessages = JSON.parse(messages);
          } else if (Array.isArray(messages)) {
            this.errorMessages = messages;
          } else {
            this.errorMessages = [String(messages)];
          }
        } catch (e) {
          // Fallback: treat as single error message
          this.errorMessages = [String(messages)];
        }
      } else if (error) {
        // Handle single error parameter
        this.errorMessages = [String(error)];
      } else {
        // Default error message if no errors provided
        this.errorMessages = ['Authentication failed. Please try again.'];
      }

      // Ensure all messages are strings and filter out empty ones
      this.errorMessages = this.errorMessages
        .map(msg => String(msg).trim())
        .filter(msg => msg.length > 0);
    });
  }

  back(): void {
    this.location.back();
  }

  // Method to clear errors (useful for testing or manual error clearing)
  clearErrors(): void {
    this.errorMessages = [];
    this._Error.clearErrors();
  }

  // Method to add a new error message
  addError(message: string): void {
    if (message && message.trim() && !this.errorMessages.includes(message)) {
      this.errorMessages.push(message.trim());
    }
  }
}