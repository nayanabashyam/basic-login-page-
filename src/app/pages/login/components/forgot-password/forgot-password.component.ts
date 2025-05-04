import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @Output() backToLoginClick = new EventEmitter<void>();
  
  forgotPasswordForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  submitError = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.submitError = '';
    
    const { email } = this.forgotPasswordForm.value;
    
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.isSubmitted = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.submitError = 'An error occurred. Please try again later.';
        console.error('Forgot password error', err);
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