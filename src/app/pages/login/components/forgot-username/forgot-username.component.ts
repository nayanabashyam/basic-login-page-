import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-username',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.scss']
})
export class ForgotUsernameComponent {
  @Output() backToLoginClick = new EventEmitter<void>();
  
  forgotUsernameForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  submitError = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.forgotUsernameForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  onSubmit() {
    if (this.forgotUsernameForm.invalid) {
      this.forgotUsernameForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.submitError = '';
    
    const { email } = this.forgotUsernameForm.value;
    
    this.authService.forgotUsername(email).subscribe({
      next: () => {
        this.isSubmitted = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.submitError = 'An error occurred. Please try again later.';
        console.error('Forgot username error', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  onBackToLogin() {
    this.backToLoginClick.emit();
  }
}