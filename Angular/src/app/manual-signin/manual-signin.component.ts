import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manual-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manual-signin.component.html',
  styleUrls: ['./manual-signin.component.scss']
})
export class ManualSigninComponent {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log('Form submitted:', this.signinForm.value);
    }
  }
} 